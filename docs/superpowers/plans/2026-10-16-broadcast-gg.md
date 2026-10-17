# BROADCAST.GG Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Entregar a homepage responsiva do BROADCAST.GG com sinais demonstrativos, recomendações e radar pessoal funcional.

**Architecture:** App Router com layout e página no servidor, componentes cliente isolados para estado e GSAP. Dados tipados compartilhados entre seções; radar persistido localmente, sem backend.

**Tech Stack:** Next.js, React, TypeScript, CSS, GSAP, @gsap/react, ScrollTrigger, ESLint e testes com Vitest; Playwright para validação de navegador se disponível.

**Spec:** `docs/superpowers/specs/2026-10-16-broadcast-gg-design.md`

## Global Constraints
- Fundo quase preto; verde signal #A6FF00; identidade sofisticada e minimalista, sem excesso de glitch ou neon.
- Preservar o título e subtexto exatos da spec e o slogan “O que mudou. O que importa. O que jogar.”
- Homepage nesta entrega; navegação por seções reais. Páginas dedicadas ficam para próxima entrega.
- Preços em BRL e sinais/recomendações explicitamente demonstrativos.
- Respeitar prefers-reduced-motion, teclado, foco e layout mobile.
- Usar o checkout isolado existente; não criar worktree.

## Review Focus
- localStorage inválido ou bloqueado: radar continua utilizável em memória.
- Primeiro carregamento e recarga: sem divergência de hidratação ou perda prematura de favoritos.
- Filtros sem resultados: mensagem explícita, controles permanecem disponíveis.
- Diálogo via teclado: Escape fecha e foco retorna ao acionador.
- Movimento reduzido e viewport de 375 px: conteúdo visível e sem overflow horizontal.

## Estrutura de arquivos
- `package.json`, `package-lock.json`, `tsconfig.json`, `next-env.d.ts`, `eslint.config.mjs`, `.gitignore`: base e comandos reproduzíveis.
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`: documento pt-BR, composição da homepage, tokens e responsividade.
- `src/lib/catalog.ts`: tipos Game, Signal e catálogo demonstrativo centralizado.
- `src/lib/decision.ts`, `src/lib/radar-storage.ts`: recomendação e leitura segura da persistência.
- `src/components/site-header.tsx`, `site-footer.tsx`, `section-heading.tsx`, `game-card.tsx`: elementos compartilhados.
- `src/components/hero.tsx`, `live-signals.tsx`, `price-radar.tsx`, `decision-engine.tsx`, `personal-radar.tsx`, `discover.tsx`: seções.
- `src/components/radar-provider.tsx`, `game-dialog.tsx`, `motion-scope.tsx`: estado compartilhado, detalhes acessíveis e animações.
- `tests/decision.test.ts`, `tests/radar-storage.test.ts`: testes da lógica.
- `README.md`: execução, verificações e limites dos dados demonstrativos.

### Task 1: Base executável e homepage visual
**Interfaces:** `Game = { id: string; title: string; genre: string; price: number; originalPrice: number; historicalLow: number; score: number; description: string }`; `Signal = { id: string; gameId: string; type: 'price' | 'update' | 'trend'; title: string; description: string }`. Exportar `games: Game[]` e `signals: Signal[]` de `catalog.ts`.

- [x] Criar configuração Next.js/TypeScript/ESLint e scripts `dev`, `build`, `start`, `lint` e `test`; instalar versões estáveis compatíveis e gerar lockfile.
- [x] Criar catálogo demonstrativo com jogos que exercitem BUY, WAIT e SKIP; nenhum preço deve ser apresentado como cotação real.
- [x] Implementar layout pt-BR, header, footer, hero e primitivas de cards/títulos; construir todas as seções da homepage, com âncoras válidas.
- [x] Aplicar tokens visuais, radar abstrato e layouts desktop/mobile; imagens devem ter dimensões e alternativa visual.
- [x] Executar `npm run lint` e `npm run build`; corrigir erros antes da próxima etapa.

### Task 2: Filtros, decisão, radar e detalhes
**Interfaces:** `getDecision(game: Game): { verdict: 'BUY' | 'WAIT' | 'SKIP'; reason: string }`. Score abaixo de 70 resulta SKIP; demais jogos no menor preço histórico ou abaixo resultam BUY; demais WAIT. `parseTrackedIds(raw: string | null, validIds: string[]): string[]` filtra IDs desconhecidos/duplicados e retorna lista vazia para JSON inválido. `useRadar(): { trackedIds: string[]; toggle: (id: string) => void; storageAvailable: boolean }` compartilha favoritos.

- [x] Escrever testes: score 69 resulta SKIP mesmo com desconto; score 70 e preço igual ao histórico resulta BUY; preço acima resulta WAIT. Rodar e confirmar falha antes da implementação.
- [x] Implementar `getDecision` e executar os testes até passarem; conectar seletor de jogo, recomendação e justificativa na seção Decision Engine.
- [x] Escrever testes de `parseTrackedIds` para null, JSON inválido, objeto em vez de array, IDs desconhecidos, duplicados e lista válida. Confirmar falha, implementar e confirmar aprovação.
- [x] Implementar provider com hidratação estável e persistência após leitura inicial; capturar falhas de leitura/escrita e informar quando favoritos só duram na sessão.
- [x] Conectar adicionar/remover nos cards e radar pessoal, com estado vazio; implementar filtros por tipo e mensagem para zero resultados.
- [x] Implementar detalhes com elemento dialog, nome acessível, botão fechar, Escape e retorno de foco; ligar aos cards Discover.
- [x] Verificar no navegador, se disponível: filtros, seletor BUY/WAIT/SKIP, adicionar/remover, persistência após recarga, armazenamento inválido/bloqueado e diálogo por teclado. Registrar limitações se navegador indisponível.

### Task 3: GSAP e validação de entrega
**Interfaces:** `MotionScope({ children }: { children: React.ReactNode })` delimita seletores e cleanup com useGSAP. Marcar elementos animáveis com atributos data; não esconder conteúdo permanentemente antes da inicialização.

- [x] Registrar GSAP, useGSAP e ScrollTrigger; implementar reveal de texto, scanner horizontal, radar, stagger, reveals por scroll e hover discreto nos cards.
- [x] Usar matchMedia para movimento reduzido, contexto para limpeza e animações limitadas ao escopo; conteúdo continua visível com animações desativadas.
- [x] Validar desktop e 375 px, foco visível, ausência de overflow, redução de movimento e ausência de erros de console, usando navegador se disponível.
- [x] Executar `npm run test`, `npm run lint` e `npm run build`; corrigir problemas e repetir apenas verificações afetadas.
- [x] Iniciar com `npm run start` e verificar resposta HTTP e conteúdo esperado; não confundir isso com validação das interações.
- [x] Documentar instalação/execução e limites em README; revisar diff e reportar verificações executadas e eventuais limitações.

## Execução recomendada
Execução nativa nesta sessão: as três etapas compartilham catálogo, composição e linguagem visual, então manter a implementação no mesmo contexto reduz retrabalho. Revisão final independente conforme a skill de execução escolhida.
