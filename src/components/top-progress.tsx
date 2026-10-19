"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

/**
 * Barra de carregamento no topo da tela durante navegação do Next.js.
 * Detecta mudança de pathname e anima a barra.
 */
export function TopProgress() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      setVisible(true);
      gsap.killTweensOf(bar);
      gsap.to(bar, { width: "70%", duration: 0.3, ease: "power2.out" });

      // Simula conclusão após um curto período (Next.js é rápido no client-side)
      const timer = setTimeout(() => {
        gsap.to(bar, {
          width: "100%",
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(bar, {
              width: "0%",
              opacity: 0,
              duration: 0.25,
              ease: "power2.in",
              onComplete: () => setVisible(false),
            });
          },
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="top-progress-wrap">
      <div ref={progressRef} className="top-progress-bar" />
    </div>
  );
}
