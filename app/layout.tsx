import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doxa",
  description:
    "Doxa centralise les cas complexes, structure les workflows et garde une trace fiable des passages et des decisions.",
  icons: {
    icon: "/Doxa.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
