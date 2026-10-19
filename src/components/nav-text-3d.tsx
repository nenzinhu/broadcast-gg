"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Texto 3D com animação neon específica por aba.
 *
 * Variantes:
 * - signals  → verde néon, pulso rápido (scanner de sinais)
 * - deals    → amarelo néon, salto para cima (oferta chamando atenção)
 * - discover → ciano néon, flutuação + rotação 3D lenta (exploração)
 * - launches → magenta néon, decola para cima com escala explosiva
 * - radar    → roxo néon, varredura/pulso circular lento
 */
export function NavText3D({
  children,
  variant,
  className,
}: {
  children: string;
  variant?: "signals" | "deals" | "discover" | "launches" | "radar";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const LAYERS = 14;
  const STEP = 0.7; // px de profundidade por camada

  // Cores neon por variante (frente + profundidade)
  const NEON = {
    signals: { front: "#00ff87", depth: "#00ff8744", glow: "#00ff87" },
    deals: { front: "#fff700", depth: "#fff70044", glow: "#fff700" },
    discover: { front: "#00f2ff", depth: "#00f2ff44", glow: "#00f2ff" },
    launches: { front: "#ff00de", depth: "#ff00de44", glow: "#ff00de" },
    radar: { front: "#b389ff", depth: "#b389ff44", glow: "#b389ff" },
  };

  const color = NEON[variant || "signals"];

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    // Anúncios baseados na variante (GSAP).
    let tween: gsap.core.Tween | gsap.core.Timeline;

    switch (variant) {
      case "deals":
        // Oferta: salta para cima com escala explosiva.
        tween = gsap.to(el, {
          y: prefersReduced ? 0 : -10,
          scale: prefersReduced ? 1 : 1.12,
          rotation: prefersReduced ? 0 : -3,
          duration: 0.5,
          ease: "back.out(1.7)",
          transformStyle: "preserve-3d",
          paused: true,
        });
        break;
      case "discover":
        // Descobrir: flutuação suave + rotação 3D lenta.
        tween = gsap.to(el, {
          y: prefersReduced ? 0 : -8,
          rotationY: prefersReduced ? 0 : 18,
          rotationX: prefersReduced ? 0 : -12,
          duration: 0.7,
          ease: "sine.inOut",
          transformStyle: "preserve-3d",
          paused: true,
        });
        break;
      case "launches":
        // Lançamento: decola para cima com escala forte.
        tween = gsap.to(el, {
          y: prefersReduced ? 0 : -22,
          scale: prefersReduced ? 1 : 1.35,
          rotation: prefersReduced ? 0 : 8,
          duration: 0.6,
          ease: "power4.out",
          transformStyle: "preserve-3d",
          paused: true,
        });
        break;
      case "radar":
        // Radar: varredura/pulso circular (rotação contínua suave no hover).
        tween = gsap.to(el, {
          rotation: prefersReduced ? 0 : 12,
          scale: prefersReduced ? 1 : 1.06,
          duration: 0.55,
          ease: "power2.inOut",
          transformStyle: "preserve-3d",
          paused: true,
          repeat: -1,
          yoyo: true,
        });
        break;
      case "signals":
      default:
        // Sinais: pulso rápido de scanner (inclinação nervosa).
        tween = gsap.to(el, {
          rotationY: prefersReduced ? 0 : 22,
          rotationX: prefersReduced ? 0 : -14,
          rotation: prefersReduced ? 0 : 6,
          duration: 0.45,
          ease: "power3.out",
          transformStyle: "preserve-3d",
          paused: true,
          repeat: -1,
          yoyo: true,
        });
        break;
    }

    el.addEventListener("mouseenter", () => tween.play());
    el.addEventListener("mouseleave", () => tween.reverse());

    return () => {
      el.removeEventListener("mouseenter", () => tween.play());
      el.removeEventListener("mouseleave", () => tween.reverse());
      tween.kill();
    };
  }, [variant]);

  return (
    <span
      ref={ref}
      className={`nav-text-3d nav-text-3d--${variant || "signals"} ${className || ""}`}
      style={{
        "--layers": LAYERS,
        "--step": `${STEP}px`,
        "--neon-front": color.front,
        "--neon-depth": color.depth,
        "--neon-glow": color.glow,
      } as React.CSSProperties}
    >
      {Array.from({ length: LAYERS }).map((_, i) => (
        <span
          key={i}
          className="nav-text-layer"
          style={{
            "--z": `${(LAYERS - i) * STEP}px`,
          } as React.CSSProperties}
          aria-hidden="true"
        >
          {children}
        </span>
      ))}
      {/* Camada da frente, nítida e com a cor neon da variante. */}
      <span
        className="nav-text-layer nav-text-layer-front"
        style={{
          "--z": `${(LAYERS + 1) * STEP}px`,
        } as React.CSSProperties}
      >
        {children}
      </span>
    </span>
  );
}
