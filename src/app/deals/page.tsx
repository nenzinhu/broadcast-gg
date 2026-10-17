import { PageIntro } from "@/components/page-intro";
import { CatalogBrowser } from "@/components/catalog-browser";
export const metadata = { title: "Ofertas — Radar de preços" };
export default function DealsPage() {
  return (
    <>
      <PageIntro
        eyebrow="RADAR DE PREÇOS / OFERTAS"
        title="Grandes jogos."
        accent="Melhores momentos."
        description="Compare os preços do nosso cenário, descubra oportunidades e coloque seu próximo jogo no radar."
      />
      <CatalogBrowser mode="deals" />
    </>
  );
}
