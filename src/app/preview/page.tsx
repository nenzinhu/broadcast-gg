import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PreviewBrowser } from "@/components/preview-browser";
import { previewGames } from "@/lib/previews";

export const metadata: Metadata = {
  title: "Preview",
  description:
    "Os jogos mais esperados, com fatos, rumores, fotos e trailers no radar do BROADCAST.GG.",
};

export default function PreviewPage() {
  return (
    <>
      <PageIntro
        eyebrow="PREVIEW / PRÓXIMOS SINAIS"
        title="Os jogos que vêm aí."
        accent="Antes do hype."
        description="Dezoito mundos no radar, com contexto para separar o que já foi confirmado do que ainda é rumor."
      />
      <PreviewBrowser games={previewGames} />
    </>
  );
}
