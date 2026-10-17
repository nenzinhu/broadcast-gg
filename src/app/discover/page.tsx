import { PageIntro } from "@/components/page-intro";
import { CatalogBrowser } from "@/components/catalog-browser";
export const metadata = { title: "Discover" };
export default function DiscoverPage() {
  return (
    <>
      <PageIntro
        eyebrow="BEYOND THE ALGORITHM / DISCOVER"
        title="Saia do óbvio."
        accent="Entre em outro mundo."
        description="De um reino esquecido a uma cidade que nunca dorme. Encontre a experiência que combina com seu próximo play."
      />
      <CatalogBrowser mode="discover" />
    </>
  );
}
