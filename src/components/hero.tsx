"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Crosshair, Radio } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .fromTo(
            ".hero-kicker",
            { opacity: 0, x: -18 },
            { opacity: 1, x: 0, duration: 0.45 },
          )
          .fromTo(
            ".hero-line-inner",
            { opacity: 0, yPercent: 115, rotationX: -28 },
            {
              opacity: 1,
              yPercent: 0,
              rotationX: 0,
              duration: 0.72,
              stagger: 0.11,
              transformOrigin: "50% 100%",
            },
            "-=0.2",
          )
          .fromTo(
            [".hero-description", ".hero-actions", ".hero-note"],
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.48, stagger: 0.08 },
            "-=0.32",
          );

        gsap.to(".game-particle", {
          y: (index) => (index % 2 ? 10 : -12),
          x: (index) => (index % 2 ? -7 : 8),
          rotation: (index) => (index % 2 ? -18 : 22),
          duration: 2.4,
          stagger: 0.24,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".radar-tag", {
          y: (index) => (index % 2 ? 7 : -7),
          duration: 2.8,
          stagger: 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".radar-sweep", {
          rotation: 360,
          duration: 4.8,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".radar-blip", {
          scale: 1.8,
          opacity: 0.45,
          duration: 1.05,
          stagger: 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        const visual = containerRef.current?.querySelector<HTMLElement>(
          ".hero-visual",
        );
        if (!visual) return;

        const rotateX = gsap.quickTo(visual, "rotationX", {
          duration: 0.55,
          ease: "power3.out",
        });
        const rotateY = gsap.quickTo(visual, "rotationY", {
          duration: 0.55,
          ease: "power3.out",
        });

        const move = (event: PointerEvent) => {
          const rect = visual.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          visual.style.setProperty("--glow-x", `${x * 100}%`);
          visual.style.setProperty("--glow-y", `${y * 100}%`);
          rotateY((x - 0.5) * 6);
          rotateX((0.5 - y) * 5);
        };
        const reset = () => {
          rotateX(0);
          rotateY(0);
        };

        visual.addEventListener("pointermove", move);
        visual.addEventListener("pointerleave", reset);

        return () => {
          visual.removeEventListener("pointermove", move);
          visual.removeEventListener("pointerleave", reset);
        };
      });

      return () => media.revert();
    },
    { scope: containerRef },
  );

  return (
    <section className="hero" id="inicio" ref={containerRef}>
      <div className="hero-copy">
        <div className="eyebrow hero-kicker">
          <span className="status-dot" /> SIGNAL LIVE{" "}
          <span className="kicker-divider">/</span> SEU PRÓXIMO JOGO COMEÇA AQUI
        </div>
        <h1>
          <span className="hero-title-line" data-hero-line>
            <span className="hero-line-inner">O QUE MUDOU.</span>
          </span>
          <span className="hero-title-line" data-hero-line>
            <span className="hero-line-inner">O QUE IMPORTA.</span>
          </span>
          <span className="hero-title-line lime" data-hero-line>
            <span className="hero-line-inner">
              O QUE JOGAR<span className="outlined-dot">.</span>
            </span>
          </span>
        </h1>
        <p className="hero-description">
          Seu radar pessoal para acompanhar games, detectar quedas de preço e
          descobrir o que realmente merece seu tempo.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#signals">
            Explorar sinais <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="button ghost" href="#radar">
            <Crosshair size={17} aria-hidden="true" /> Ativar meu radar
          </a>
        </div>
        <div className="hero-note">
          <span className="mini-cross">+</span> MENOS ALGORITMO. MAIS CRITÉRIO.
        </div>
      </div>
      <div
        className="hero-visual"
        data-parallax
        data-speed="0.03"
        aria-label="Ilustração de radar detectando sinais de jogos"
      >
        <div className="hero-game-chips" aria-hidden="true">
          <span>RPG</span>
          <span>CO-OP</span>
          <span>INDIE</span>
        </div>
        <div className="game-particle particle-cross" aria-hidden="true">+</div>
        <div className="game-particle particle-diamond" aria-hidden="true">◆</div>
        <div className="game-particle particle-circle" aria-hidden="true" />
        <div className="radar-topline">
          <span>
            <Radio size={13} aria-hidden="true" /> RADAR SYSTEM / 01
          </span>
          <span className="lime">● ONLINE</span>
        </div>
        <div className="radar-hud-line"><span>LIVE SIGNALS</span><span>CLICK TO OPEN</span></div>
        <div className="radar-side-panel radar-side-left" aria-hidden="true">
          <strong>SCANNING<br />ACTIVE</strong>
          <div className="radar-bars">{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ height: `${28 + (index % 5) * 10}%` }} />)}</div>
          <span>INTERESSE / 70%</span>
        </div>
        <div className="radar-side-panel radar-side-right" aria-hidden="true">
          <span>GAMES ON</span><strong>THE RADAR</strong>
          <div className="radar-progress"><i /></div>
          <small>04 SINAIS QUENTES</small>
        </div>
        <Link className="radar-game-card radar-card-left-top" href="/games/cyberpunk-2077" aria-label="Ver Cyberpunk 2077">
          <span className="radar-card-image cover-cyberpunk" /><strong>HIGH INTEREST</strong>
        </Link>
        <Link className="radar-game-card radar-card-right-bottom" href="/games/hades-ii" aria-label="Ver Hades II">
          <span className="radar-card-image cover-hades" /><strong>EM ALTA</strong>
        </Link>
        <div className="radar-orbit">
          <div className="radar-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="radar-axis horizontal" />
          <div className="radar-axis vertical" />
          <div className="radar-sweep" />
          <div className="radar-center">
            <Crosshair size={27} aria-hidden="true" />
          </div>
          <span className="radar-coordinate coord-n">N</span>
          <span className="radar-coordinate coord-e">E</span>
          <span className="radar-coordinate coord-s">S</span>
          <span className="radar-coordinate coord-w">W</span>
          <div className="radar-blip blip-one" />
          <div className="radar-blip blip-two" />
          <div className="radar-blip blip-three" />
          <Link className="radar-tag tag-one" href="/games/cyberpunk-2077" aria-label="Abrir sinal de Cyberpunk 2077">
            <span className="radar-tag-cover cover-cyberpunk" aria-hidden="true" />
            <span className="lime">↘ PRICE SIGNAL</span>
            <strong>Cyberpunk 2077</strong>
            <span>
              MENOR PREÇO <b>−60%</b>
            </span>
          </Link>
          <Link className="radar-tag tag-two" href="/games/hades-ii" aria-label="Abrir sinal de Hades II">
            <span className="radar-tag-cover cover-hades" aria-hidden="true" />
            <span>↗ TREND SIGNAL</span>
            <strong>Hades II</strong>
            <span>NO NOSSO RADAR</span>
          </Link>
        </div>
        <div className="radar-bottomline">
          <span>SCANNING THE NEXT PLAY_</span>
          <span>03 SINAIS DETECTADOS</span>
        </div>
        <div className="scanner" />
      </div>
      <div className="hero-bottom">
        <span>INTELIGÊNCIA PARA O SEU PLAY.</span>
        <a href="#signals">
          SCROLL PARA EXPLORAR <ArrowDown size={13} aria-hidden="true" />
        </a>
        <span className="demo-label">DADOS DEMONSTRATIVOS</span>
      </div>
    </section>
  );
}
