"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Texto com efeito 3D (extrusão) animado por GSAP.
 * - Várias camadas do texto deslocadas em Z criam a profundidade.
 * - Hover inclina o texto (rotationY/rotationX) com GSAP.
 * - Respeita prefers-reduced-motion.
 */
export function NavText3D({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const LAYERS = 12;
  const STEP = 0.6; // px de profundidade por camada

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const tween = gsap.to(el, {
      rotationY: prefersReduced ? 0 : 14,
      rotationX: prefersReduced ? 0 : -8,
      duration: 0.55,
      ease: "power3.out",
      transformStyle: "preserve-3d",
      paused: true,
    });

    el.addEventListener("mouseenter", () => tween.play());
    el.addEventListener("mouseleave", () => tween.reverse());

    return () => {
      el.removeEventListener("mouseenter", () => tween.play());
      el.removeEventListener("mouseleave", () => tween.reverse());
      tween.kill();
    };
  }, []);

  return (
    <span
      ref={ref}
      className={`nav-text-3d ${className || ""}`}
      style={{ "--layers": LAYERS, "--step": `${STEP}px` } as React.CSSProperties}
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
      {/* Camada da frente, nítida e com a cor do link. */}
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
