import type { Metadata } from "next";
import "./globals.css";
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
      <body>{children}</body>
    </html>
  );
}
