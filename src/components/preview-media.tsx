"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, ImageOff, Play, X } from "lucide-react";
import type { PreviewGalleryImage, PreviewGame } from "@/lib/previews";

export function PreviewMedia({ game }: { game: PreviewGame }) {
  const [playing, setPlaying] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<PreviewGalleryImage | null>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const galleryOpener = useRef<HTMLButtonElement | null>(null);

  function markFailed(src: string) {
    setFailedImages((current) => new Set(current).add(src));
  }

  function openGallery(image: PreviewGalleryImage, opener: HTMLButtonElement) {
    galleryOpener.current = opener;
    setSelected(image);
    requestAnimationFrame(() => dialog.current?.showModal());
  }

  return (
    <section className="preview-media" aria-label={`Mídia de ${game.title}`}>
      <div className="preview-hero-media">
        {playing && game.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${game.youtubeId}?autoplay=1&rel=0`}
            title={`Trailer de ${game.title} no YouTube`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : failedImages.has(game.heroImage) ? (
          <div className="preview-image-fallback" role="img" aria-label={`Arte indisponível de ${game.title}`}>
            <ImageOff aria-hidden="true" />
            <strong>{game.title}</strong>
            <span>ARTE INDISPONÍVEL</span>
          </div>
        ) : (
          <Image
            src={game.heroImage}
            alt={`Imagem oficial de ${game.title}`}
            width={1280}
            height={720}
            priority
            unoptimized
            onError={() => markFailed(game.heroImage)}
          />
        )}

        {!playing && game.youtubeId && (
          <button
            ref={playButton}
            type="button"
            className="preview-play"
            aria-label={`Assistir trailer de ${game.title}`}
            onClick={() => setPlaying(true)}
          >
            <Play fill="currentColor" aria-hidden="true" />
            <span>{game.videoLabel}</span>
          </button>
        )}
        {playing && (
          <button
            type="button"
            className="preview-video-close"
            aria-label="Fechar trailer"
            onClick={() => {
              setPlaying(false);
              requestAnimationFrame(() => playButton.current?.focus());
            }}
          >
            <X aria-hidden="true" />
          </button>
        )}
      </div>

      {game.youtubeId ? (
        <a
          className="preview-video-source"
          href={`https://www.youtube.com/watch?v=${game.youtubeId}`}
          target="_blank"
          rel="noreferrer"
        >
          Abrir vídeo no YouTube <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      ) : (
        <p className="preview-video-unavailable">Vídeo oficial indisponível</p>
      )}

      <div className="preview-gallery" data-reveal>
        {game.gallery.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Ampliar foto ${index + 1} de ${game.title}`}
            onClick={(event) => openGallery(image, event.currentTarget)}
          >
            {failedImages.has(image.src) ? (
              <span className="preview-image-fallback">
                <ImageOff aria-hidden="true" />
                <span>ARTE INDISPONÍVEL</span>
              </span>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={360}
                unoptimized
                onError={() => markFailed(image.src)}
              />
            )}
            <span className="preview-gallery-index">0{index + 1}</span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="preview-gallery-dialog"
        aria-label={`Galeria de ${game.title}`}
        onClose={() => {
          setSelected(null);
          galleryOpener.current?.focus();
        }}
      >
        <button
          type="button"
          aria-label="Fechar galeria"
          onClick={() => dialog.current?.close()}
        >
          <X aria-hidden="true" />
        </button>
        {selected &&
          (failedImages.has(selected.src) ? (
            <div className="preview-dialog-fallback" role="img" aria-label={`Foto indisponível de ${game.title}`}>
              <ImageOff aria-hidden="true" />
              <strong>{game.title}</strong>
              <span>FOTO INDISPONÍVEL</span>
            </div>
          ) : (
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1280}
              height={720}
              unoptimized
              onError={() => markFailed(selected.src)}
            />
          ))}
      </dialog>
    </section>
  );
}
