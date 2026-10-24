# BROADCAST.GG

O que mudou. O que importa. O que jogar.

Plataforma frontend gamer em Next.js App Router, TypeScript e GSAP. Inclui Live Signals com filtros, Price Radar, Decision Engine BUY/WAIT/SKIP, radar pessoal persistido no navegador, Discover e uma central editorial de jogos futuros.

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

`npm run test:e2e` usa Playwright e inicia um servidor com o build de produção na porta 3100. Execute `npm run build` antes e mantenha essa porta disponível. O Chromium local é usado quando disponível; em outras máquinas, instale com `npx playwright install chromium`. Pode-se informar `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` para outro caminho.

## Páginas

- `/`: homepage editorial com radar animado, destaque de jogo e seções interativas.
- `/signals`: busca por jogo e filtros de preço, atualização e tendência.
- `/deals`: busca e ordenação por preço ou desconto.
- `/discover`: curadoria com busca e filtro de gênero.
- `/preview`: central editorial interativa com 18 jogos aguardados, filtros e ordenação por hype, dossiê detalhado, índice editorial de hype, fatos confirmados, rumores identificados, fotos, trailers e vídeos de comunidades do YouTube.
- `/central`: Radar de Catálogo, análise de retorno e ordem para jogar franquias.
- `/radar`: favoritos compartilhados entre páginas e persistidos no navegador.
- `/games/[slug]`: páginas individuais, análise demonstrativa e acompanhamento. Slug desconhecido retorna 404.

Fontes Manrope e Barlow Condensed são servidas localmente. Capas e destaques usam imagens oficiais da Steam, armazenadas localmente no repositório. Artes vetoriais locais são alternativas identificadas em caso de falha e podem ser reproduzidas com `python scripts/generate-art.py`.

## Organização

- `src/app`: documento, composição e estilos responsivos.
- `src/components`: seções, interações, animações e elementos compartilhados.
- `src/lib`: catálogo tipado, regras de recomendação e persistência segura.
- `public/art`: artes vetoriais conceituais originais, sem dependências externas.
- `tests`: regras de domínio e cenários no navegador.

## Limites desta entrega

Preços, avaliações, horários e sinais são **demonstrativos**; não há integração de preços com lojas nem atualização de sinais em tempo real. BUY/WAIT/SKIP são resultados de regras transparentes sobre dados de exemplo: avaliação abaixo de 70 → SKIP; demais jogos no menor preço histórico do cenário ou abaixo → BUY; demais → WAIT.

O **índice de hype** do Preview é uma leitura editorial do BROADCAST.GG (0–100), com motivação e tendência declaradas; não é medição automática de audiência. Os **vídeos de comunidades** são selecionados manualmente entre criadores independentes, abrem sob clique no player `youtube-nocookie` e representam a opinião dos canais, não do estúdio ou da plataforma. Títulos sem evidência suficiente, como The Wolf Among Us Remastered, não recebem vídeos da comunidade.

Favoritos usam `localStorage` apenas neste navegador; se o armazenamento for bloqueado, continuam funcionando na sessão. Não há autenticação, notificações ou sincronização com servidor. A homepage e as páginas dedicadas estão implementadas.

As animações respeitam `prefers-reduced-motion`; diálogos suportam teclado, Escape e retorno de foco. Fontes e artes alternativas são locais. Vídeos e capturas de gameplay dependem dos serviços externos descritos abaixo.


## Mídia real

Cada jogo tem capa/destaque da Steam, trailer incorporado do YouTube após clique e uma galeria ampliável. `/api/games/[slug]/media` consulta as capturas publicadas na Steam, valida seus endereços e mantém cache de uma hora. Falhas mostram uma mensagem e opção de tentar novamente; não são substituídas por gameplay inventado.

Em `/preview`, imagens e vídeos são carregados sob demanda a partir dos canais oficiais no YouTube. A curadoria separa fatos confirmados de rumores e mostra as fontes e a data da última revisão editorial. Quando ainda não existe vídeo oficial confiável, a interface informa a indisponibilidade em vez de criar um player quebrado.

O ambiente de desenvolvimento bloqueou Steam e YouTube durante a validação. Os testes de player e galeria usam fixtures controladas e verificam interação, acessibilidade e recuperação de falhas; não comprovam disponibilidade ou reprodução dos vídeos externos. Foi salvo um rascunho de configuração de rede para revisão, salvamento e publicação nas configurações do ambiente, permitindo:

- `store.steampowered.com`, `shared.fastly.steamstatic.com`, `cdn.akamai.steamstatic.com`
- `www.youtube.com`, `www.youtube-nocookie.com`, `i.ytimg.com`, `*.googlevideo.com`

## Publicação na Vercel

Importe `nenzinhu/broadcast-gg`, escolha Next.js e a branch de produção `main`. O projeto usa a raiz do repositório, `npm run build` e não exige variáveis secretas para os recursos atuais. Com a integração GitHub ativa, cada push para `main` dispara um deploy. Alternativamente, em uma sessão autenticada da CLI, execute `vercel --prod`.
