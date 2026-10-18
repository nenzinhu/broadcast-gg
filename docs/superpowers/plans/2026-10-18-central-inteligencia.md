# Central de Inteligência Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a página `/central` com Radar de catálogo, Vale a pena voltar e Ordem para jogar, integrada ao catálogo e ao Meu Radar.

**Architecture:** A rota server monta uma experiência client única que controla abas e hash. Cada painel consome um módulo editorial tipado e isolado; referências opcionais a `gameId` reutilizam `Game`, `TrackButton` e as páginas individuais existentes. O `MotionScope` continua responsável pelos reveals gerais, enquanto a troca de abas e o desenho da timeline ficam no hub e no painel de ordem.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, GSAP 3, `@gsap/react`, Vitest e Playwright.

**Spec:** `docs/superpowers/specs/2026-10-18-central-inteligencia-design.md`

## Global Constraints

- Todo conteúdo da primeira versão é editorial e demonstrativo; não adicionar chamadas de rede.
- A rota pública é `/central` e os hashes válidos são `#catalogo`, `#voltar` e `#ordem`.
- O Meu Radar continua sendo a lista pessoal; jogos compatíveis usam o `TrackButton` existente.
- Estados nunca dependem apenas de cor ou movimento.
- `prefers-reduced-motion` deve exibir todo o conteúdo imediatamente.
- Cards editoriais usam texto de pelo menos `14px` e não podem causar overflow em 375px.
- Não adicionar novas dependências.

## Review Focus

- Hash ausente ou desconhecido deve abrir Catálogo sem erro e substituir o hash por `#catalogo`.
- Referência editorial sem `gameId` deve renderizar sem link interno e sem botão vazio.
- Referência com `gameId` inexistente deve falhar nos testes de integridade antes do build.
- Troca de aba deve retirar o painel inativo da navegação por teclado e preservar foco previsível.
- Uma franquia com `startEntryId` inválido deve falhar no teste de dados, não renderizar uma timeline sem início.

---

### Task 1: Modelos e dados editoriais

**Files:**
- Create: `src/lib/catalog-services.ts`
- Create: `src/lib/returning-games.ts`
- Create: `src/lib/franchise-guides.ts`
- Modify: `src/lib/catalog.ts`
- Create: `tests/intelligence-data.test.ts`

**Interfaces:**
- Consumes: `Game` e `games` de `src/lib/catalog.ts`.
- Produces: `getGameById(id: string): Game | undefined`.
- Produces: `catalogMovements: CatalogMovement[]`, `returningGames: ReturningGame[]` e `franchiseGuides: FranchiseGuide[]` com os tipos exportados abaixo.
- Produces: `filterCatalogMovements(movements: CatalogMovement[], service: "all" | CatalogService): CatalogMovement[]` para manter filtro e estado vazio testáveis sem navegador.

- [ ] **Step 1: Escrever testes de integridade que falham**

Criar `tests/intelligence-data.test.ts` com estes casos:

- IDs únicos dentro de cada coleção.
- Todo `gameId` definido resolve por `getGameById`.
- `filterCatalogMovements([], "game-pass")` retorna uma lista vazia e uma coleção mista retorna apenas o serviço solicitado.
- Os serviços são exatamente `game-pass`, `playstation-plus` e `ea-play`.
- Os estados são exatamente `entrou`, `saindo` e `disponivel`.
- Os vereditos são exatamente `volte-agora` e `espere-mais`.
- Cada franquia tem pelo menos duas entradas e exatamente uma entrada cujo `id` corresponde a `startEntryId`.
- As quatro franquias são `resident-evil`, `god-of-war`, `grand-theft-auto` e `the-witcher`.

- [ ] **Step 2: Executar o teste e confirmar a falha**

Run: `npm test -- tests/intelligence-data.test.ts`  
Expected: FAIL porque os módulos e `getGameById` ainda não existem.

- [ ] **Step 3: Implementar os tipos e `getGameById`**

Em `src/lib/catalog.ts`, exportar:

```ts
export const getGameById = (id: string): Game | undefined;
```

Em `src/lib/catalog-services.ts`, exportar:

