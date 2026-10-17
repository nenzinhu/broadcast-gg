import { Hero } from "@/components/hero";
import { LiveSignals } from "@/components/live-signals";
import { PriceRadar } from "@/components/price-radar";
import { DecisionEngine } from "@/components/decision-engine";
import { PersonalRadar } from "@/components/personal-radar";
import { Discover } from "@/components/discover";
import { MotionScope } from "@/components/motion-scope";

export default function Home() {
  return (
    <MotionScope>
      <Hero />
      <LiveSignals />
      <PriceRadar />
      <DecisionEngine />
      <PersonalRadar />
      <Discover />
    </MotionScope>
  );
}