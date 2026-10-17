# BROADCAST.GG Premium Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar a evolução visual premium e as páginas de exploração, com código validado e enviado ao GitHub.

**Architecture:** Layout App Router compartilhado com RadarProvider persistente; páginas no servidor e filtros/animações em componentes cliente. Catálogo tipado central alimenta cards, páginas individuais e helpers puros de busca/ordenação.

**Tech Stack:** Next.js, TypeScript, CSS, GSAP, @gsap/react, ScrollTrigger, Vitest e Playwright existentes.

**Spec:** `docs/superpowers/specs/2026-10-17-broadcast-premium-design.md`

## Global Constraints
- Fundo quase preto, verde #A6FF00, tipografia forte; preservar título original e slogan.
- Textos de leitura a partir de 14 px e metadados a partir de 11 px; contraste e foco visível.
- Artes locais distintas por jogo, identificadas como conceituais; sem depender de destinos bloqueados.
- Dados demonstrativos; nenhuma alegação de preços reais, autenticação, alertas ou publicação pública.
- Manter armazenamento inválido/bloqueado utilizável, hidratação estável e prefers-reduced-motion.
- Usar checkout cloud existente; execução nativa preservada; push sem force, sem sobrescrever mudanças remotas.

## Review Focus
- Navegar entre rotas e voltar: favoritos preservados e navegação ativa correta.
- Consulta com espaços, caixa e acentos: resultados previsíveis; consulta inexistente permite limpar o filtro.
- Jogo desconhecido: 404 real; não renderizar dados de outro jogo.
- Trocas de rota/filtro com movimento normal: conteúdo não fica invisível por gatilhos antigos.
- Mobile, teclado e armazenamento bloqueado: navegação e favoritos continuam acessíveis.

### Task 1: Navegação compartilhada e páginas de jogos
**Files:** modificar `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/site-header.tsx`, `site-footer.tsx`, `personal-radar.tsx`, `motion-scope.tsx`, `src/lib/catalog.ts`; criar `src/components/route-motion.tsx`, `src/app/radar/page.tsx`, `src/app/games/[slug]/page.tsx`, `src/app/not-found.tsx`, `tests/e2e/navigation.spec.ts`.

**Interfaces:** estender `Game` com `slug: string` e `genres: string[]`; manter IDs atuais para compatibilidade dos favoritos. `getGameBySlug(slug: string): Game | undefined` consulta o catálogo. `RouteMotion({children}: {children: React.ReactNode})` usa pathname como chave do MotionScope, mantendo RadarProvider fora do remount.

- [ ] Escrever cenários de navegador para `/radar`, `/games/cyberpunk-2077`, slug inexistente, logo e navegação mobile. Confirmar falhas pelas rotas/controles ausentes antes de implementar.
- [ ] Mover shell, skip-link, header, footer e RadarProvider para layout; manter um único main por rota; atualizar links para rotas/âncoras válidas.
- [ ] Implementar header cliente com link ativo, menu mobile com aria-expanded, Escape e fechamento ao navegar.
- [ ] Adicionar slugs/genres ao catálogo, helper de consulta e página de jogo com metadata, arte, descrição, dados demonstrativos, recomendação e TrackButton. Usar notFound para slug desconhecido.
- [ ] Implementar `/radar` reutilizando PersonalRadar; validar favoritos entre páginas e após reload, incluindo localStorage bloqueado.
- [ ] Recriar apenas o escopo de animação por pathname; preservar cleanup de ResizeObserver/GSAP.
- [ ] Executar testes existentes e novos, lint/build; confirmar 404 HTTP e ausência de erros de hidratação. Commit: `feat: add shared navigation and game pages`.

### Task 2: Signals, Deals e Discover funcionais
**Files:** criar `src/lib/catalog-query.ts`, `src/components/catalog-browser.tsx`, `src/components/signal-browser.tsx`, `src/components/empty-state.tsx`, `src/app/signals/page.tsx`, `src/app/deals/page.tsx`, `src/app/discover/page.tsx`, `tests/catalog-query.test.ts`, `tests/e2e/exploration.spec.ts`; modificar `game-card.tsx`, `live-signals.tsx`, `discover.tsx`, `price-radar.tsx` para links de aprofundamento.

