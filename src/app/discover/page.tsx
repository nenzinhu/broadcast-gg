import type { Metadata } from "next";
import { MotionScope } from "@/components/motion-scope";
import { PageHeader } from "@/components/page-header";
import { DiscoverExplorer } from "@/components/discover-explorer";

export const metadata: Metadata = {
  title: "Discover | BROADCAST.GG",
  description:
    "Seleção editorial de jogos com filtros por gênero e páginas individuais de cada título.",
};

export default function DiscoverPage() {
  return (
    <MotionScope>
      <PageHeader
        number="04"
        eyebrow="FORA DO ÓBVIO. DENTRO DO RADAR."
        title="Seu próximo favorito está aqui."
        description="Curadoria do catálogo demonstrativo. Cada jogo tem uma página própria com preço, recomendação e acompanhamento."
      />
      <DiscoverExplorer />
    </MotionScope>
  );
}