```ts
export type CatalogService = "game-pass" | "playstation-plus" | "ea-play";
export type CatalogStatus = "entrou" | "saindo" | "disponivel";
export type CatalogMovement = {
  id: string;
  title: string;
  service: CatalogService;
  status: CatalogStatus;
  platforms: string;
  date: string;
  summary: string;
  gameId?: string;
};
export const catalogMovements: CatalogMovement[];
export function filterCatalogMovements(
  movements: CatalogMovement[],
  service: "all" | CatalogService,
): CatalogMovement[];
```

Usar nove registros: Forza Horizon 5, Clair Obscur e Starfield no Game Pass; God of War, Resident Evil 4 e GTA V no PlayStation Plus; It Takes Two, Star Wars Jedi: Survivor e EA Sports FC 26 no EA Play. Distribuir ao menos um `entrou`, um `saindo` e um `disponivel` em cada serviço. Somente títulos presentes em `games` recebem `gameId`. Datas devem terminar com `· cenário demonstrativo`.

Em `src/lib/returning-games.ts`, exportar:

```ts
export type ReturnVerdict = "volte-agora" | "espere-mais";
export type ReturningGame = {
  id: string;
  gameId: string;
  changed: string;
  mattersTo: string;
  milestone: string;
  verdict: ReturnVerdict;
};
export const returningGames: ReturningGame[];
```

Usar Cyberpunk 2077, Starfield, Helldivers 2, Forza Horizon 5, Monster Hunter Wilds e Stardew Valley. Starfield recebe `espere-mais`; os outros recebem `volte-agora`. O texto não deve alegar monitoramento em tempo real.

Em `src/lib/franchise-guides.ts`, exportar:

```ts
export type PlayOrderClassification = "essencial" | "opcional";
export type PlayOrderEntry = {
  id: string;
  title: string;
  classification: PlayOrderClassification;
  note: string;
  gameId?: string;
};
export type FranchiseGuide = {
  id: "resident-evil" | "god-of-war" | "grand-theft-auto" | "the-witcher";
  name: string;
  continuity: string;
  startEntryId: string;
  entries: PlayOrderEntry[];
};
export const franchiseGuides: FranchiseGuide[];
```

Entradas iniciais:

- Resident Evil: RE1 (`startEntryId`), RE2, RE3 opcional, RE4, RE7 e Village.
- God of War: God of War 2005 opcional, II opcional, III opcional, God of War 2018 (`startEntryId`) e Ragnarök.
- Grand Theft Auto: GTA III opcional, Vice City opcional, San Andreas, GTA IV, GTA V (`startEntryId`) e GTA VI opcional.
- The Witcher: The Witcher opcional, The Witcher 2 opcional e The Witcher 3 (`startEntryId`).

Associar `gameId` somente quando houver correspondência no catálogo atual.

- [ ] **Step 4: Executar testes de dados**

Run: `npm test -- tests/intelligence-data.test.ts`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/catalog.ts src/lib/catalog-services.ts src/lib/returning-games.ts src/lib/franchise-guides.ts tests/intelligence-data.test.ts
git commit -m "feat: add central intelligence data"
```

### Task 2: Rota, navegação e shell de abas

**Files:**
- Create: `src/app/central/page.tsx`
- Create: `src/components/intelligence-hub.tsx`
- Create: `src/components/intelligence-summary.tsx`
- Modify: `src/components/site-header.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/color-system.css`
- Create: `tests/e2e/central.spec.ts`

**Interfaces:**
- Consumes: contagens das três coleções da Task 1.
- Produces: `IntelligenceHub(): JSX.Element` e `IntelligenceSummary(): JSX.Element`.
- Produces: slots internos para os painéis com IDs `central-panel-catalogo`, `central-panel-voltar` e `central-panel-ordem`.

- [ ] **Step 1: Escrever o teste E2E de rota, hash e teclado**

Em `tests/e2e/central.spec.ts`, testar:

- `/central` responde 200, mostra `Central` na navegação e abre a aba `Catálogo`.
- `/central#voltar` abre `Vale voltar`; `/central#ordem` abre `Ordem para jogar`.
- `/central#desconhecida` abre Catálogo e termina com `#catalogo`.
- ArrowRight, ArrowLeft, Home e End movem foco e selecionam a aba esperada.
- Apenas o painel ativo está visível e o conteúdo inativo não recebe foco.

