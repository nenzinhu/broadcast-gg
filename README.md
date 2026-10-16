# BROADCAST.GG

O que mudou. O que importa. O que jogar.

Homepage gamer em Next.js App Router, TypeScript e GSAP. Inclui Live Signals com filtros, Price Radar, Decision Engine BUY/WAIT/SKIP, radar pessoal persistido no navegador e Discover com detalhes acessíveis.

## Desenvolvimento

Requer Node.js 22.13+ (validado com 24) e npm.

```sh
npm ci
npm run dev
```

Neste ambiente cloud, se o cache padrão não for gravável, use `npm ci --cache /tmp/broadcast-npm-cache`.

```sh
npm test
npm run lint
npm run build
npm run start
```

`npm run test:e2e` usa Playwright e inicia o build de produção automaticamente. Execute `npm run build` antes. O Chromium local é usado quando disponível; em outras máquinas, instale com `npx playwright install chromium`. Pode-se informar `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` para outro caminho.

## Organização

- `src/app`: documento, composição e estilos responsivos.
- `src/components`: seções, interações, animações e elementos compartilhados.
- `src/lib`: catálogo tipado, regras de recomendação e persistência segura.
- `public/art`: artes vetoriais conceituais originais, sem dependências externas.
- `tests`: regras de domínio e cenários no navegador.

## Limites desta entrega

Preços, avaliações, horários e sinais são **demonstrativos**; não há integrações com lojas ou atualização em tempo real. As artes não são materiais oficiais dos jogos. BUY/WAIT/SKIP são resultados de regras transparentes sobre dados de exemplo: avaliação abaixo de 70 → SKIP; demais jogos no menor preço histórico do cenário ou abaixo → BUY; demais → WAIT.

Favoritos usam `localStorage` apenas neste navegador; se o armazenamento for bloqueado, continuam funcionando na sessão. Não há autenticação, notificações ou sincronização com servidor. As seções são navegáveis na homepage; páginas dedicadas e integrações reais ficam para outra entrega.

As animações respeitam `prefers-reduced-motion`; diálogos suportam teclado, Escape e retorno de foco. A aplicação não depende de fontes ou imagens externas.
