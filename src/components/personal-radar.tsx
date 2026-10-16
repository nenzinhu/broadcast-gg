"use client";
import { Crosshair, ArrowUpRight } from "lucide-react";
import { games, formatPrice } from "@/lib/catalog";
import { useRadar } from "./radar-provider";
import { TrackButton } from "./track-button";
import { SectionHeading } from "./section-heading";
export function PersonalRadar() {
  const { trackedIds, ready, storageAvailable } = useRadar();
  const tracked = games.filter((game) => trackedIds.includes(game.id));
  return (
    <section id="radar" className="section personal-radar">
      <SectionHeading
        number="03"
        eyebrow="PERSONAL TRACKING"
        title="Seu gosto. Seu radar."
      >
        <span className="radar-count">
          {String(tracked.length).padStart(2, "0")} JOGOS EM TRACKING
        </span>
      </SectionHeading>
      <p className="section-description">
        Acompanhe os jogos que você quer jogar. A próxima boa decisão começa na
        sua lista.
      </p>
      {!storageAvailable && (
        <p role="status" className="storage-notice">
          O armazenamento está indisponível. Seu radar será mantido apenas nesta
          sessão.
        </p>
      )}
      <div aria-live="polite">
        {!ready ? (
          <p className="empty-state">Carregando seu radar…</p>
        ) : tracked.length ? (
          <div className="tracked-list">
            {tracked.map((game) => (
              <div className="tracked-row" key={game.id}>
                <Crosshair size={20} aria-hidden="true" />
                <div>
                  <h3>{game.title}</h3>
                  <span>{game.genre}</span>
                </div>
                <strong>{formatPrice(game.price)}</strong>
                <TrackButton id={game.id} title={game.title} />
              </div>
            ))}
          </div>
        ) : (
          <div className="radar-empty">
            <div className="empty-radar-icon">
              <Crosshair size={30} aria-hidden="true" />
            </div>
            <div>
              <h3>Toda descoberta começa com um sinal.</h3>
              <p>
                Toque em + nos cards para adicionar seus jogos. Sem conta, sem
                complicação.
              </p>
            </div>
            <a className="button ghost" href="#deals">
              Encontrar meu próximo jogo{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
      <p className="section-footnote">
        Lista salva neste navegador. Sem alertas automáticos ou sincronização
        entre dispositivos.
      </p>
    </section>
  );
}
