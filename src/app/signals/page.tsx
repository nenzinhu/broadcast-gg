import { PageIntro } from "@/components/page-intro";
import { SignalBrowser } from "@/components/signal-browser";
export const metadata = { title: "Signals" };
export default function SignalsPage() {
  return (
    <>
      <PageIntro
        eyebrow="INTELLIGENCE FEED / SIGNALS"
        title="O que mudou."
        accent="E por que importa."
        description="Mudanças de preço, novos motivos para voltar e jogos que merecem atenção. O essencial, sem o ruído."
      />
      <SignalBrowser />
    </>
  );
}
