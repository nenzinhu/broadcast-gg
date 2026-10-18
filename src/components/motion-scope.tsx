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
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  Flip,
  Draggable,
  TextPlugin,
  SplitText,
  CustomEase,
  Observer,
  MotionPathPlugin
);

// Easings premium customizados.
CustomEase.create("bouncyOut", "M0.25,0.1,0.25,1,0.33,1,0.33,1.2,0.67,1,1,1");
CustomEase.create("smoothOut", "M0.4,0,0.2,1");
CustomEase.create("elasticOut", "M0.17,0,0.77,1.06");

export function MotionScope({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      media.add(
        "(prefers-reduced-motion: no-preference)",
        (context) => {
          const container = root.current;
          if (!container) return;

          // ==================================================================
          // 1. ENTRADA DE TÍTULOS COM SPLITTEXT (letras caem com efeito 3D)
          // ==================================================================
          gsap.utils
            .toArray<HTMLElement>("[data-split-title]", container)
            .forEach((el) => {
              const split = new SplitText(el, {
                type: "chars,words",
                charsClass: "split-char",
                wordsClass: "split-word",
              });

              gsap.set(split.chars, {
                opacity: 0,
                y: 60,
                rotationX: -70,
                transformPerspective: 600,
                transformOrigin: "50% 50% -40px",
              });

              gsap.to(split.chars, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.035,
                ease: "bouncyOut",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  once: true,
                },
              });
            });

          // ==================================================================
          // 2. REVEAL DE SEÇÕES AO ROLAR (fade + slide suave)
          // ==================================================================
          gsap.utils
            .toArray<HTMLElement>("[data-reveal]", container)
            .forEach((element) => {
              gsap.from(element, {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "smoothOut",
                scrollTrigger: {
                  trigger: element,
                  start: "top 90%",
                  once: true,
                },
              });
            });

          // ==================================================================
          // 3. CARDS COM ENTRADA ESCALONADA + HOVER 3D LEVE
          // ==================================================================
          gsap.utils
            .toArray<HTMLElement>("[data-card-reveal]", container)
            .forEach((card, index) => {
              gsap.from(card, {
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.06,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  once: true,
                },
              });

              card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                  y: -8,
                  scale: 1.02,
                  boxShadow:
                    "0 20px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(166, 255, 0, 0.15)",
                  duration: 0.35,
                  ease: "smoothOut",
                  overwrite: "auto",
                });
              });
              card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                  y: 0,
                  scale: 1,
                  boxShadow: "none",
                  duration: 0.4,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              });
            });

          // ==================================================================
          // 4. PARALLAX DE SCROLL (profundidade sutil)
          // ==================================================================
          gsap.utils
            .toArray<HTMLElement>("[data-parallax]", container)
            .forEach((el) => {
              const speed = parseFloat(el.dataset.speed || "0.025");
              ScrollTrigger.create({
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
                onUpdate: (self) => {
                  gsap.set(el, {
                    y: self.progress * 80 * speed,
                    opacity: 0.6 + self.progress * 0.4,
                  });
                },
              });
            });

          // ==================================================================
          // 5. EFEITO 3D HOVER EM TÍTULOS (data-3d-text)
          // ==================================================================
          const textElems = gsap.utils.toArray<HTMLElement>(
            "[data-3d-text]",
            container
          );
          textElems.forEach((el) => {
            el.addEventListener("mouseenter", () => {
              gsap.to(el, {
                rotationY: 6,
                rotationX: 3,
                z: 20,
                duration: 0.5,
                ease: "elasticOut",
              });
            });
            el.addEventListener("mouseleave", () => {
              gsap.to(el, {
                rotationY: 0,
                rotationX: 0,
                z: 0,
                duration: 0.6,
                ease: "smoothOut",
              });
            });
          });

          // ==================================================================
          // 6. RADAR DO HERÓI (animações contínuas)
          // ==================================================================
          gsap.to(".radar-sweep", {
            rotation: 360,
            duration: 14,
            repeat: -1,
            ease: "none",
            transformOrigin: "50% 50%",
          });

          gsap.to(".scanner", {
            top: "88%",
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            opacity: 0.35,
          });

          gsap.to(".radar-blip", {
            opacity: 0.4,
            duration: 1.6,
            repeat: -1,
            yoyo: true,
            stagger: 0.4,
            ease: "sine.inOut",
          });

          // Tags do radar flutuando suavemente
          gsap.to(".radar-tag", {
            y: -8,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.3,
          });

          // ==================================================================
          // 7. MOTION PATH: PONTOS FLUTUANDO AO LONGO DE CAMINHOS ORGÂNICOS
          // ==================================================================
          gsap.utils
            .toArray<HTMLElement>("[data-motion-path]", container)
            .forEach((el) => {
              const path = el.dataset.path || "M50,50 Q100,0 150,50 T250,50";
              gsap.to(el, {
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
              });
            });

          // ==================================================================
          // 8. OBSERVER: ANIMAÇÃO DE ENTRADA AO CHEGAR NO TOPO DA PÁGINA
          // ==================================================================
          Observer.create({
            target: window,
            type: "scroll",
            onUp: () => {
              // Subtle shrink effect on scroll up
            },
            onDown: () => {
              // Subtle effect on scroll down
            },
            tolerance: 10,
          });

          // ==================================================================
          // 9. LIMPESA AO DESMONTAR
          // ==================================================================
          return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
          };
        }
      );

      return () => media.revert();
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}
