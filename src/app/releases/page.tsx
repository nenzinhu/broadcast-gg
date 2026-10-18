import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { UpcomingReleases } from "@/components/upcoming-releases";

export const metadata: Metadata = {
  title: "Lançamentos",
  description:
    "Próximos lançamentos de games, trailers e notícias relevantes no radar do BROADCAST.GG.",
};

export default function ReleasesPage() {
  return (
    <>
      <PageIntro
        eyebrow="AGENDA 2026 / LANÇAMENTOS"
        title="Próximos sinais."
        accent="Grandes lançamentos."
        description="Datas, plataformas, trailers e o contexto que importa antes de colocar um novo jogo no seu radar."
      />
      <UpcomingReleases />
    </>
  );
}
