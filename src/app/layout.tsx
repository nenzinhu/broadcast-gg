import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "./globals.css";
import "./media.css";
import "./color-system.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RadarProvider } from "@/components/radar-provider";
import { RouteTransition } from "@/components/route-motion";
export const metadata: Metadata = {
  title: {
    default: "broadcastganes.com.br — Seu próximo jogo começa com um sinal.",
    template: "%s | broadcastganes.com.br",
  },
  description:
    "O que mudou. O que importa. O que jogar. Seu radar pessoal de games, preços e descobertas.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <RadarProvider>
          <div className="shell">
            <a className="skip-link" href="#main">
              Pular para o conteúdo
            </a>
            <SiteHeader />
            <main id="main">
              <RouteTransition>{children}</RouteTransition>
            </main>
            <SiteFooter />
          </div>
        </RadarProvider>
      </body>
    </html>
  );
}
