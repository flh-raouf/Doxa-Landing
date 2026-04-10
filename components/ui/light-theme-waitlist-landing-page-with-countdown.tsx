"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  QuadraticBezierCurve3,
  Scene,
  ShaderMaterial,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

import { WaitlistForm } from "@/components/marketing/waitlist-form";

export function WaitlistExperience(): ReactElement {
  return (
    <div className="relative overflow-hidden rounded-none border border-white/70 bg-white/72 p-6 shadow-[0_32px_120_rgba(17,17,17,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/BG.png"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[44rem] flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="mx-auto max-w-[28ch] font-heading text-[clamp(2rem,3vw,3.35rem)] font-medium leading-[0.92] tracking-[-0.065em] text-doxa-ink">
            Accédez en avant-première à une nouvelle façon de gérer vos dossiers.
          </h2>
        </div>

        <div className="w-full max-w-[34rem] rounded-none border border-black/8 bg-white/88 p-5 text-left shadow-[0_24px_70px_rgba(17,17,17,0.08)] sm:p-6">
          <div className="mb-5 flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
              Demande d&apos;acces
            </p>
            <h3 className="max-w-[18ch] font-heading text-[1.45rem] font-medium tracking-[-0.05em] text-doxa-ink">
              <span className="block">Parlez-nous de votre</span>
              <span className="block">perimetre pilote.</span>
            </h3>
          </div>

          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}
