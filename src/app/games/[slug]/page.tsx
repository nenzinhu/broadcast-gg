import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Crosshair } from "lucide-react";
import { discount, formatPrice, games, signals } from "@/lib/catalog";
import { getGameBySlug } from "@/lib/catalog-query";
import { getDecision } from "@/lib/decision";
import { TrackButton } from "@/components/track-button";
import { MotionScope } from "@/components/motion-scope";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game)
    return { title: "Jogo não encontrado | BROADCAST.GG" };
  return {
    title: `${game.title} | BROADCAST.GG`,
    description: game.description,
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  const decision = getDecision(game);
  const related = signals.filter(
    (signal) => signal.gameId === game.id,
  );
  return (
    <MotionScope>
      <nav className="breadcrumb" aria-label="Trilha de navegação">
        <Link href="/deals">
          <ArrowLeft size={14} aria-hidden="true" /> Voltar ao catálogo
        </Link>
      </nav>
      <article className="game-detail">
        <div className="game-detail-art">
          <Image
            src={game.image}
            alt={`Arte promocional de ${game.title}`}
            width={900}
            height={560}
            priority
          />
        </div>
        <div className="game-detail-info" data-reveal>
          <div className="eyebrow">
            <Crosshair size={14} aria-hidden="true" /> {game.kicker}
          </div>
          <h1>{game.title}</h1>
          <p className="game-genre">{game.genre}</p>
          <p className="game-description">{game.description}</p>

          <div className="game-metrics">
            <div className="metric-card">
              <span>PREÇO DEMONSTRATIVO</span>
              <strong>{formatPrice(game.price)}</strong>
              <del className="muted">{formatPrice(game.originalPrice)}</del>
            </div>
            <div className="metric-card">
              <span>DESCONTO NO CENÁRIO</span>
              <strong>−{discount(game)}%</strong>
              <small className="muted">
                menor: {formatPrice(game.historicalLow)}
              </small>
            </div>
            <div className="metric-card">
              <span>AVALIAÇÃO EXEMPLO</span>
              <strong>
                {game.score}
                <small>/100</small>
              </strong>
              <small className="muted">nota ilustrativa</small>
            </div>
          </div>

          <div className="game-verdict" data-reveal>
            <span className="eyebrow">RECOMENDAÇÃO DO RADAR</span>
            <div className={`verdict verdict-${decision.verdict.toLowerCase()}`}>
              <strong>{decision.verdict}</strong>
              <ArrowUpRight aria-hidden="true" />
            </div>
            <p>{decision.reason}</p>
            <span className="decision-disclaimer">
              ANÁLISE DEMONSTRATIVA · SEM DADOS AO VIVO
            </span>
          </div>

          <div className="game-detail-actions">
            <TrackButton id={game.id} title={game.title} />
            <Link className="button ghost" href="/radar">
              Ver meu radar <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <p className="section-footnote">
            Recomendação gerada por regras transparentes sobre dados de exemplo.
            Nenhuma loja é consultada em tempo real.{" "}
            <span className="lime">
              <Check size={12} aria-hidden="true" /> Critérios públicos
            </span>
          </p>
        </div>
      </article>
      {related.length > 0 && (
        <section className="section game-related" data-reveal>
          <div className="eyebrow">
            <span className="section-number">↳</span> SINAIS DESTAQUES
          </div>
          <ul className="related-list">
            {related.map((signal) => (
              <li key={signal.id}>
                <span className={`signal-tag ${signal.type}`}>
                  {signal.type.toUpperCase()}
                </span>
                <strong>{signal.title}</strong>
                <span>{signal.time}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </MotionScope>
  );
}