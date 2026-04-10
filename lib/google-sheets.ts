import { createSign } from "node:crypto";

const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const GOOGLE_SHEETS_TOKEN_TTL_SECONDS = 3600;
const GOOGLE_SHEETS_TOKEN_REFRESH_BUFFER_MS = 60_000;
type GoogleServiceAccountConfig = {
  clientEmail: string;
  privateKey: string;
};

type GoogleSheetsConfig = {
  spreadsheetId: string;
  sheetName: string | null;
  serviceAccount: GoogleServiceAccountConfig;
};

type WaitlistSheetEntry = {
  email: string;
  createdAt: Date;
};

type AccessTokenCache = {
  token: string;
  expiresAt: number;
};

type SignedJwtAssertion = {
  assertion: string;
  expiresAt: number;
};

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

let cachedAccessToken: AccessTokenCache | null = null;
let pendingAccessTokenPromise: Promise<AccessTokenCache> | null = null;

function base64UrlEncode(value: string | Buffer): string {
  return Buffer.from(value).toString("base64url");
}

function normalizePrivateKey(privateKey: string): string {
  return privateKey.replace(/\\n/g, "\n");
}

function readServiceAccountFromJsonEnv():
  | GoogleServiceAccountConfig
  | null {
  const rawJson = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON?.trim();

  if (!rawJson) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(rawJson) as unknown;
  } catch {
    throw new Error(
      "GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON n'est pas un JSON valide.",
    );
  }

  const credentials =
    parsed !== null && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : null;

  const clientEmail =
    typeof credentials?.client_email === "string"
      ? credentials.client_email.trim()
      : "";
  const privateKey =
    typeof credentials?.private_key === "string"
      ? normalizePrivateKey(credentials.private_key.trim())
      : "";

  if (!clientEmail || !privateKey) {
    throw new Error(
      "GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON doit contenir client_email et private_key.",
    );
  }

  return { clientEmail, privateKey };
}

function readServiceAccountConfig():
  | GoogleServiceAccountConfig
  | null {
  const jsonConfig = readServiceAccountFromJsonEnv();
  if (jsonConfig) {
    return jsonConfig;
  }

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim() ?? "";
  const privateKey = normalizePrivateKey(
    process.env.GOOGLE_SHEETS_PRIVATE_KEY?.trim() ?? "",
  );

  const hasAnyServiceAccountConfig = Boolean(clientEmail || privateKey);

  if (!hasAnyServiceAccountConfig) {
    return null;
  }

  if (!clientEmail || !privateKey) {
    throw new Error(
      "GOOGLE_SHEETS_CLIENT_EMAIL et GOOGLE_SHEETS_PRIVATE_KEY sont requis ensemble.",
    );
  }

  return { clientEmail, privateKey };
}

function readGoogleSheetsConfig(): GoogleSheetsConfig | null {
  const spreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() ?? "";
  const rawSheetName = process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() ?? "";
  const sheetName = rawSheetName.length > 0 ? rawSheetName : null;
  const serviceAccount = readServiceAccountConfig();

  const hasAnyGoogleSheetsConfig = Boolean(spreadsheetId || serviceAccount);

  if (!hasAnyGoogleSheetsConfig) {
    return null;
  }

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID est requis.");
  }

  if (!serviceAccount) {
    throw new Error(
      "La configuration du compte de service Google Sheets est incomplete.",
    );
  }

  return { spreadsheetId, sheetName, serviceAccount };
}

function buildSheetRange(sheetName: string): string {
  if (sheetName.length === 0) {
    return "A:B";
  }

  return `'${sheetName.replace(/'/g, "''")}'!A:B`;
}

function buildJwtAssertion(
  serviceAccount: GoogleServiceAccountConfig,
): SignedJwtAssertion {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + GOOGLE_SHEETS_TOKEN_TTL_SECONDS;

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const claims = {
    iss: serviceAccount.clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_OAUTH_TOKEN_URL,
    exp: expiresAt,
    iat: issuedAt,
  };

  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claims))}`;

  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  const signature = signer.sign(serviceAccount.privateKey).toString("base64url");

  return {
    assertion: `${unsignedToken}.${signature}`,
    expiresAt: expiresAt * 1000,
  };
}

async function fetchGoogleAccessToken(
  serviceAccount: GoogleServiceAccountConfig,
): Promise<AccessTokenCache> {
  const { assertion, expiresAt } = buildJwtAssertion(serviceAccount);

  const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || typeof payload.access_token !== "string") {
    const message =
      payload.error_description ??
      payload.error ??
      "Impossible d'obtenir un token Google Sheets.";

    throw new Error(message);
  }

  const expiresInMs =
    typeof payload.expires_in === "number"
      ? payload.expires_in * 1000
      : GOOGLE_SHEETS_TOKEN_TTL_SECONDS * 1000;

  return {
    token: payload.access_token,
    expiresAt: Math.min(expiresAt, Date.now() + expiresInMs),
  };
}

async function getGoogleAccessToken(
  serviceAccount: GoogleServiceAccountConfig,
): Promise<string> {
  if (
    cachedAccessToken &&
    cachedAccessToken.expiresAt - GOOGLE_SHEETS_TOKEN_REFRESH_BUFFER_MS >
      Date.now()
  ) {
    return cachedAccessToken.token;
  }

  if (!pendingAccessTokenPromise) {
    pendingAccessTokenPromise = fetchGoogleAccessToken(serviceAccount).finally(
      () => {
        pendingAccessTokenPromise = null;
      },
    );
  }

  cachedAccessToken = await pendingAccessTokenPromise;
  return cachedAccessToken.token;
}

async function readErrorBody(response: Response): Promise<string | null> {
  try {
    const text = await response.text();
    return text.trim().length > 0 ? text.trim() : null;
  } catch {
    return null;
  }
}

export async function appendWaitlistSubmissionToGoogleSheets(
  entry: WaitlistSheetEntry,
): Promise<void> {
  const config = readGoogleSheetsConfig();

  if (!config) {
    return;
  }

  const accessToken = await getGoogleAccessToken(config.serviceAccount);
  const range = buildSheetRange(config.sheetName ?? "");

  const response = await fetch(
    `${GOOGLE_SHEETS_API_BASE}/${encodeURIComponent(config.spreadsheetId)}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorDimension: "ROWS",
        values: [[entry.createdAt.toISOString(), entry.email]],
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorBody = await readErrorBody(response);

    throw new Error(
      errorBody ??
        "Impossible d'ajouter la soumission de waitlist dans Google Sheets.",
    );
  }
}
