import { PageIntro } from "@/components/page-intro";
import { PersonalRadar } from "@/components/personal-radar";
export const metadata = { title: "Meu radar" };
export default function RadarPage() {
  return (
    <>
      <PageIntro
        eyebrow="SEU PRÓXIMO JOGO / RADAR PESSOAL"
        title="O próximo jogo."
        accent="Do seu jeito."
        description="Uma lista que tem a sua cara. Salve suas descobertas e mantenha por perto os universos que você quer explorar."
      />
      <PersonalRadar />
    </>
  );
}
