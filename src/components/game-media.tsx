"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play, RotateCcw, X } from "lucide-react";
import type { Game } from "@/lib/catalog";
import type { GameplayScreenshot } from "@/lib/game-media";
import { GameArtwork } from "./game-artwork";
export function GameMedia({ game }: { game: Game }) {
  const [playing, setPlaying] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [gallery, setGallery] = useState<{
    status: "loading" | "ready" | "error";
    screenshots: GameplayScreenshot[];
  }>({ status: "loading", screenshots: [] });
  const [selected, setSelected] = useState<GameplayScreenshot | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const play = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/games/${game.slug}/media`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("unavailable");
        const data = await response.json();
        if (!Array.isArray(data.screenshots) || data.screenshots.length === 0)
          throw new Error("empty");
        if (!controller.signal.aborted)
          setGallery({ status: "ready", screenshots: data.screenshots });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setGallery({ status: "error", screenshots: [] });
      });
    return () => controller.abort();
  }, [game.slug, attempt]);
  function handleImageFailure() {
    dialog.current?.close();
    setSelected(null);
    setGallery({ status: "error", screenshots: [] });
  }
  function openScreenshot(
    screenshot: GameplayScreenshot,
    element: HTMLElement,
  ) {
    opener.current = element;
    setSelected(screenshot);
    dialog.current?.showModal();
  }
  return (
    <section id="media" className="game-media-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="status-dot lime" /> WATCH. FEEL. PLAY.
          </span>
          <h2>Antes do play, dê uma olhada.</h2>
        </div>
        <span className="eyebrow">TRAILER + GAMEPLAY</span>
      </div>
      <div className="trailer-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${game.youtubeId}?autoplay=1&rel=0`}
            title={`Trailer de ${game.title} no YouTube`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <GameArtwork game={game} hero />
            <button
              ref={play}
              className="trailer-play"
              onClick={() => setPlaying(true)}
              aria-label={`Assistir trailer de ${game.title}`}
            >
              <span className="play-disc">
                <Play size={34} fill="currentColor" />
              </span>
              <span>
                ASSISTIR TRAILER<small>YOUTUBE / {game.title}</small>
              </span>
            </button>
          </>
        )}
        {playing && (
          <button
            className="trailer-close icon-button"
            aria-label="Fechar trailer"
            onClick={() => {
              setPlaying(false);
              requestAnimationFrame(() => play.current?.focus());
            }}
          >
            <X size={20} />
          </button>
        )}
      </div>
      <div className="media-source">
        <span>O player do YouTube é carregado somente após o clique.</span>
        <a
          href={`https://www.youtube.com/watch?v=${game.youtubeId}`}
          target="_blank"
          rel="noreferrer"
        >
          Abrir no YouTube <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="gameplay-heading">
        <h3>Dentro do jogo.</h3>
        <span className="eyebrow">CAPTURAS / STEAM</span>
      </div>
      {gallery.status === "loading" ? (
        <p className="gallery-status" role="status">
          Carregando capturas reais de gameplay…
        </p>
      ) : gallery.status === "error" ? (
        <div className="gallery-status" role="status">
          <p>As capturas de gameplay não puderam ser carregadas agora.</p>
          <div>
            <button
              className="button ghost"
              onClick={() => {
                setGallery({ status: "loading", screenshots: [] });
                setAttempt((value) => value + 1);
              }}
            >
              <RotateCcw size={16} /> Tentar novamente
            </button>
            <a
              className="text-link"
              href={`https://store.steampowered.com/app/${game.steamAppId}/`}
              target="_blank"
              rel="noreferrer"
            >
              Ver gameplay na Steam <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      ) : (
        <div className="gameplay-grid">
          {gallery.screenshots.map((screenshot, index) => (
            <button
              key={screenshot.id}
              className="gameplay-shot"
              onClick={(event) =>
                openScreenshot(screenshot, event.currentTarget)
              }
              aria-label={`Ampliar gameplay ${index + 1} de ${game.title}`}
            >
              <Image
                src={screenshot.thumbnail}
                alt={`Captura de gameplay ${index + 1} de ${game.title}, publicada na Steam`}
                onError={handleImageFailure}
                width={600}
                height={338}
                unoptimized
              />
              <span>
                0{index + 1} <ArrowUpRight size={17} />
              </span>
            </button>
          ))}
        </div>
      )}
      <p className="section-footnote">
        Imagens e vídeos pertencem aos respectivos estúdios e publishers. Fonte
        das capturas: Steam.
      </p>
      <dialog
        ref={dialog}
        className="screenshot-dialog"
        aria-label={`Gameplay de ${game.title}`}
        onClose={() => {
          setSelected(null);
          opener.current?.focus();
        }}
      >
        <button
          className="icon-button"
          aria-label="Fechar gameplay"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        {selected && (
          <Image
            src={selected.full}
            alt={`Captura ampliada de gameplay de ${game.title}`}
            onError={handleImageFailure}
            width={1920}
            height={1080}
            unoptimized
          />
        )}
      </dialog>
    </section>
  );
}