- [ ] **Step 2: Executar o teste e confirmar a falha**

Run: `npm run test:e2e -- tests/e2e/central.spec.ts`  
Expected: FAIL com 404 em `/central`.

- [ ] **Step 3: Criar página e metadata**

`src/app/central/page.tsx` deve exportar metadata com título `Central` e descrição sobre catálogo, atualizações e franquias. Renderizar `PageIntro` com eyebrow `CENTRAL DE INTELIGÊNCIA / RADAR ATIVO`, título `Tudo o que merece` e accent `voltar ao seu radar.`, seguido de `IntelligenceHub`.

- [ ] **Step 4: Implementar `IntelligenceSummary`**

Exibir três métricas derivadas: movimentos de catálogo, jogos avaliados para retorno e franquias mapeadas. Incluir scanner decorativo com `aria-hidden="true"` e o rótulo `CURADORIA DEMONSTRATIVA`.

- [ ] **Step 5: Implementar `IntelligenceHub`**

Componente client com:

```ts
type CentralTab = "catalogo" | "voltar" | "ordem";
```

Ler `window.location.hash` após montar, normalizar para `catalogo` quando inválido e usar `history.replaceState` para atualizar o hash. Implementar ARIA de tabs, `aria-controls`, `aria-labelledby`, roving `tabIndex` e teclas ArrowLeft, ArrowRight, Home e End. Na primeira versão, cada painel pode conter um heading e um marcador estático; os painéis reais entram nas Tasks 3–5.

- [ ] **Step 6: Adicionar navegação e estilos estruturais**

Adicionar `[/central, Central]` antes de Radar em `site-header.tsx`. Estilizar summary, tablist, foco, painéis e breakpoints. Em 375px, a tablist deve rolar dentro do próprio elemento sem aumentar `documentElement.scrollWidth`.

- [ ] **Step 7: Executar teste da Central**

Run: `npm run build`  
Expected: build concluído com a rota `/central`.

Run: `npm run test:e2e -- tests/e2e/central.spec.ts`  
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/app/central/page.tsx src/components/intelligence-hub.tsx src/components/intelligence-summary.tsx src/components/site-header.tsx src/app/globals.css src/app/color-system.css tests/e2e/central.spec.ts
git commit -m "feat: add central intelligence shell"
```

### Task 3: Radar de catálogo

**Files:**
- Create: `src/components/catalog-radar.tsx`
- Modify: `src/components/intelligence-hub.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/color-system.css`
- Modify: `tests/e2e/central.spec.ts`

**Interfaces:**
- Consumes: `catalogMovements`, `getGameById`, `TrackButton` e `CatalogService`.
- Produces: `CatalogRadar(): JSX.Element`.

- [ ] **Step 1: Acrescentar testes que falham para filtros e referências opcionais**

Testar na aba Catálogo:

- nove cards aparecem em `Todos`;
- filtro `Game Pass` mostra três cards;
- filtro `PlayStation Plus` mostra três cards;
- filtro `EA Play` mostra três cards;
- um jogo interno possui link para `/games/<slug>` e botão `TRACKING`;
- EA Sports FC 26, sem `gameId`, não possui link interno nem botão vazio;
- a função testada na Task 1 mantém o resultado vazio seguro; o componente renderiza `Nenhum movimento detectado` e a ação `Limpar filtro` sempre que receber esse resultado.

- [ ] **Step 2: Executar testes filtrados e confirmar a falha**

Run: `npm run test:e2e -- tests/e2e/central.spec.ts --grep "catálogo"`  
Expected: FAIL porque os cards e filtros não existem.

- [ ] **Step 3: Implementar `CatalogRadar`**

Componente client com estado `"all" | CatalogService`. Renderizar botões de filtro, resumo de resultados e cards. Mapear rótulos:

- `entrou` → `ENTROU`
- `saindo` → `SAINDO`
- `disponivel` → `DISPONÍVEL`

Resolver `gameId` com `getGameById`. Somente o resultado válido recebe `Link` e `TrackButton`. Cada card usa `data-reveal` e `interactive-card`.

- [ ] **Step 4: Integrar e estilizar**

Substituir o marcador da aba Catálogo por `CatalogRadar`. Criar cores próprias para os três serviços e um tratamento textual/visual de atenção para `SAINDO`. Adicionar estado vazio reutilizando `EmptyState` ou um bloco equivalente com botão real.

- [ ] **Step 5: Executar testes da aba**

Run: `npm run test:e2e -- tests/e2e/central.spec.ts --grep "catálogo"`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/catalog-radar.tsx src/components/intelligence-hub.tsx src/app/globals.css src/app/color-system.css tests/e2e/central.spec.ts
git commit -m "feat: add subscription catalog radar"
```

