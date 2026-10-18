"use client";

import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Play, X } from "lucide-react";
import { upcomingReleases, type UpcomingRelease } from "@/lib/releases";

export function UpcomingReleases({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<UpcomingRelease | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  function openTrailer(release: UpcomingRelease, button: HTMLButtonElement) {
    opener.current = button;
    setSelected(release);
    requestAnimationFrame(() => dialog.current?.showModal());
  }

  return (
    <section
      className={`upcoming-releases ${compact ? "upcoming-releases-compact" : ""}`}
      aria-labelledby={compact ? "home-releases-title" : undefined}
    >
      {compact && (
        <div className="release-section-heading" data-reveal>
          <div>
            <span className="eyebrow">
              <span className="status-dot lime" /> PRÓXIMOS SINAIS / 2026
            </span>
            <h2 id="home-releases-title" data-split-title>
              Os jogos que estão chegando.
            </h2>
          </div>
          <Link href="/releases" className="text-link">
            Ver todos os lançamentos <ArrowUpRight size={17} />
          </Link>
        </div>
      )}

      <div className="release-grid">
        {upcomingReleases.map((release, index) => {
          return (
            <article
              className="release-card interactive-card"
              key={release.id}
              data-card-reveal
              data-reveal
              style={
                {
                  "--release-accent": release.accent,
                  "--release-image": `url("${release.image}")`,
                } as CSSProperties
              }
            >
              <div
                className="release-image"
                role="img"
                aria-label={`Imagem do trailer de ${release.title}`}
              >
                <span className="release-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`release-status ${release.status === "a-confirmar" ? "pending" : ""}`}
                >
                  {release.status === "confirmado"
                    ? "DATA CONFIRMADA"
                    : "INFORMAÇÃO A CONFIRMAR"}
                </span>
                <button
                  className="release-play"
                  type="button"
                  aria-label={`${release.trailerLabel} de ${release.title}`}
                  onClick={(event) => openTrailer(release, event.currentTarget)}
                >
                  <Play size={22} fill="currentColor" />
                </button>
              </div>
              <div className="release-content">
                <div className="release-date">
                  <CalendarDays size={15} aria-hidden="true" />
                  <span>{release.date}</span>
                </div>
                <h3>{release.title}</h3>
                <p className="release-platforms">{release.platforms}</p>
                <p>{release.news}</p>
                <a
                  className="text-link"
                  href={release.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Fonte: {release.sourceLabel} <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {!compact && (
        <p className="section-footnote">
          Datas e plataformas podem mudar. Informações sem confirmação oficial
          são identificadas no próprio card.
        </p>
      )}

      <dialog
        ref={dialog}
        className="release-dialog"
        aria-label={selected ? `Trailer de ${selected.title}` : "Trailer"}
        onClose={() => {
          setSelected(null);
          opener.current?.focus();
        }}
      >
        <button
          type="button"
          className="icon-button release-dialog-close"
          aria-label="Fechar trailer"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        {selected && (
          <>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selected.youtubeId}?autoplay=1&rel=0`}
              title={`Vídeo de ${selected.title} no YouTube`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div className="release-dialog-caption">
              <span className="eyebrow">TRAILER / YOUTUBE</span>
              <strong>{selected.title}</strong>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
