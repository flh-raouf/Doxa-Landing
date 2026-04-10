import Image from "next/image";
import { Globe, Mail, Send } from "lucide-react";

import { Footer } from "@/components/ui/footer";
import { WaitlistExperience } from "@/components/ui/light-theme-waitlist-landing-page-with-countdown";

const socialLinks = [
  {
    icon: <Mail className="size-4" />,
    href: "mailto:support@Doxa.io",
    label: "Email",
  },
  {
    icon: <Globe className="size-4" />,
    href: "https://www.Doxa.io",
    label: "Website",
  },
  {
    icon: <Send className="size-4" />,
    href: "https://twitter.com/Doxaplatform",
    label: "Twitter",
  },
];

const mainLinks = [
  { href: "#product-overview", label: "Produit" },
  { href: "#problem", label: "Enjeux" },
  { href: "#faq", label: "FAQ" },
  { href: "#waitlist-form", label: "Contact" },
];

const legalLinks = [
  { href: "mailto:support@Doxa.io", label: "Support" },
  { href: "https://www.Doxa.io", label: "Website" },
];

function FooterLogo() {
  return (
    <Image
      src="/Doxa.webp"
      alt="Doxa logo"
      width={40}
      height={40}
      className="size-10 rounded-[2px] object-cover"
    />
  );
}

export function SiteFooter() {
  return (
    <section
      id="waitlist-form"
      className="relative isolate overflow-hidden border-x border-b border-black/6 bg-white"
    >
      <div className="relative z-10">
        <div className="px-4 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
          <WaitlistExperience />
        </div>

        <Footer
          logo={<FooterLogo />}
          brandName="Doxa"
          socialLinks={socialLinks}
          mainLinks={mainLinks}
          legalLinks={legalLinks}
          copyright={{
            text: "© 2026 Doxa. Case Management Platform.",
            license: "All rights reserved.",
          }}
        />
      </div>
    </section>
  );
}
