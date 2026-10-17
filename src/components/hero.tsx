"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Crosshair, Radio } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // 3D text entry animation using SplitText
  useGSAP(() => {
    if (!headingRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const split = new SplitText(headingRef.current, {
      type: "words,chars",
      wordsClass: "hero-word",
      charsClass: "hero-char",
    });

    gsap.set(split.chars, {
      opacity: 0,
      y: 40,
      rotationX: -90,
      transformPerspective: 600,
      transformOrigin: "50% 50% -30px",
    });

    const tl = gsap.timeline({ defaults: { ease: "bouncyOut" } });
    tl.to(split.chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: {
        each: 0.06,
        from: "random",
      },
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  // Continuous subtle 3D rotation on hero heading
  useGSAP(() => {
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const heading = containerRef.current.querySelector(".hero h1");
    if (!heading) return;

    let x = 0;
    let y = 0;
    let ticker = 0;

    const animate = () => {
      ticker += 0.016;
      // Subtle floating rotation based on mouse position
      if (heading) {
        gsap.set(heading, {
          rotationY: x * 0.03,
          rotationX: y * 0.02,
          z: Math.sin(ticker) * 2,
        });
      }
    };

    const handleMouseMove = (e: Event) => {
      const me = e as MouseEvent;
      const rect = heading.getBoundingClientRect();
      x = me.clientX - rect.left - rect.width / 2;
      y = me.clientY - rect.top - rect.height / 2;
    };

    heading.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(animate);

    return () => {
      heading.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(animate);
    };
  }, []);

  return (
    <section className="hero" id="inicio" ref={containerRef}>
      <div className="hero-copy">
        <div className="eyebrow hero-kicker">
          <span className="status-dot" /> SIGNAL LIVE{" "}
          <span className="kicker-divider">/</span> SEU PRÓXIMO JOGO COMEÇA AQUI
        </div>
        <h1 ref={headingRef}>
          <span data-hero-line>O QUE MUDOU.</span>
          <span data-hero-line>O QUE IMPORTA.</span>
          <span className="lime" data-hero-line>
            O QUE JOGAR<span className="outlined-dot">.</span>
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
        <div className="radar-topline">
          <span>
            <Radio size={13} aria-hidden="true" /> RADAR SYSTEM / 01
          </span>
          <span className="lime">● ONLINE</span>
        </div>
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
          <div className="radar-tag tag-one">
            <span className="lime">↘ PRICE SIGNAL</span>
            <strong>Cyberpunk 2077</strong>
            <span>
              MENOR PREÇO <b>−60%</b>
            </span>
          </div>
          <div className="radar-tag tag-two">
            <span>↗ TREND SIGNAL</span>
            <strong>Hades II</strong>
            <span>NO NOSSO RADAR</span>
          </div>
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