### Task 4: Vale a pena voltar

**Files:**
- Create: `src/components/return-radar.tsx`
- Modify: `src/components/intelligence-hub.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/color-system.css`
- Modify: `tests/e2e/central.spec.ts`

**Interfaces:**
- Consumes: `returningGames`, `getGameById`, `GameArtwork` e `TrackButton`.
- Produces: `ReturnRadar(): JSX.Element`.

- [ ] **Step 1: Acrescentar testes que falham para o painel de retorno**

Testar:

- seis cards aparecem em `#voltar`;
- Cyberpunk contém `O QUE MUDOU`, `PARA QUEM IMPORTA` e `VOLTE AGORA`;
- Starfield exibe `ESPERE MAIS`;
- um card interno abre a página do jogo;
- adicionar Cyberpunk ao radar atualiza o estado do botão e permanece salvo ao navegar para `/radar`.

- [ ] **Step 2: Executar os testes e confirmar a falha**

Run: `npm run test:e2e -- tests/e2e/central.spec.ts --grep "voltar"`  
Expected: FAIL porque `ReturnRadar` não existe.

- [ ] **Step 3: Implementar `ReturnRadar`**

Renderizar seis artigos com arte, milestone, `changed`, `mattersTo`, veredito, link interno e `TrackButton`. Mapear `volte-agora` para `VOLTE AGORA` e `espere-mais` para `ESPERE MAIS`. A descrição do veredito deve permanecer visível; não usar tooltip como única fonte.

- [ ] **Step 4: Integrar e estilizar**

Substituir o marcador da aba Voltar. Usar cor verde/ciano para `VOLTE AGORA` e âmbar para `ESPERE MAIS`, sempre acompanhadas pelos textos. Cards usam `data-reveal` e `interactive-card`.

- [ ] **Step 5: Executar testes do painel**

Run: `npm run test:e2e -- tests/e2e/central.spec.ts --grep "voltar"`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/return-radar.tsx src/components/intelligence-hub.tsx src/app/globals.css src/app/color-system.css tests/e2e/central.spec.ts
git commit -m "feat: add returning games radar"
```

### Task 5: Ordem para jogar

**Files:**
- Create: `src/components/play-order.tsx`
- Modify: `src/components/intelligence-hub.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/color-system.css`
- Modify: `tests/e2e/central.spec.ts`

**Interfaces:**
- Consumes: `franchiseGuides`, `FranchiseGuide`, `getGameById` e `TrackButton`.
- Produces: `PlayOrder(): JSX.Element`.

- [ ] **Step 1: Acrescentar testes que falham para franquias e timeline**

Testar:

- quatro botões de franquia aparecem em `#ordem`;
- Resident Evil é a seleção inicial e destaca RE1 com `COMECE AQUI`;
- selecionar God of War mostra God of War 2018 como `COMECE AQUI`;
- selecionar GTA mostra GTA V como `COMECE AQUI`;
- selecionar The Witcher mostra The Witcher 3 como `COMECE AQUI`;
- entradas com jogo interno possuem link e `TRACKING`; entradas externas não possuem controles vazios.

- [ ] **Step 2: Executar testes e confirmar a falha**

Run: `npm run test:e2e -- tests/e2e/central.spec.ts --grep "ordem"`  
Expected: FAIL porque a timeline não existe.

- [ ] **Step 3: Implementar `PlayOrder`**

Componente client com `selectedId: FranchiseGuide["id"]`. Renderizar seletor, continuidade, timeline e entradas. Exibir `ESSENCIAL` ou `OPCIONAL`; quando `entry.id === startEntryId`, exibir também `COMECE AQUI`. Resolver controles internos somente quando `gameId` for válido.

