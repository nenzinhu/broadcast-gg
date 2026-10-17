"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { MotionScope } from "./motion-scope";

// Shared state for coordinating page transitions across route changes.
const transitionState = {
  isTransitioning: false,
  // Cache of the current hero element's FLIP state.
  heroState: null as null | Flip.FlipState,
};

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);

  // Detect prefers-reduced-motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // When children change (new route), trigger FLIP animation
  useEffect(() => {
    if (transitioning) return;

    // If content actually changed, animate
    const newChild = (children as React.ReactElement)?.key;
    const oldChild = (displayChildren as React.ReactElement)?.key;

    if (newChild !== oldChild) {
      if (prefersReduced) {
        // No animation on reduced motion
        setDisplayChildren(children);
        return;
      }

      setTransitioning(true);
      transitionState.isTransitioning = true;

      const container = mainRef.current;
      if (!container) {
        setDisplayChildren(children);
        setTransitioning(false);
        transitionState.isTransitioning = false;
        return;
      }

      // Capture the FLIP state of key shared elements
      const heroEl = container.querySelector<HTMLElement>(".hero, .site-header, .site-footer");
      const heroState = heroEl ? Flip.getState(heroEl) : null;
      const bodyState = Flip.getState(container);

      // Change the content
      setDisplayChildren(children);

      // Wait for DOM update
      requestAnimationFrame(() => {
        const newHeroEl = container?.querySelector<HTMLElement>(".hero, .site-header, .site-footer");
        if (newHeroEl && heroState) {
          Flip.from(bodyState, {
            duration: 0.5,
            ease: "bouncyOut",
            absolute: ".hero, .site-header, .site-footer",
            onComplete: () => {
              setTransitioning(false);
              transitionState.isTransitioning = false;
              transitionState.heroState = null;
            },
            onUpdate: () => {},
          });
          // Animate the hero element
          Flip.from(heroState, {
            duration: 0.4,
            ease: "power2.inOut",
            absolute: true,
            onComplete: () => {
              gsap.set(newHeroEl, { clearProps: "transform,opacity" });
            },
          });
        } else {
          // Fallback: simple fade
          gsap.fromTo(
            container,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
          setTransitioning(false);
          transitionState.isTransitioning = false;
        }
      });
    }
  }, [children, displayChildren, pathname, transitioning, prefersReduced]);

  return (
    <main id="main" ref={mainRef} className={transitioning ? "page-transitioning" : ""}>
      <MotionScope key={pathname}>{displayChildren}</MotionScope>
    </main>
  );
}

// Backwards-compatible wrapper that just adds MotionScope with key
export function RouteMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <MotionScope key={pathname}>{children}</MotionScope>;
}