import { FeaturedGame } from "@/components/featured-game";
import { GameCard } from "@/components/game-card";
import { SectionHeading } from "@/components/section-heading";
import { Tabs } from "@/components/tabs";
import { games, type Game, discount } from "@/lib/catalog";
import { Hero } from "@/components/hero";
import { LiveSignals } from "@/components/live-signals";
import { PriceRadar } from "@/components/price-radar";
import { DecisionEngine } from "@/components/decision-engine";
import { PersonalRadar } from "@/components/personal-radar";
import { Discover } from "@/components/discover";
import { UpcomingReleases } from "@/components/upcoming-releases";
import { HeroSignalStrip } from "@/components/hero-signal-strip";

function GameGrid({ games: gridGames }: { games: Game[] }) {
  return (
    <div className="tab-game-grid">
      {gridGames.map((game) => (
        <div key={game.id} className="tab-game-wrap" data-tab-child>
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}

const catalogTabs = [
  {
    id: "todos",
    label: "Todos os jogos",
    children: <GameGrid games={games} />,
  },
  {
    id: "promocoes",
    label: "Em promoção",
    children: <GameGrid games={games.filter((game) => discount(game) >= 45)} />,
  },
  {
    id: "rpg",
    label: "RPG",
    children: (
      <GameGrid games={games.filter((game) => game.genres.includes("RPG"))} />
    ),
  },
  {
    id: "acao-indie",
    label: "Ação e Indie",
    children: (
      <GameGrid
        games={games.filter(
          (game) =>
            game.genres.includes("Ação") || game.genres.includes("Indie"),
        )}
      />
    ),
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <HeroSignalStrip />
      <SectionHeading
        number="01"
        eyebrow="NAVEGUE PELO CATÁLOGO."
        title="Escolha onde começar."
      >
        <Tabs tabs={catalogTabs} defaultValue="todos" />
      </SectionHeading>
      <FeaturedGame game={games[1]} />
      <UpcomingReleases compact />
      <LiveSignals />
      <PriceRadar />
      <DecisionEngine />
      <PersonalRadar />
      <Discover />
    </>
  );
}
