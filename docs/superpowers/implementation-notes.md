# BROADCAST.GG — implementação premium

Homepage e páginas Signals, Deals, Discover, Radar e cinco páginas de jogos implementadas no checkout isolado existente. Componentes compartilhados, catálogo tipado, filtros combináveis, favoritos persistidos e estados vazios acessíveis.

## Verificação

- 30 testes unitários aprovados: decisão, persistência, consultas e validação da mídia Steam.
- Lint e build de produção aprovados.
- Suite de 23 cenários de navegador aprovada: navegação, filtros, armazenamento bloqueado, teclado, diálogos, movimento reduzido, GSAP, responsividade em 375/768/1440 px e mídia com fixtures controladas.
- Revisão independente encontrou a ordem de Tab do menu mobile e reabertura após voltar; ambos corrigidos com regressões.
- Revisão da mídia encontrou falta de tratamento de falha do CDN e foco recortado no trailer; ambos corrigidos. Adicionado cenário API 200 com imagem indisponível. Após essas correções, lint/build e os cinco cenários de mídia passaram novamente.
- Capturas desktop e mobile geradas; homepage desktop inspecionada, incluindo nova integração das imagens oficiais locais.

## Decisões

Fontes locais, paleta escura com cores por jogo e animações GSAP com cleanup e movimento reduzido. Capas reais da Steam são a primeira opção; artes locais identificadas aparecem somente em falha. O player do YouTube carrega após clique. Capturas reais são consultadas no servidor com timeout, validação de domínio e cache.

A instalação usou cache `/tmp/broadcast-npm-cache`. Validações agrupadas devido aos providers e catálogo compartilhados. Nenhum segredo de implantação faz parte do repositório.

## Limites verificáveis

Preços, avaliações e sinais permanecem demonstrativos. Favoritos são locais, sem conta ou alertas. A rede cloud bloqueou Steam e YouTube; um rascunho de domínios foi salvo para revisão/salvamento/publicação nas configurações do ambiente. Os testes com fixtures comprovam os controles e os estados de falha, não a reprodução externa ou disponibilidade dos vídeos.

A API Vercel retornou HTTP 403 no proxy; os domínios api.vercel.com e vercel.com foram adicionados ao rascunho de rede, ainda pendente de publicação. A CLI Vercel está sem autenticação; a tentativa de login falhou por acesso de rede. O projeto está pronto para importação Next.js, com branch de produção `main`, sem variáveis secretas obrigatórias. A publicação precisa de acesso autenticado ou da integração GitHub existente.

## Integração com a main

Integradas as entregas remotas até 71731de: imagens promocionais oficiais locais, favicon e allowedDevOrigins preservados. Componentes de exploração duplicados foram consolidados no CatalogBrowser; busca por gênero/descrição e ordenação por avaliação preservadas. Os cenários routes.spec.ts foram substituídos pela cobertura ampliada de navigation/exploration/premium. As artes SVG permanecem somente como fallback de erro.
