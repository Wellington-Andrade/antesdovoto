import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Preferences } from "@/components/Preferences";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Antes do voto — 5 minutos para conferir",
    template: "%s | Antes do voto",
  },
  description:
    "Conheça Flávio Bolsonaro e Lula. Confira trajetórias, propostas de 2026 e fontes públicas em uma experiência de cinco minutos.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Antes do voto",
    images: ["/opengraph-image"],
  },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Browser extensions may add attributes to html before React hydrates.
    // Suppression is limited to this element; descendants keep normal checks.
    <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Preferences>
          <AppShell>{children}</AppShell>
        </Preferences>
      </body>
    </html>
  );
}
