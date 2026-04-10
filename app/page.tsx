import { SiteFooter } from "@/components/marketing/site-footer";
import { HeroSection } from "@/components/marketing/hero-section";
import {
  FaqSection,
  ProblemSection,
  ProductOverviewSection,
  SocialProofSection,
} from "@/components/marketing/landing-sections";

export default function Home() {
  return (
    <main className="flex-1 bg-white" data-landing-page>
      <HeroSection />
      <SocialProofSection />
      <ProductOverviewSection />
      <ProblemSection />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}
