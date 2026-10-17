"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export function MotionScope({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", (context) => {
        gsap.from("[data-hero-line]", {
          y: 35,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
        });
        gsap.to(".radar-sweep", {
          rotation: 360,
          duration: 16,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
        gsap.to(".scanner", {
          top: "85%",
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          opacity: 0.3,
        });
        gsap.to(".radar-blip", {
          opacity: 0.35,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          stagger: 0.5,
          ease: "sine.inOut",
        });
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]", root.current)
          .forEach((element) => {
            gsap.from(element, {
              y: 24,
              opacity: 0,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 94%", once: true },
            });
          });
        // Filters and saved games change page height without a window resize.
        // Keep downstream reveal positions aligned with the current layout.
        const container = root.current;
        const animateCard = (event: Event, active: boolean) => {
          if (!(event.target instanceof Element)) return;
          const card = event.target.closest<HTMLElement>(".interactive-card");
          if (!card || !container?.contains(card)) return;
          const related = (event as MouseEvent | FocusEvent).relatedTarget;
          if (related instanceof Node && card.contains(related)) return;
          if (
            !active &&
            (card.matches(":hover") || card.contains(document.activeElement))
          )
            return;
          gsap.to(card, {
            y: active ? -6 : 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const enter = context.add("cardEnter", (event: Event) =>
          animateCard(event, true),
        ) as EventListener;
        const leave = context.add("cardLeave", (event: Event) =>
          animateCard(event, false),
        ) as EventListener;
        container?.addEventListener("pointerover", enter);
        container?.addEventListener("pointerout", leave);
        container?.addEventListener("focusin", enter);
        container?.addEventListener("focusout", leave);
        let frame = 0;
        const observer = new ResizeObserver(() => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
        if (root.current) observer.observe(root.current);
        return () => {
          container?.removeEventListener("pointerover", enter);
          container?.removeEventListener("pointerout", leave);
          container?.removeEventListener("focusin", enter);
          container?.removeEventListener("focusout", leave);
          observer.disconnect();
          cancelAnimationFrame(frame);
        };
      });
      return () => media.revert();
    },
    { scope: root },
  );
  return <div ref={root}>{children}</div>;
}
