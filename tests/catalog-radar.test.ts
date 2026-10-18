import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CatalogRadar } from "../src/components/catalog-radar";

describe("CatalogRadar", () => {
  it("oferece limpar filtro quando o conjunto visível está vazio", () => {
    const markup = renderToStaticMarkup(
      createElement(CatalogRadar, { movements: [] }),
    );

    expect(markup).toContain("Nenhum movimento detectado");
    expect(markup).toContain("Limpar filtro");
  });
});
