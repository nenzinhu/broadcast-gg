import type { Metadata } from "next";
import { MotionScope } from "@/components/motion-scope";
import { PageHeader } from "@/components/page-header";
import { RadarList } from "@/components/radar-list";

export const metadata: Metadata = {
  title: "Meu radar | BROADCAST.GG",
  description:
    "Sua lista pessoal de jogos acompanhados, salva neste navegador.",
};

export default function RadarPage() {
  return (
    <MotionScope>
      <PageHeader
        number="03"
        eyebrow="PERSONAL TRACKING / SEU RADAR"
        title="Seu gosto. Seu radar."
        description="Os jogos que você adicionou, salvos neste navegador. Sem conta, sem sincronização entre dispositivos."
      />
      <RadarList emptyHref="/deals" />
      <p className="section-footnote">
        Lista salva neste navegador. Se o armazenamento estiver indisponível,
        seus favoritos duram apenas nesta sessão.
      </p>
    </MotionScope>
  );
}