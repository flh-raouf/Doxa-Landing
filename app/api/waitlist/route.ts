import { NextRequest, NextResponse } from "next/server";

import { appendWaitlistSubmissionToGoogleSheets } from "@/lib/google-sheets";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = "nodejs";

type WaitlistSuccessResponse = {
  ok: true;
  message: string;
};

type WaitlistErrorResponse = {
  ok: false;
  message: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<WaitlistSuccessResponse | WaitlistErrorResponse>> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Corps de requete JSON invalide." },
      { status: 400 },
    );
  }

  const payload = asRecord(body);
  const rawEmail = typeof payload?.email === "string" ? payload.email : "";
  const email = rawEmail.trim().toLowerCase();

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Adresse email invalide." },
      { status: 400 },
    );
  }

  try {
    await appendWaitlistSubmissionToGoogleSheets({
      email,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Inscription enregistree. Merci pour votre interet.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Echec d'enregistrement de la waitlist dans Google Sheets.",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Impossible d'enregistrer votre email pour le moment. Veuillez reessayer.",
      },
      { status: 502 },
    );
  }
}
