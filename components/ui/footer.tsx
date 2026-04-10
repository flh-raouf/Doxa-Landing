import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface FooterProps {
  logo: ReactNode;
  brandName: string;
  socialLinks: Array<{
    icon: ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    text: string;
    license?: string;
  };
}

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function Footer({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-20">
      <div className="px-4 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label={brandName}>
            {logo}
            <span className="font-heading text-xl font-semibold tracking-[-0.04em] text-doxa-ink">
              {brandName}
            </span>
          </Link>

          <ul className="flex list-none flex-wrap gap-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-10 rounded-full bg-white/80 hover:bg-white"
                  asChild
                >
                  <a
                    href={link.href}
                    aria-label={link.label}
                    target={isExternalLink(link.href) ? "_blank" : undefined}
                    rel={isExternalLink(link.href) ? "noreferrer" : undefined}
                  >
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-black/8 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10 lg:gap-6">
          <div className="text-sm leading-6 text-muted-foreground lg:col-[1/4] lg:row-[1/3] lg:mt-0">
            <div>{copyright.text}</div>
            {copyright.license ? <div>{copyright.license}</div> : null}
          </div>

          <nav className="mt-6 lg:col-[4/11] lg:mt-0">
            <ul className="list-none flex flex-wrap gap-x-4 gap-y-2 lg:justify-end">
              {mainLinks.map((link) => (
                <li key={link.label} className="shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 lg:col-[4/11] lg:mt-0">
            <ul className="list-none flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
              {legalLinks.map((link) => (
                <li key={link.label} className="shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
