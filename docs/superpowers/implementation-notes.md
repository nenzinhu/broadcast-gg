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
