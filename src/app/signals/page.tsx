import type { Metadata } from "next";
import { MotionScope } from "@/components/motion-scope";
import { PageHeader } from "@/components/page-header";
import { LiveSignals } from "@/components/live-signals";

export const metadata: Metadata = {
  title: "Signals | BROADCAST.GG",
  description:
    "Feed de sinais de preço, updates e tendências com filtros por tipo e busca por jogo. Dados demonstrativos.",
};

export default function SignalsPage() {
  return (
    <MotionScope>
      <PageHeader
        number="01"
        eyebrow="LIVE SIGNALS / FEED COMPLETO"
        title="O jogo muda. A gente sinaliza."
        description="Filtre por tipo de sinal e busque pelo jogo. Sinais, horários e preços são demonstrativos, sem atualização em tempo real."
      />
      <LiveSignals withSearch />
    </MotionScope>
  );
}