import { FeaturedGame } from "@/components/featured-game";
import { games } from "@/lib/catalog";
import { Hero } from "@/components/hero";
import { LiveSignals } from "@/components/live-signals";
import { PriceRadar } from "@/components/price-radar";
import { DecisionEngine } from "@/components/decision-engine";
import { PersonalRadar } from "@/components/personal-radar";
import { Discover } from "@/components/discover";
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedGame game={games[1]} />
      <LiveSignals />
      <PriceRadar />
      <DecisionEngine />
      <PersonalRadar />
      <Discover />
    </>
  );
}
