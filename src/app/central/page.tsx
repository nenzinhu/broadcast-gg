import type { Metadata } from "next";
import { IntelligenceHub } from "@/components/intelligence-hub";
import { IntelligenceSummary } from "@/components/intelligence-summary";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Central de inteligência",
  description:
    "Catálogos, retornos e ordem para jogar: três leituras editoriais para decidir seu próximo movimento.",
};

export default function CentralPage() {
  return (
    <>
      <PageIntro
        eyebrow="BROADCAST.GG / CENTRAL ONLINE"
        title="Central de"
        accent="inteligência."
        description="Sinais organizados para você gastar menos tempo procurando e mais tempo jogando o que faz sentido agora."
      />
      <IntelligenceSummary />
      <IntelligenceHub />
    </>
  );
}
