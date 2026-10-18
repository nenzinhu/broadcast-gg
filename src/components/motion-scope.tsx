"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";
gsap.registerPlugin(ScrollTrigger, Flip, Draggable, TextPlugin, SplitText, CustomEase, Observer);
// Register a premium-ish custom ease for bouncy-out transitions used across the app.
CustomEase.create("bouncyOut", "M0.25,0.1,0.25,1,0.33,1,0.33,1.2,0.67,1,1,1");
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
        // Parallax scrub effects on scroll - subtle depth
        gsap.utils.toArray<HTMLElement>("[data-parallax]", root.current).forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.02");
          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              gsap.set(el, {
                y: self.progress * 100 * speed,
                opacity: 0.7 + self.progress * 0.3,
              });
            },
          });
        });
        // 3D text hover effect with subtle rotation and TextPlugin scramble
        const textElems = gsap.utils.toArray<HTMLElement>("[data-3d-text]", root.current);
        textElems.forEach((el) => {
          el.addEventListener("mouseenter", () => {
            gsap.to(el, {
              rotationY: 5,
              rotationX: 2,
              z: 15,
              duration: 0.4,
              ease: "bouncyOut",
            });
          });
          el.addEventListener("mouseleave", () => {
            gsap.to(el, {
              rotationY: 0,
              rotationX: 0,
              z: 0,
              duration: 0.5,
              ease: "power2.inOut",
            });
          });
        });
        // Fade-in from bottom on scroll (already exists as data-reveal)
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