- [ ] **Step 4: Adicionar animação da timeline**

Usar `useGSAP` com escopo local e `gsap.matchMedia()`. Em movimento normal, animar a escala vertical de `.play-order-line` e o stagger dos itens após troca de franquia. Em movimento reduzido, não aplicar estado inicial oculto. Reverter o contexto no cleanup.

- [ ] **Step 5: Integrar e estilizar**

Substituir o marcador da aba Ordem. No desktop, usar seletor acima e timeline em duas zonas; abaixo de 700px, uma coluna. A linha é decorativa e recebe `aria-hidden="true"`.

- [ ] **Step 6: Executar testes da timeline**

Run: `npm run test:e2e -- tests/e2e/central.spec.ts --grep "ordem"`  
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/play-order.tsx src/components/intelligence-hub.tsx src/app/globals.css src/app/color-system.css tests/e2e/central.spec.ts
git commit -m "feat: add franchise play order"
```

### Task 6: Movimento, responsividade e verificação integrada

**Files:**
- Modify: `src/components/intelligence-hub.tsx`
- Modify: `src/components/intelligence-summary.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/color-system.css`
- Modify: `tests/e2e/central.spec.ts`
- Modify: `tests/e2e/premium.spec.ts`

**Interfaces:**
- Consumes: os três painéis completos das Tasks 3–5.
- Produces: experiência integrada pronta para publicação.

- [ ] **Step 1: Acrescentar testes que falham para movimento e layouts**

Testar:

- em 375, 768 e 1440px, `documentElement.scrollWidth <= innerWidth`;
- cards ativos têm `opacity: 1` após a troca de aba;
- com movimento reduzido, todos os cards do painel ativo ficam visíveis sem aguardar animação;
- alternar as três abas repetidamente não gera `pageerror`;
- o scanner é `aria-hidden`, não recebe foco e sua transformação muda com movimento normal, permanecendo estável com movimento reduzido.

- [ ] **Step 2: Executar os testes e confirmar a falha**

Run: `npm run test:e2e -- tests/e2e/central.spec.ts tests/e2e/premium.spec.ts`  
Expected: FAIL na asserção de movimento do scanner antes do polimento final.

- [ ] **Step 3: Implementar transições do hub e scanner**

No `IntelligenceHub`, usar `useGSAP` com escopo local para animar saída curta do painel anterior e entrada com stagger do painel ativo. Cancelar animações anteriores com `overwrite: "auto"`. No `IntelligenceSummary`, animar a linha de scanner com loop lento somente em movimento normal.

- [ ] **Step 4: Finalizar breakpoints e estados de foco**

Corrigir grids em 1200, 900, 700 e 380px. Garantir tablist contida, textos de card com no mínimo 14px, foco visível e painéis inativos com `hidden`.

- [ ] **Step 5: Executar verificação completa**

Run: `npm run lint`  
Expected: 0 erros e 0 avisos.

Run: `npm test`  
Expected: todos os arquivos e testes passam.

Run: `npm run build`  
Expected: build concluído e rota `/central` listada.

Run: `npm run test:e2e`  
Expected: todos os testes passam, incluindo a suíte da Central.

- [ ] **Step 6: Fazer inspeção visual**

Capturar `/central#catalogo` em 1440×1000 e `/central#ordem` em 375×812, com movimento normal e reduzido. Confirmar leitura, ausência de overflow, estados textuais, fallback e progressão da timeline.

- [ ] **Step 7: Commit final**

```bash
git add src/components/intelligence-hub.tsx src/components/intelligence-summary.tsx src/app/globals.css src/app/color-system.css tests/e2e/central.spec.ts tests/e2e/premium.spec.ts
git commit -m "feat: polish central intelligence experience"
```

- [ ] **Step 8: Publicar e verificar**

Antes do push, executar `git ls-remote origin refs/heads/main` e confirmar que o commit remoto continua sendo ancestral do trabalho local. Enviar para `main` somente após todas as verificações. Confirmar HTTP 200 em `/central`, os três hashes e a presença dos três títulos no HTML publicado pela Vercel.
