# BROADCAST.GG

O que mudou. O que importa. O que jogar.

Experiência gamer em Next.js App Router, TypeScript e GSAP. A homepage reúne Live Signals, Price Radar, Decision Engine, radar pessoal e Discover; páginas dedicadas aprofundam cada seção.

## Rotas

- `/`: homepage com seções, filtros e radar pessoal.
- `/signals`: feed completo com filtros por tipo e busca por jogo (com estado vazio real).
- `/deals`: catálogo com busca e ordenação por preço, desconto e avaliação.
- `/discover`: seleção editorial com filtros de gênero e links para cada jogo.
- `/radar`: lista pessoal com adicionar/remover, persistida no navegador.
- `/games/[slug]`: página individual com arte, preço demonstrativo, recomendação e acompanhamento; slug desconhecido retorna 404.

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

Em containers sem sudo, se o Chromium acusar bibliotecas de sistema ausentes, extraia os `.deb` necessários (`apt-get download`) para uma pasta do usuário com `dpkg-deb -x` e exporte `LD_LIBRARY_PATH` (e `FONTCONFIG_FILE` apontando para um `fonts.conf` com `<dir>` das fontes) antes de rodar o e2e.

## Organização

- `src/app`: documento, shell compartilhado, páginas por rota e estilos responsivos.
- `src/components`: seções, exploração por rota, interações, animações e elementos compartilhados.
- `src/lib`: catálogo tipado, helpers puros de busca/ordenação/filtros, regras de recomendação e persistência segura.
- `public/art`: artes vetoriais conceituais originais, sem dependências externas.
- `tests`: regras de domínio, helpers de catálogo e cenários no navegador.

## Limites desta entrega

Preços, avaliações, horários e sinais são **demonstrativos**; não há integrações com lojas ou atualização em tempo real. As artes não são materiais oficiais dos jogos. BUY/WAIT/SKIP são resultados de regras transparentes sobre dados de exemplo: avaliação abaixo de 70 → SKIP; demais jogos no menor preço histórico do cenário ou abaixo → BUY; demais → WAIT.

Favoritos usam `localStorage` apenas neste navegador e são compartilhados entre rotas; se o armazenamento for bloqueado, continuam funcionando na sessão. Não há autenticação, notificações ou sincronização com servidor.

As animações respeitam `prefers-reduced-motion`; diálogos suportam teclado, Escape e retorno de foco. A aplicação não depende de fontes ou imagens externas.
