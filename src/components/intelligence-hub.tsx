"use client";

import { useEffect, useRef, useState } from "react";
import { CatalogRadar } from "@/components/catalog-radar";
import { ReturnRadar } from "@/components/return-radar";

const sections = [
  {
    id: "catalogo",
    label: "Radar de Catálogo",
    eyebrow: "12 / CATÁLOGOS",
    title: "O que entrou, o que vai sair e o que ainda dá tempo de jogar.",
  },
  {
    id: "voltar",
    label: "Vale a pena voltar?",
    eyebrow: "04 / RETORNO",
    title: "Descubra se aquele jogo merece uma segunda chance.",
  },
  {
    id: "ordem",
    label: "Ordem para jogar",
    eyebrow: "01 / GUIA",
    title: "Entre em grandes franquias sem transformar diversão em dever de casa.",
  },
] as const;

export type IntelligenceSection = (typeof sections)[number]["id"];

function sectionFromHash(): IntelligenceSection {
  const hash = window.location.hash.slice(1);
  return sections.some((section) => section.id === hash)
    ? (hash as IntelligenceSection)
    : "catalogo";
}

export function IntelligenceHub() {
  const [active, setActive] = useState<IntelligenceSection>("catalogo");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const syncHash = () => {
      const next = sectionFromHash();
      setActive(next);
      if (window.location.hash !== `#${next}`) {
        window.history.replaceState(null, "", `#${next}`);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const select = (id: IntelligenceSection, replace = false) => {
    setActive(id);
    window.history[replace ? "replaceState" : "pushState"](null, "", `#${id}`);
  };

  const moveFocus = (index: number) => {
    const bounded = (index + sections.length) % sections.length;
    const next = sections[bounded].id;
    select(next);
    tabRefs.current[bounded]?.focus();
  };

  return (
    <section className="intelligence-hub" aria-label="Ferramentas da Central">
      <div className="intelligence-tabs" role="tablist" aria-label="Escolha uma análise">
        {sections.map((section, index) => (
          <button
            key={section.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`central-tab-${section.id}`}
            className={active === section.id ? "intelligence-tab is-active" : "intelligence-tab"}
            type="button"
            role="tab"
            aria-selected={active === section.id}
            aria-controls={`central-panel-${section.id}`}
            tabIndex={active === section.id ? 0 : -1}
            onClick={() => select(section.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveFocus(index + 1);
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveFocus(index - 1);
              } else if (event.key === "Home") {
                event.preventDefault();
                moveFocus(0);
              } else if (event.key === "End") {
                event.preventDefault();
                moveFocus(sections.length - 1);
              }
            }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {section.label}
          </button>
        ))}
      </div>

      <div className="intelligence-panels">
        {sections.map((section) => (
          <section
            key={section.id}
            id={`central-panel-${section.id}`}
            className="intelligence-panel"
            role="tabpanel"
            aria-labelledby={`central-tab-${section.id}`}
            hidden={active !== section.id}
          >
            <span className="intelligence-panel-eyebrow">{section.eyebrow}</span>
            <h2>{section.title}</h2>
            {section.id === "catalogo" ? (
              <CatalogRadar />
            ) : section.id === "voltar" ? (
              <ReturnRadar />
            ) : (
              <div className="intelligence-placeholder" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
