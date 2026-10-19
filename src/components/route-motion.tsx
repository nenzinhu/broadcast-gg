"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { MotionScope } from "./motion-scope";

/**
 * Transição de página com GSAP.
 * - Conteúdo atual sai com fade + slide para cima.
 * - Novo conteúdo entra com fade + slide para baixo.
 * - Respeita prefers-reduced-motion.
 */
export function RouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const el = containerRef.current;
    if (!el) return;

    if (prefersReduced) {
      gsap.set(el, { clearProps: "opacity,transform" });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
    );

    return () => {
      tween.kill();
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="route-transition-wrap">
      <MotionScope key={pathname}>{children}</MotionScope>
    </div>
  );
}

export const RouteMotion = RouteTransition;
