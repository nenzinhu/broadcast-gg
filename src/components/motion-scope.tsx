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
            gsap.fromTo(
              element,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 94%",
                  once: true,
                },
              },
            );
          });

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
            rotationX: active ? undefined : 0,
            rotationY: active ? undefined : 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const moveCard = (event: Event) => {
          if (!(event instanceof PointerEvent)) return;
          if (!(event.target instanceof Element)) return;
          const card = event.target.closest<HTMLElement>(".interactive-card");
          if (!card || !container?.contains(card)) return;
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          gsap.to(card, {
            rotationY: (x - 0.5) * 3.5,
            rotationX: (0.5 - y) * 3,
            transformPerspective: 900,
            duration: 0.35,
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
        const move = context.add("cardMove", moveCard) as EventListener;
        container?.addEventListener("pointerover", enter);
        container?.addEventListener("pointermove", move);
        container?.addEventListener("pointerout", leave);
        container?.addEventListener("focusin", enter);
        container?.addEventListener("focusout", leave);

        let frame = 0;
        const observer = new ResizeObserver(() => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
        if (container) observer.observe(container);

        return () => {
          container?.removeEventListener("pointerover", enter);
          container?.removeEventListener("pointermove", move);
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
