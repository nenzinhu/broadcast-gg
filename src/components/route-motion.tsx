"use client";

import { useEffect, useRef, useState } from "react";
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
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const prefersReduced = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const el = containerRef.current;
    if (!el) return;

    tlRef.current?.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    if (prefersReduced) {
      setExiting(false);
      return;
    }

    // Sai: fade + sobe
    tl.to(el, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => setExiting(true),
    })
      // Pequena pausa para trocar o conteúdo
      .to({}, { duration: 0.1 })
      // Entra: fade + desce
      .to(el, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => setExiting(false),
      });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  if (exiting) return null;

  return (
    <div ref={containerRef} className="route-transition-wrap">
      <MotionScope key={pathname}>{children}</MotionScope>
    </div>
  );
}

export const RouteMotion = RouteTransition;
