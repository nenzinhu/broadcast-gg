"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export interface Tab {
  id: string;
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
}

/**
 * Abas acessíveis e animadas com GSAP.
 * - Tinta (underline) desliza entre abas com expo.inOut.
 * - Painel ativo entra com fade + slide, filhos sobem escalonados (stagger).
 * - Brilho pulsante leve na aba ativa.
 * - Respeita prefers-reduced-motion.
 */
export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  const [activeId, setActiveId] = useState(
    () => defaultValue || tabs[0]?.id || ""
  );
  const tabRefs = useRef<Map<string, HTMLElement>>(new Map());
  const panelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const inkRef = useRef<HTMLSpanElement>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Alinha a tinta sob a aba ativa.
  useGSAP(() => {
    const tab = tabRefs.current.get(activeId);
    if (!inkRef.current || !tab) return;
    gsap.set(inkRef.current, { x: tab.offsetLeft, width: tab.offsetWidth });
  }, [activeId]);

  // Anima a troca de aba: tinta + entrada do painel e seus filhos.
  useGSAP(() => {
    if (prefersReduced) return undefined;
    const tab = tabRefs.current.get(activeId);
    const panel = panelRefs.current.get(activeId);
    if (!tab || !panel || !inkRef.current) return undefined;

    const tl = gsap.timeline();

    tl.to(inkRef.current, {
      x: tab.offsetLeft,
      width: tab.offsetWidth,
      duration: 0.55,
      ease: "expo.inOut",
    }, 0);

    tl.fromTo(
      panel,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "<0.1"
    );

    const children = Array.from(
      panel.querySelectorAll<HTMLElement>("[data-tab-child]")
    );
    if (children.length) {
      tl.fromTo(
        children,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "opacity,y",
        },
        "<0.05"
      );
    }

    return () => tl.kill();
  }, [activeId, prefersReduced]);

  // Brilho suave pulsante na aba ativa.
  useGSAP(() => {
    if (prefersReduced) return undefined;
    const tab = tabRefs.current.get(activeId);
    const glow = tab?.querySelector<HTMLElement>("[data-tab-glow]");
    if (!glow) return undefined;
    const tween = gsap.to(glow, {
      opacity: 0.35,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => tween.kill();
  }, [activeId, prefersReduced]);

  // Acompanha o redimensionamento da janela.
  useEffect(() => {
    const onResize = () => {
      const tab = tabRefs.current.get(activeId);
      if (tab && inkRef.current) {
        gsap.set(inkRef.current, {
          x: tab.offsetLeft,
          width: tab.offsetWidth,
        });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, id: string) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveId(id);
      }
    },
    []
  );

  if (!tabs.length) return null;

  return (
    <section className={`tabs ${className || ""}`}>
      <div
        className="tabs-list"
        role="tablist"
        aria-label="Navegação por abas"
      >
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
                return () => {
                  tabRefs.current.delete(tab.id);
                };
              }}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`tab-panel-${tab.id}`}
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, tab.id)}
              className={`tab ${active ? "tab-active" : ""}`}
            >
              {tab.label}
              <span data-tab-glow className="tab-glow" aria-hidden="true" />
            </button>
          );
        })}
        <span ref={inkRef} className="tabs-ink" aria-hidden="true" />
      </div>

      <div className="tabs-panels">
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <div
              key={tab.id}
              ref={(el) => {
                if (el) panelRefs.current.set(tab.id, el);
                return () => {
                  panelRefs.current.delete(tab.id);
                };
              }}
              role="tabpanel"
              aria-labelledby={`tab-btn-${tab.id}`}
              id={`tab-panel-${tab.id}`}
              tabIndex={active ? 0 : -1}
              style={{
                display: active ? "block" : "none",
                opacity: active ? 0 : 1,
              }}
              className="tab-panel"
            >
              <div className="tab-content" data-tab-child>
                {tab.children}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
