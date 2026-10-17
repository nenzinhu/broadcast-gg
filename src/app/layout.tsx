import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RadarProvider } from "@/components/radar-provider";

export const metadata: Metadata = {
  title: "BROADCAST.GG — Seu próximo jogo começa com um sinal.",
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
          <div className="shell" id="top">
            <a className="skip-link" href="#main">
              Pular para o conteúdo
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </div>
        </RadarProvider>
      </body>
    </html>
  );
}