# BROADCAST.GG — validação da homepage

Implementação da proposta aprovada, no checkout isolado existente.

## Verificações executadas

- `npm test`: 11 testes aprovados, incluindo limites BUY/WAIT/SKIP, JSON inválido e IDs desconhecidos/duplicados.
- `npm run lint`: aprovado.
- `npm run build`: aprovado, rota `/` pré-renderizada.
- `npm run test:e2e`: 6 cenários aprovados no Chromium sobre o build de produção.
- Navegador: filtros, três recomendações, favoritos após recarga, armazenamento bloqueado, diálogo/Escape/retorno de foco, mobile de 375 px sem overflow, âncoras válidas, movimento reduzido e alteração de layout com movimento normal.
- Capturas desktop e mobile inspecionadas.
- Revisão independente encontrou um problema importante: posições desatualizadas de ScrollTrigger após filtragem no mobile. Teste reproduziu opacity 0; ResizeObserver com cleanup e animação do contêiner estável corrigiram a falha; suite completa aprovada após a correção.

## Decisões de execução

- Mantido o checkout cloud existente conforme a proposta; nenhuma worktree adicional.
- Registro local substituiu helpers de skills não disponíveis como executáveis nesta máquina, sem efeito no produto.
- Instalação usou cache em `/tmp/broadcast-npm-cache` porque o cache padrão não era gravável; verificações de TLS e integridade mantidas. Esse cache pode precisar ser preenchido novamente em outra máquina.
- Artes SVG locais substituíram imagens externas que retornaram HTTP 403. São imagens conceituais, não materiais oficiais; a interface declara essa distinção.
- Base visual e interações foram validadas em conjunto devido aos providers compartilhados; a cobertura final inclui ambos.
- O primeiro cenário de navegador excedeu o limite global de 30 segundos, sem falha funcional comprovada. Foi dividido em dois cenários independentes, preservando todas as verificações; ambos passaram.

## Limites

Dados de exemplo, sem preços reais, lojas, APIs, contas ou alertas. Páginas dedicadas permanecem fora desta primeira entrega aprovada.

Lacuna menor registrada pela revisão: o estado vazio dos filtros está implementado, mas o catálogo atual possui sinais em todas as categorias, portanto esse ramo não foi exercitado nos testes de navegador. O estado vazio do radar pessoal foi exercitado.

# BROADCAST.GG — navegação completa e experiência premium

Segunda entrega, conforme `docs/superpowers/specs/2026-10-17-broadcast-premium-design.md`.

## Verificações executadas

- `npm run lint`: aprovado.
- `npm test`: 32 testes aprovados (decisão, radar-storage e os novos helpers de busca/ordenação/gênero/sinais).
- `npm run build`: aprovado; `/`, `/signals`, `/deals`, `/discover` e `/radar` pré-renderizadas e cinco páginas `/games/[slug]` em SSG.
- `npm run test:e2e`: 13 cenários aprovados no Chromium (os 6 da homepage inalterados e 7 novos cobrindo rotas, busca/ordenação, favoritos entre páginas, 404, teclado/mobile e movimento reduzido).
- `npm run start`: todas as rotas responderam 200; slug desconhecido respondeu 404; sonda com o Host do preview respondeu 200.
- Capturas desktop (1440 px) e mobile (375 px) de todas as rotas inspecionadas: sem overflow horizontal, sem erros de console nem requisições falhas.

## Decisões desta etapa

- Shell (RadarProvider, header, footer) movido para o layout compartilhado; MotionScope permanece por rota para limpar gatilhos de animação ao navegar.
- Header virou cliente com estado ativo via `usePathname`; menu mobile com `aria-expanded`/`aria-controls` e foco movido para o primeiro link ao abrir, fechando sozinho na troca de rota.
- Catálogo ganhou `slug` e `kicker` editorial; helpers puros de busca, ordenação, gênero e sinais em `catalog-query.ts`, com busca sem acentos e espaços colapsados.
- Estado vazio real exercitado: busca sem correspondência em `/signals` e `/deals` (lacuna registrada na entrega anterior).
- Neste container sem sudo, o Chromium exigiu bibliotecas de sistema extraídas manualmente para `~/.local/ublibs` (`apt-get download` + `dpkg-deb -x`) com `LD_LIBRARY_PATH` e `FONTCONFIG_FILE` locais; o procedimento está registrado no README.

## Limites

Dados permanecem demonstrativos; sem autenticação, alertas ou backend. A revisão visual usou capturas via Playwright, sem interação humana em navegador real.
