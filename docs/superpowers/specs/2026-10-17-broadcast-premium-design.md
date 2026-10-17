# BROADCAST.GG — experiência premium e navegação completa

## Resultado desejado
Evoluir a homepage existente para uma experiência visual memorável e agradável de explorar, mantendo fundo quase preto, verde #A6FF00, tipografia forte e o conceito de inteligência gamer. Entregar alterações testadas no repositório `nenzinhu/broadcast-gg`.

## Abordagens consideradas
1. Recomendada: experiência editorial premium com páginas de exploração. Preserva a identidade atual, melhora a apresentação dos jogos e dá motivos concretos para navegar e salvar favoritos.
2. Dashboard denso: útil para comparar muitos dados, mas menos adequado à experiência visual e de descoberta solicitada.
3. Landing page cinematográfica: maior impacto inicial, mas pouca profundidade de uso; não atende tão bem à continuidade do produto.

## Direção visual
Hero assimétrico com título original, radar refinado e destaque editorial de um jogo. Artes locais distintas por jogo, sem reutilizar a mesma paisagem com cores diferentes e sem depender de destinos de rede bloqueados. Arte conceitual identificada; nenhuma imagem apresentada como captura oficial sem sê-lo.

Tipografia com hierarquia clara, textos de leitura a partir de 14 px e metadados a partir de 11 px, especialmente no mobile. Mais contraste nos textos secundários, espaçamento consistente, grids variados e cartões com informação organizada. Verde reservado para ação, sinal e destaque; brilho discreto, sem glitch ou neon excessivo.

## Navegação e páginas
- `/`: homepage refinada com seções já existentes e links para aprofundamento.
- `/signals`: feed com filtros por tipo e busca por jogo, incluindo estado vazio real.
- `/deals`: catálogo com busca e ordenação por preço ou desconto, sempre identificado como demonstração.
- `/discover`: seleção editorial com filtros de gênero e links para os jogos.
- `/radar`: lista pessoal com adicionar/remover e persistência local compartilhada entre rotas.
- `/games/[slug]`: página individual com arte, descrição, gênero, preço demonstrativo, recomendação e botão de acompanhamento; jogo desconhecido retorna 404.

Header compartilhado com estado ativo e navegação mobile acessível. Logo retorna à homepage. Footer e estados vazios oferecem caminhos reais de navegação, sem botões decorativos.

## Interações e animação
GSAP e ScrollTrigger mantidos: reveal curto, stagger, scanner, radar, transições suaves e resposta discreta ao foco/hover. Nada de scroll travado ou cursor customizado obrigatório. Conteúdo acessível com movimento reduzido, navegação por teclado e foco visível. Limpeza dos efeitos ao trocar de rota; recalcular gatilhos quando filtros ou favoritos alterarem o layout.

## Arquitetura
Mover shell, header, footer e RadarProvider para o layout compartilhado. Manter Server Components nas páginas e isolar busca, filtros, favoritos e animações em componentes cliente. Catálogo tipado central com slug e atributos editoriais; helpers puros para busca/ordenação e recomendações. Reutilizar cards e estados vazios. Preservar o tratamento de armazenamento inválido ou bloqueado e impedir divergências de hidratação.

## Limites explícitos
Esta etapa entrega uma experiência frontend completa no escopo das páginas descritas. Preços, avaliações e sinais permanecem demonstrativos. Dados reais, autenticação, alertas, backend e publicação pública exigem serviços e configuração próprios; não serão simulados como integrações prontas. Enviar código ao GitHub não equivale a publicar um site acessível ao público.

## Validação e entrega
Testes das regras de busca/ordenação e recomendação; testes de navegador para todas as rotas, favoritos entre páginas e após recarga, filtros vazios, 404, navegação mobile/teclado e movimento reduzido. Verificar 375 px, tablet e desktop, ausência de overflow, carregamento das artes e erros de console. Executar lint, testes e build. Revisar capturas antes de concluir. Fazer commit e push sem force, preservando mudanças remotas.

## Critério de conclusão
Todas as rotas e controles acima funcionam; visual revisado em desktop/mobile; testes e build aprovados; commit confirmado no remoto. Não usar “100%” para alegar integrações ou publicação que não foram realizadas.

## Ajuste solicitado pelo usuário durante a implementação
Dar mais cor e identidade gamer à interface, usar imagens reais de jogos, trailers por links do YouTube e fotos de gameplay. Usar capas oficiais da Steam como mídia principal, com fallback conceitual identificado apenas quando a imagem não carregar. Galeria obtém capturas pela API oficial da Steam; nenhum screenshot é inventado. Trailers incorporados pelo YouTube com carregamento apenas após clique. GSAP amplia microinterações e transições, respeitando movimento reduzido. Manter testes e envio ao GitHub; conectividade externa bloqueada deve ser reportada sem afirmar reprodução ou download não verificados.
