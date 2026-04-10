import {
  ArrowRight,
  FileText,
  FolderPlus,
  GitBranch,
  ScanSearch,
  SlidersHorizontal,
} from "lucide-react";

import { FadeIn } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sectionShell =
  "border-x border-b border-black/6 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20";
const sectionFrame = "mx-auto flex w-full max-w-[1440px] flex-col gap-8";
const sectionHeading =
  "font-heading text-[clamp(2rem,3vw,3.6rem)] font-medium leading-[0.9] tracking-[-0.07em] text-doxa-ink";
const sectionLead = "max-w-[44rem] text-[15px] leading-7 text-doxa-muted";

const continuityLines = [
  {
    index: "01",
    title: "Gestionnaire de dossiers",
    description:
      "Une base unique pour ouvrir, suivre et faire avancer chaque dossier sans perdre le contexte.",
  },
  {
    index: "02",
    title: "Form builder",
    description:
      "Des formulaires qui collent au metier, aux etapes du parcours et aux informations utiles.",
  },
  {
    index: "03",
    title: "Workflow builder",
    description:
      "Des passages, validations et statuts structures dans une meme colonne de travail.",
  },
] as const;

const implementationSteps = [
  {
    number: "01",
    title: "Definir un case type",
    description:
      "On pose la structure du dossier, ses champs essentiels, ses statuts et le cadre du parcours.",
    detail: "Exemple: reclamation, onboarding, validation interne ou traitement de demande.",
    icon: FolderPlus,
  },
  {
    number: "02",
    title: "Construire le formulaire",
    description:
      "Les equipes definissent les blocs de saisie, les sections et les informations demandees a l'ouverture.",
    detail: "Le formulaire devient une vraie entree produit, pas un simple fichier annexe.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Dessiner le workflow",
    description:
      "Les etapes de traitement sont posees clairement pour que chacun sache ou le dossier se trouve.",
    detail: "Creation, verification, validation, retour, cloture: le parcours devient lisible.",
    icon: GitBranch,
  },
  {
    number: "04",
    title: "Configurer les regles de passage",
    description:
      "On definit les conditions, validations et mouvements qui font passer le dossier d'une etape a l'autre.",
    detail: "C'est ici que le produit prend la forme du metier, sans bricolage supplementaire.",
    icon: SlidersHorizontal,
  },
  {
    number: "05",
    title: "Lancer et suivre",
    description:
      "Le dossier est ensuite suivi dans une meme surface avec son historique, ses passages et ses responsables.",
    detail: "Le travail quotidien devient plus clair, plus transmissible et beaucoup plus pilotable.",
    icon: ScanSearch,
  },
] as const;

const stackLines = [
  "Gestionnaire de dossiers",
  "Form builder",
  "Workflow builder",
  "Regles de passage",
  "Suivi des statuts",
] as const;

const faqItems = [
  {
    id: "organisations",
    question: "Quels types d'organisations peuvent demarrer avec Doxa ?",
    answer:
      "Toute organisation qui traite des dossiers, des validations ou des parcours internes avec plusieurs etapes peut cadrer un premier pilote: operations, support, service, back-office ou equipes metier.",
  },
  {
    id: "configuration",
    question: "Que configure-t-on concretement dans la premiere version ?",
    answer:
      "Le perimetre initial couvre surtout le case type, le formulaire, les etapes du workflow, les regles de passage et la structure de suivi du dossier.",
  },
  {
    id: "integration",
    question: "Faut-il refaire tout le systeme existant ?",
    answer:
      "Non. L'idee d'un premier pilote est justement de structurer un flux prioritaire sans repartir de zero ni bouleverser tout l'existant.",
  },
  {
    id: "pilote",
    question: "Comment se lance un premier pilote ?",
    answer:
      "On choisit un type de dossier, on formalise le formulaire, on dessine le workflow, on fixe les regles de passage et on met le tout en situation avec les equipes concernees.",
  },
] as const;

function SectionIntro({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Badge
        variant="outline"
        className="h-7 w-fit rounded-none border-black/10 px-3 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-doxa-blue-dark"
      >
        {eyebrow}
      </Badge>
      <h2 className={sectionHeading}>{title}</h2>
      <p className={sectionLead}>{lead}</p>
    </div>
  );
}

