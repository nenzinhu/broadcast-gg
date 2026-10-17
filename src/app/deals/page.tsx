import type { Metadata } from "next";
import { MotionScope } from "@/components/motion-scope";
import { PageHeader } from "@/components/page-header";
import { DealsExplorer } from "@/components/deals-explorer";

export const metadata: Metadata = {
  title: "Deals | BROADCAST.GG",
  description:
    "Catálogo demonstrativo com busca e ordenação por preço, desconto e avaliação.",
};

export default function DealsPage() {
  return (
    <MotionScope>
      <PageHeader
        number="02"
        eyebrow="PRICE RADAR / CATÁLOGO"
        title="Jogo bom. Preço melhor."
        description="Busque por título, gênero ou descrição e ordene por menor preço ou maior desconto. Todos os valores são demonstrativos."
      >
        <span className="eyebrow muted">DADOS DEMONSTRATIVOS · BRL</span>
      </PageHeader>
      <DealsExplorer />
    </MotionScope>
  );
}