**Interfaces:** `queryGames(items: Game[], options: {query: string; genre: string; sort: 'featured' | 'price-asc' | 'discount-desc'}): Game[]`; gênero vazio aceita todos; busca normaliza caixa, espaços externos e acentos; featured preserva ordem; ordenação não modifica entrada. `querySignals(items: Signal[], catalog: Game[], options: {query: string; type: 'all' | Signal['type']}): Signal[]` busca por título do jogo associado.

- [ ] Escrever testes para consulta vazia, espaços/caixa/acentos, gênero, busca sem resultados, ordenação crescente/por desconto e entrada imutável; confirmar RED antes dos helpers.
- [ ] Implementar helpers e confirmar suite unitária GREEN.
- [ ] Criar páginas com título/introdução, busca rotulada, filtros e resultados. Signals combina busca/tipo; Deals combina busca/ordenação; Discover combina busca/gênero.
- [ ] Implementar EmptyState com ação de limpar filtros; cards linkam jogos e mantêm acompanhamento independente do link.
- [ ] Escrever/executar cenários de filtros combinados, estado vazio real, limpar filtros, ordenação, navegação ao jogo e favoritos compartilhados.
- [ ] Executar suite, lint/build; commit: `feat: add signals deals and discover exploration`.

### Task 3: Refinamento visual, artes e movimento
**Files:** modificar `src/app/globals.css`, `src/components/hero.tsx`, `section-heading.tsx`, `game-card.tsx`, `discover.tsx`, `decision-engine.tsx`, `motion-scope.tsx`, `public/art/*.svg`; criar `src/components/featured-game.tsx`; ampliar `tests/e2e/home.spec.ts`.

**Interfaces:** `FeaturedGame({game}: {game: Game})` exibe destaque editorial com link para `/games/${game.slug}`. Classes/tokens compartilhados governam cards, filtros, preços e páginas internas.

- [ ] Registrar capturas de referência atuais para comparar a evolução; adicionar testes para fonte mínima, overflow e imagens carregadas nas larguras 375, 768 e 1440 px.
- [ ] Substituir artes repetidas por composições distintas: cidade/arquitetura, ruínas/árvore dourada, submundo/portais, cavernas orgânicas e exploração espacial. Manter alternativa textual e dimensões definidas.
- [ ] Refinar hero assimétrico com radar e destaque editorial; ajustar contraste, hierarquia, espaçamento e variedade dos grids em todas as rotas.
- [ ] Aplicar mínimos de leitura e metadados da spec, áreas de toque adequadas e menu mobile sem overflow.
- [ ] Manter reveals/stagger curtos, scanner e radar discretos; adicionar feedback de hover/foco sem interferir na navegação ou ocultar informação.
- [ ] Testar navegação repetida e filtros com movimento normal/reduzido, verificando visibilidade das seções; revisar capturas desktop/tablet/mobile. Commit: `feat: refine premium visual experience`.

### Task 4: Revisão, documentação e envio
**Files:** atualizar `README.md`, `docs/superpowers/implementation-notes.md` e este plano com evidências.

- [ ] Executar `npm test`, `npm run lint`, `npm run build`, `npm run test:e2e`; corrigir falhas com regressões reproduzíveis, sem desativar verificações.
- [ ] Fazer revisão independente final, corrigir problemas importantes e repetir as verificações afetadas.
- [ ] Documentar rotas, execução e limites dos dados demonstrativos; registrar contagens reais e limitações restantes.
- [ ] Conferir diff e histórico remoto; fazer commits finais e push sem force para main quando fast-forward. Se o remoto avançou, integrar preservando trabalho existente e repetir verificações afetadas.
- [ ] Confirmar SHA remoto com `git ls-remote`; reportar exatamente o que foi enviado, distinguindo GitHub de publicação pública do site.

## Método de execução
Nativo, já escolhido pelo usuário: implementação nesta sessão com uma revisão independente ao final. Após aprovação deste plano, executar todas as tarefas sem pedir confirmação entre etapas.
