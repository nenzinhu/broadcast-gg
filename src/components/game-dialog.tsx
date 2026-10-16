"use client";
import { useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { type Game, formatPrice } from "@/lib/catalog";
import { TrackButton } from "./track-button";
export function GameDialog({ game }: { game: Game }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={trigger}
        className="discover-link"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Conhecer ${game.title}`}
      >
        <span>Conhecer o jogo</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        className="game-dialog"
        aria-labelledby={`dialog-${game.id}`}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              dialog.current?.close();
          }
        }}
      >
        <div className="dialog-top">
          <span className="eyebrow">GAME INTELLIGENCE</span>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Fechar detalhes"
          >
            <X size={22} />
          </button>
        </div>
        <span className="eyebrow lime">{game.genre}</span>
        <h2 id={`dialog-${game.id}`}>{game.title}</h2>
        <p>{game.description}</p>
        <div className="dialog-metrics">
          <span>
            PREÇO DEMONSTRATIVO<strong>{formatPrice(game.price)}</strong>
          </span>
          <span>
            AVALIAÇÃO EXEMPLO<strong>{game.score}/100</strong>
          </span>
        </div>
        <TrackButton id={game.id} title={game.title} />
        <p className="section-footnote">
          Informações ilustrativas, sem consulta a lojas em tempo real.
        </p>
      </dialog>
    </>
  );
}