export function SocialProofSection() {
  return (
    <section className="border-x border-b border-black/6 bg-doxa-ink px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
      <FadeIn className="mx-auto w-full max-w-[1440px]">
        <div className="overflow-hidden rounded-none border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(105,115,255,0.22),transparent_34%),#111111]">
          <div className="grid lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]">
            <div className="border-b border-white/10 px-5 py-7 sm:px-7 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
              <Badge
                variant="outline"
                className="h-7 w-fit rounded-none border-white/15 bg-white/5 px-3 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-doxa-yellow"
              >
                Juste sous le hero
              </Badge>

              <div className="mt-5 flex flex-col gap-4">
                <h2 className="font-heading text-[clamp(2rem,3vw,3.45rem)] font-medium leading-[0.9] tracking-[-0.07em] text-white">
                  Doxa met enfin dossiers, formulaires et passages dans la meme
                  colonne de travail.
                </h2>
                <p className="max-w-[33rem] text-[15px] leading-7 text-white/72">
                  Moins de fichiers a cote, moins de validations eparpillees et
                  moins d&apos;aller-retours sans trace. L&apos;enjeu n&apos;est pas d&apos;ajouter
                  un outil de plus, mais de reunir ce que les equipes utilisent
                  deja en morceaux.
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {continuityLines.map((line) => (
                <div
                  key={line.title}
                  className="grid gap-3 border-b border-white/10 px-5 py-5 text-white last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:px-7"
                >
                  <span className="font-heading text-[1.55rem] font-medium leading-none tracking-[-0.06em] text-doxa-yellow">
                    {line.index}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="font-heading text-[1.15rem] font-medium tracking-[-0.045em] text-white">
                      {line.title}
                    </p>
                    <p className="max-w-[34rem] text-sm leading-6 text-white/70">
                      {line.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

export function ProductOverviewSection() {
  return (
    <section id="product-overview" className={sectionShell}>
      <FadeIn className={sectionFrame}>
        <SectionIntro
          eyebrow="Vue produit"
          title="Le produit se construit comme un parcours clair, pas comme un empilement d'ecrans."
          lead="On garde uniquement ce qui raconte le vrai coeur de Doxa aujourd'hui: definir un type de dossier, construire le formulaire, poser le workflow, regler les passages et suivre l'execution."
        />

        <div className="overflow-hidden rounded-none border border-black/8 bg-[linear-gradient(180deg,#ffffff_0%,#f4f4f8_100%)] shadow-[0_28px_90px_rgba(17,17,17,0.06)]">
          <div className="grid lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
            <div className="border-b border-black/6 px-5 py-6 sm:px-7 lg:border-b-0 lg:border-r lg:px-8 lg:py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
                Parcours de mise en place
              </p>
              <h3 className="mt-3 font-heading text-[clamp(1.8rem,2.5vw,3rem)] font-medium leading-[0.92] tracking-[-0.065em] text-doxa-ink">
                Une logique continue, du case type jusqu&apos;au suivi des passages.
              </h3>
              <p className="mt-4 max-w-[28rem] text-[15px] leading-7 text-doxa-muted">
                Au lieu de disperser ces etapes dans plusieurs outils, Doxa les
                remet dans une seule logique produit. C&apos;est ce qui rend le
                projet plus lisible pour les equipes et plus simple a faire
                evoluer.
              </p>
            </div>

            <div className="relative px-5 py-6 sm:px-7 lg:px-8 lg:py-8">
              <div className="absolute left-[1.45rem] top-0 bottom-0 w-px bg-black/8 sm:left-[1.95rem] lg:left-[2.15rem]" />

              <ol className="relative flex flex-col gap-7">
                {implementationSteps.map(({ number, title, description, detail, icon: Icon }) => (
                  <li
                    key={title}
                    className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start"
                  >
                    <div className="relative z-10 flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-black/8 bg-white font-heading text-[0.98rem] font-semibold tracking-[-0.04em] text-doxa-ink shadow-[0_10px_24px_rgba(17,17,17,0.05)]">
                        {number}
                      </span>
                      <span className="grid size-10 place-items-center rounded-full bg-doxa-cloud text-doxa-blue sm:hidden">
                        <Icon className="size-4" />
                      </span>
                    </div>

                    <div className="border-b border-black/6 pb-7 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-2">
                          <h4 className="font-heading text-[1.18rem] font-medium tracking-[-0.045em] text-doxa-ink">
                            {title}
                          </h4>
                          <p className="max-w-[42rem] text-sm leading-6 text-doxa-muted">
                            {description}
                          </p>
                        </div>

                        <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-doxa-cloud text-doxa-blue sm:grid">
                          <Icon className="size-4" />
                        </span>
                      </div>

                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-black/42">
                        {detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="border-x border-b border-black/6 bg-[linear-gradient(180deg,#ffffff_0%,#f7f7fa_100%)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <FadeIn className={sectionFrame}>
        <div className="overflow-hidden rounded-none border border-black/8 bg-doxa-ink text-white shadow-[0_32px_110px_rgba(17,17,17,0.12)]">
          <div className="grid lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]">
            <div className="border-b border-white/10 px-5 py-7 sm:px-7 lg:border-b-0 lg:border-r lg:px-8 lg:py-9">
              <Badge
                variant="outline"
                className="h-7 w-fit rounded-none border-white/15 bg-white/5 px-3 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-doxa-yellow"
              >
                Pourquoi Doxa
              </Badge>

              <div className="mt-5 flex flex-col gap-4">
                <h2 className="font-heading text-[clamp(2rem,3vw,3.55rem)] font-medium leading-[0.9] tracking-[-0.075em] text-white">
                  En Algerie, la numerisation accelere. Le vrai besoin, lui,
                  reste tres concret.
                </h2>
                <p className="max-w-[34rem] text-[15px] leading-7 text-white/72">
                  Les organisations veulent structurer leurs dossiers, poser des
                  formulaires propres, dessiner leurs workflows et cadrer les
                  passages sans devoir assembler quatre outils differents. Doxa
                  reunit cela dans une meme base de travail, avec une presence
                  visuelle plus nette et une logique plus excitante a deployer.
                </p>
                <p className="max-w-[34rem] text-sm leading-6 text-white/54">
                  Le signal de fond est clair: plus de numerisation, plus de
                  simplification des parcours, et moins d&apos;operations gerees dans
                  des melanges d&apos;Excel, de mails et de PDF.
                </p>
              </div>

              <Button
                asChild
                className="mt-6 h-11 rounded-none bg-doxa-yellow px-5 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-doxa-ink hover:bg-white"
              >
                <a href="#product-overview">
                  Voir le parcours produit
                  <ArrowRight data-icon="inline-end" />
                </a>
              </Button>
            </div>

            <div className="relative overflow-hidden px-5 py-7 sm:px-7 lg:px-8 lg:py-9">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,227,74,0.18),transparent_36%)]" />
              <div className="relative flex flex-col gap-3">
                {stackLines.map((line, index) => (
                  <div
                    key={line}
                    className="border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm"
                  >
                    <p className="font-heading text-[1.02rem] font-medium tracking-[-0.04em] text-white">
                      {line}
                    </p>
                  </div>
                ))}

                <div className="mt-3 border border-doxa-yellow/50 bg-doxa-blue px-5 py-5 shadow-[0_22px_60px_rgba(49,50,204,0.28)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/62">
                    Doxa reunit le tout
                  </p>
                  <p className="mt-2 font-heading text-[1.4rem] font-medium leading-[1] tracking-[-0.055em] text-white">
                    Une seule colonne de travail pour modeliser, faire passer et
                    suivre les dossiers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className={sectionShell}>
      <FadeIn className={sectionFrame}>
        <div className="flex flex-col gap-5">
          <Badge
            variant="outline"
            className="h-7 w-fit rounded-none border-black/10 px-3 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-doxa-blue-dark"
          >
            FAQ
          </Badge>
          <h2 className={sectionHeading}>
            Les questions qui reviennent avant de lancer un premier pilote.
          </h2>
          <p className={sectionLead}>
            On garde ici une FAQ plus propre, plus directe et sans bloc
            supplementaire autour. Juste les points utiles pour comprendre le
            produit et son point de depart.
          </p>
        </div>

        <div className="overflow-hidden rounded-none border border-black/8 bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f8_100%)] shadow-[0_24px_80px_rgba(17,17,17,0.06)]">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-black/6 px-5 sm:px-7"
              >
                <AccordionTrigger className="py-6 text-left font-heading text-[1.08rem] font-medium tracking-[-0.035em] text-doxa-ink hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-6 text-doxa-muted">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </FadeIn>
    </section>
  );
}
