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
      media.add("(prefers-reduced-motion: no-preference)", () => {
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
        let frame = 0;
        const observer = new ResizeObserver(() => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
        if (root.current) observer.observe(root.current);
        return () => {
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
