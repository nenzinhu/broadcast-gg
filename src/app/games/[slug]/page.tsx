import type { Metadata } from "next";
import { GameArtwork } from "@/components/game-artwork";
import { GameMedia } from "@/components/game-media";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { games, getGameBySlug, formatPrice, discount } from "@/lib/catalog";
import { getDecision } from "@/lib/decision";
import { TrackButton } from "@/components/track-button";
export const dynamicParams = false;
export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const game = getGameBySlug((await params).slug);
  return {
    title: game?.title ?? "Jogo não encontrado",
    description: game?.description,
  };
}
export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const game = getGameBySlug((await params).slug);
  if (!game) notFound();
  const decision = getDecision(game);
  return (
    <article className="game-page">
      <Link className="back-link" href="/discover">
        <ArrowLeft size={16} /> Voltar às descobertas
      </Link>
      <div className="game-cover">
        <GameArtwork game={game} hero priority />
        <div className="game-cover-overlay">
          <span className="eyebrow">GAME INTELLIGENCE / {game.genre}</span>
          <h1>{game.title}</h1>
        </div>
      </div>
      <div className="game-detail-grid">
        <section className="game-story" data-reveal>
          <span className="eyebrow lime">UM UNIVERSO PARA CHAMAR DE SEU</span>
          <h2>
            A próxima história
            <br />é você quem joga.
          </h2>
          <p>{game.description}</p>
          <div className="genre-tags">
            {game.genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
          <Link className="text-link" href="/signals">
            Explorar sinais <ArrowUpRight size={18} />
          </Link>
        </section>
        <aside
          className="game-purchase"
          aria-label="Análise do jogo"
          data-reveal
        >
          <span className="eyebrow">PRICE SIGNAL / DEMONSTRAÇÃO</span>
          <div className="game-price">
            <div>
              <del>{formatPrice(game.originalPrice)}</del>
              <strong>{formatPrice(game.price)}</strong>
            </div>
            <span className="discount">−{discount(game)}%</span>
          </div>
          <div className={`verdict verdict-${decision.verdict.toLowerCase()}`}>
            <strong>{decision.verdict}</strong>
            <ArrowUpRight />
          </div>
          <p>{decision.reason}</p>
          <div className="game-facts">
            <span>
              Menor preço do cenário
              <strong>{formatPrice(game.historicalLow)}</strong>
            </span>
            <span>
              Avaliação demonstrativa<strong>{game.score}/100</strong>
            </span>
          </div>
          <TrackButton id={game.id} title={game.title} />
          <p className="section-footnote">
            Valores e avaliação ilustrativos. Sem consulta a lojas em tempo
            real.
          </p>
        </aside>
      </div>
      <GameMedia key={game.slug} game={game} />
    </article>
  );
}
