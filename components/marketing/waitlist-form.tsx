"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type WaitlistApiSuccess = {
  ok: true;
  message: string;
};

type WaitlistApiError = {
  ok: false;
  message: string;
};

type WaitlistResponse = WaitlistApiSuccess | WaitlistApiError;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<WaitlistApiSuccess | null>(null);

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);
  const isEmailValid = EMAIL_REGEX.test(normalizedEmail);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    if (!isEmailValid) {
      setStatus("error");
      setErrorMessage("Entrez un email professionnel valide.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const payload = (await response.json()) as WaitlistResponse;

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setErrorMessage(
          payload.message || "Une erreur est survenue. Veuillez reessayer.",
        );
        return;
      }

      setSuccessData(payload);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Connexion instable. Veuillez reessayer dans un instant.");
    }
  }

  function handleReset() {
    setEmail("");
    setStatus("idle");
    setErrorMessage(null);
    setSuccessData(null);
  }

  if (status === "success" && successData) {
    return (
      <div className="space-y-5 rounded-none border border-doxa-blue/20 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 text-doxa-blue" />
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-doxa-ink">
              Vous etes inscrit a la waitlist.
            </h3>
            <p className="text-sm leading-6 text-doxa-muted">
              {successData.message}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="h-10 rounded-none border-black/10 bg-white px-4 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-doxa-ink hover:bg-doxa-cloud"
        >
          Ajouter un autre email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label
        htmlFor="waitlist-email"
        className="block text-xs font-semibold uppercase tracking-[0.16em] text-black/45"
      >
        Email professionnel
      </label>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          placeholder="prenom.nom@entreprise.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={status === "error" && !isEmailValid}
          className="h-10 rounded-none border-black/12 bg-white px-3 text-sm text-doxa-ink placeholder:text-doxa-muted focus-visible:border-doxa-blue focus-visible:ring-2 focus-visible:ring-doxa-blue/20"
          required
        />

        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-10 rounded-none bg-doxa-blue px-5 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-doxa-ink disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Envoi...
            </>
          ) : (
            "Rejoindre la waitlist"
          )}
        </Button>
      </div>

      <p className="text-xs leading-5 text-doxa-muted">
        Cet email sera ajoute directement a votre feuille Google Sheets pour le
        suivi du lancement Doxa.
      </p>

      {status === "error" && errorMessage && (
        <p className="text-sm font-medium text-red-700">{errorMessage}</p>
      )}
    </form>
  );
}
