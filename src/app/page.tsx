import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { LiveSignals } from "@/components/live-signals";
import { PriceRadar } from "@/components/price-radar";
import { DecisionEngine } from "@/components/decision-engine";
import { PersonalRadar } from "@/components/personal-radar";
import { Discover } from "@/components/discover";
import { RadarProvider } from "@/components/radar-provider";
import { MotionScope } from "@/components/motion-scope";
export default function Home() {
  return (
    <RadarProvider>
      <MotionScope>
        <div className="shell">
          <a className="skip-link" href="#main">
            Pular para o conteúdo
          </a>
          <SiteHeader />
          <main id="main">
            <Hero />
            <LiveSignals />
            <PriceRadar />
            <DecisionEngine />
            <PersonalRadar />
            <Discover />
          </main>
          <SiteFooter />
        </div>
      </MotionScope>
    </RadarProvider>
  );
}
