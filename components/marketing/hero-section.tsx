import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  FadeIn,
  HoverLift,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Produit", href: "#product-overview" },
  { label: "Enjeux", href: "#problem" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#waitlist-form" },
];

const desktopMosaic = [
  ["bg-doxa-blue", "bg-doxa-yellow", "bg-white", "bg-doxa-cloud", "bg-white"],
  [
    "bg-white",
    "bg-doxa-blue-dark",
    "bg-doxa-blue-dark",
    "bg-white",
    "bg-doxa-cloud",
  ],
  ["bg-doxa-blue", "bg-doxa-cloud", "bg-white", "bg-doxa-blue-dark", "bg-white"],
  ["bg-white", "bg-white", "bg-doxa-blue-light", "bg-doxa-yellow", "bg-white"],
  ["bg-doxa-blue-dark", "bg-white", "bg-white", "bg-white", "bg-doxa-cloud"],
] as const;

const mobileMosaic = [
  [
    "bg-doxa-blue",
    "bg-doxa-yellow",
    "bg-white",
    "bg-doxa-cloud",
    "bg-doxa-blue-dark",
    "bg-white",
  ],
  [
    "bg-white",
    "bg-doxa-blue",
    "bg-doxa-cloud",
    "bg-white",
    "bg-doxa-blue-light",
    "bg-doxa-yellow",
  ],
] as const;

type MosaicRows = readonly (readonly string[])[];

function MosaicGrid({
  rows,
  className,
}: {
  rows: MosaicRows;
  className: string;
}) {
  return (
    <div className={className}>
      {rows.flatMap((row, rowIndex) =>
        row.map((tileClassName, columnIndex) => (
          <div key={`${rowIndex}-${columnIndex}`} className={tileClassName} />
        )),
      )}
    </div>
  );
}

function DoxaMark() {
  return (
    <Image
      src="/Doxa.webp"
      alt="Doxa logo"
      width={32}
      height={32}
      className="size-8 rounded-[2px] object-cover lg:size-9"
      priority
    />
  );
}

function ContactButton() {
  return (
    <HoverLift>
      <Button
        asChild
        className="h-10 rounded-none bg-doxa-ink px-4 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_30px_rgba(17,17,17,0.14)] hover:bg-doxa-blue lg:h-11 lg:px-5 lg:text-[11px]"
      >
        <a href="#waitlist-form">Demander une demo</a>
      </Button>
    </HoverLift>
  );
}

function PrimaryButton() {
  return (
    <HoverLift>
      <Button
        asChild
        className="h-10 rounded-none bg-doxa-blue px-4 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_38px_rgba(49,50,204,0.18)] hover:bg-doxa-ink lg:h-11 lg:px-5 lg:text-[11px]"
      >
        <a href="#product-overview">
          <span>Explorer la plateforme</span>
          <ArrowRight data-icon="inline-end" />
        </a>
      </Button>
    </HoverLift>
  );
}

function SecondaryButton() {
  return (
    <HoverLift>
      <Button
        asChild
        variant="outline"
        className="h-10 rounded-none border-black/8 bg-white px-4 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-doxa-ink shadow-none hover:bg-doxa-cloud lg:h-11 lg:px-5 lg:text-[11px]"
      >
        <a href="#problem">Voir le contexte</a>
      </Button>
    </HoverLift>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate bg-white text-doxa-ink">
      <div className="w-full">
        <div className="border border-black/6 bg-white">
          <FadeIn>
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-black/6 bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
              <Link
                href="/"
                className="flex items-center gap-2 font-heading text-[1.25rem] font-semibold tracking-[-0.055em] text-doxa-ink sm:text-[1.35rem]"
              >
                <DoxaMark />
                <span>Doxa.</span>
              </Link>

              <nav
                aria-label="Primary"
                className="order-3 w-full lg:order-none lg:w-auto lg:flex-1"
              >
                <ul className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2 font-heading text-[9px] font-semibold uppercase tracking-[0.16em] text-black/55 sm:justify-center lg:gap-x-6 xl:gap-x-7">
                  {navigation.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="transition-colors duration-200 hover:text-doxa-blue"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <ContactButton />
            </header>
          </FadeIn>

          <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
            <StaggerGroup className="flex flex-col gap-8 bg-doxa-panel px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10 xl:px-12">
            <StaggerItem className="flex flex-col gap-5 lg:gap-6">
                <div className="flex flex-col gap-4">
                  <h1 className="font-heading max-w-[20ch] text-[clamp(2.25rem,4.2vw,4.85rem)] font-medium leading-[0.84] tracking-[-0.08em] text-doxa-ink">
                    <span className="block">Quand chaque dossier suit son propre chemin,</span>
                    <span className="block mt-4 text-[clamp(1.8rem,3.5vw,4.4rem)] text-doxa-blue">les outils classiques ne suffisent plus.</span>
                  </h1>
                  <h3 className="max-w-[54ch] text-[15px] leading-7 text-doxa-muted sm:text-base lg:text-lg">
                    Gérez vos dossiers complexes avec des workflows flexibles, des règles métier et une traçabilité complète — le tout en un seul endroit.
                  </h3>
                </div>
              </StaggerItem>

              <StaggerItem className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-2.5">
                  <PrimaryButton />
                  <SecondaryButton />
                </div>
              </StaggerItem>
            </StaggerGroup>

            <FadeIn
              delay={0.14}
              className="flex min-h-[240px] bg-white lg:min-h-full"
            >
              <div className="h-full w-full">
                <MosaicGrid
                  rows={mobileMosaic}
                  className="grid h-[240px] w-full grid-cols-6 grid-rows-2 gap-px overflow-hidden border-l border-black/6 bg-black/6 lg:hidden"
                />
                <MosaicGrid
                  rows={desktopMosaic}
                  className="hidden h-full min-h-[640px] w-full grid-cols-5 grid-rows-5 gap-px overflow-hidden border-l border-black/6 bg-black/6 lg:grid"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
