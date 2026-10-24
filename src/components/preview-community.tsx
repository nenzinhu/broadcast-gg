"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, MessageSquare, Play, X } from "lucide-react";
import {
  getCommunitySearchUrl,
  type PreviewCommunityVideo,
  type PreviewGame,
} from "@/lib/previews";

export function PreviewCommunity({ game }: { game: PreviewGame }) {
  const [active, setActive] = useState<PreviewCommunityVideo | null>(null);
  const [failedThumbs, setFailedThumbs] = useState<Set<string>>(new Set());
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  function openVideo(
    video: PreviewCommunityVideo,
    button: HTMLButtonElement,
  ) {
    opener.current = button;
    setActive(video);
    requestAnimationFrame(() => dialog.current?.showModal());
  }

  return (
    <section
      className="preview-community"
      aria-labelledby={`${game.slug}-community`}
    >
      <div className="preview-community-head">
        <div>
          <span className="preview-section-kicker">COMUNIDADE NO YOUTUBE</span>
          <h3 id={`${game.slug}-community`}>Quem está falando do jogo</h3>
        </div>
        <a
          className="preview-community-search"
          href={getCommunitySearchUrl(game)}
          target="_blank"
          rel="noreferrer"
        >
          Buscar no YouTube <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <p className="preview-community-note">
        Vídeos de criadores independentes, sem vínculo com o estúdio. O conteúdo
        representa a opinião de cada canal.
      </p>

      {game.communityVideos.length > 0 ? (
        <div className="preview-community-grid">
          {game.communityVideos.map((video) => (
            <button
              key={video.youtubeId}
              type="button"
              className="preview-community-card"
              aria-label={`Assistir ${video.kind.toLocaleLowerCase("pt-BR")} de ${video.channel} sobre ${game.title}`}
              onClick={(event) => openVideo(video, event.currentTarget)}
            >
              <span className="preview-community-thumb">
                {failedThumbs.has(video.youtubeId) ? (
                  <span className="preview-community-thumb-fallback">
                    <MessageSquare aria-hidden="true" />
                  </span>
                ) : (
                  <Image
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt=""
                    width={480}
                    height={360}
                    unoptimized
                    onError={() =>
                      setFailedThumbs((current) =>
                        new Set(current).add(video.youtubeId),
                      )
                    }
                  />
                )}
                <span className="preview-community-play" aria-hidden="true">
                  <Play fill="currentColor" />
                </span>
                <span className="preview-community-kind">{video.kind}</span>
              </span>
              <span className="preview-community-body">
                <strong>{video.title}</strong>
                <small>{video.channel}</small>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="preview-community-empty">
          Nenhum vídeo da comunidade verificado para este título. Use a busca
          acima para ver o que os canais publicaram.
        </p>
      )}

      <dialog
        ref={dialog}
        className="preview-community-dialog"
        aria-label={`Vídeo da comunidade sobre ${game.title}`}
        onClose={() => {
          setActive(null);
          opener.current?.focus();
        }}
      >
        <button
          type="button"
          className="preview-community-close"
          aria-label="Fechar vídeo"
          onClick={() => dialog.current?.close()}
        >
          <X aria-hidden="true" />
        </button>
        {active && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
            title={`${active.title} — ${active.channel}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </dialog>
    </section>
  );
}
