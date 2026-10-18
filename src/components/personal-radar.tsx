"use client";

import Link from "next/link";
import { Crosshair, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { games, formatPrice } from "@/lib/catalog";
import { useRadar } from "./radar-provider";
import { TrackButton } from "./track-button";
import { SectionHeading } from "./section-heading";

export function PersonalRadar() {
  const { trackedIds, ready, storageAvailable } = useRadar();
  const tracked = games.filter((game) => trackedIds.includes(game.id));
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Animações GSAP do radar: entrada da seção, stagger das linhas,
  // estados vazia/carregando e destaque suave nos itens.
  useGSAP(
    () => {
      const prefersReduced = window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      const section = sectionRef.current;
      if (!section) return;

      const header = section.querySelector(".section-heading, .radar-count");
      const description = section.querySelector(".section-description");
      const notice = section.querySelector(".storage-notice");
      const container = section.querySelector<HTMLDivElement>(
        '[aria-live="polite"]'
      );
      const footnote = section.querySelector(".section-footnote");

      const tl = gsap.timeline({ paused: true });

      // Entrada da seção: título/contador -> descrição -> conteudo -> rodape
      tl.from(header, {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      tl.from(
        description,
        { y: 12, opacity: 0, duration: 0.4, ease: "power2.out" },
        "<0.15"
      );
      tl.from(notice, {
        y: 10,
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      }, "<0.1");
      tl.from(footnote, {
        y: 10,
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      }, "<0.1");

      if (prefersReduced) {
        tl.progress(1).pause();
        return () => tl.kill();
      }

      // Conteúdo dinâmico (carregando / vazio / lista) entra com fade + slide.
      if (container) {
        gsap.set(container, { opacity: 0, y: 14 });
        tl.to(container, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        }, "<0.05");
      }

      tl.play();

      // Stagger das linhas quando a lista já existe.
      const animateRows = () => {
        const rows = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll(".tracked-row")
        );
        if (!rows.length) return;
        gsap.from(rows, {
          y: 16,
          opacity: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      // Re-anima linhas quando tracked muda (adição/remoção).
      animateRows();

      // Destaque sutil ao passar o mouse em uma linha tracked-row.
      const enter = (event: Event) => {
        if (!(event.target instanceof Element)) return;
        const row = event.target.closest<HTMLElement>(".tracked-row");
        if (!row) return;
        gsap.to(row, {
          scale: 1.015,
          boxShadow: "0 14px 35px rgba(0,0,0,0.35)",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      const leave = (event: Event) => {
        if (!(event.target instanceof Element)) return;
        const row = event.target.closest<HTMLElement>(".tracked-row");
        if (!row) return;
        gsap.to(row, {
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      section.addEventListener("pointerover", enter);
      section.addEventListener("pointerout", leave);
      section.addEventListener("focusin", enter);
      section.addEventListener("focusout", leave);

      return () => {
        tl.kill();
        section.removeEventListener("pointerover", enter);
        section.removeEventListener("pointerout", leave);
        section.removeEventListener("focusin", enter);
        section.removeEventListener("focusout", leave);
      };
    },
    [trackedIds.length, ready, storageAvailable]
  );

  return (
    <section ref={sectionRef} id="radar" className="section personal-radar">
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
              <div
                className="tracked-row"
                key={game.id}
                ref={(el) => {
                  if (el) rowsRef.current.set(game.id, el);
                  return () => {
                    rowsRef.current.delete(game.id);
                  };
                }}
              >
                <Crosshair size={20} aria-hidden="true" />
                <div>
                  <h3>
                    <Link href={`/games/${game.slug}`}>{game.title}</Link>
                  </h3>
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
            <Link className="button ghost" href="/deals">
              Encontrar meu próximo jogo{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
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
