# Central de Inteligência — Design

**Data:** 18 de outubro de 2026  
**Produto:** BROADCAST.GG  
**Status:** aprovado em conversa; aguardando revisão da especificação

## Objetivo

Criar uma Central que reúna três experiências editoriais:

1. **Radar de catálogo:** entradas, saídas e disponibilidade em serviços de assinatura.
2. **Vale a pena voltar?:** mudanças relevantes que justificam revisitar um jogo.
3. **Ordem para jogar:** linhas do tempo que ajudam a começar ou continuar uma franquia.

A Central deve reforçar a proposta “O que mudou. O que importa. O que jogar.”, dar novos motivos para retorno recorrente e manter separadas a curadoria editorial e a lista pessoal do Meu Radar.

## Escopo da primeira versão

### Radar de catálogo

- Serviços: Game Pass, PlayStation Plus e EA Play.
- Estados editoriais: `ENTROU`, `SAINDO` e `DISPONÍVEL`.
- Cada item apresenta jogo, serviço, plataforma, data ou janela, contexto curto e estado.
- Jogos já presentes no catálogo interno oferecem link para sua página e botão `TRACKING`.
- Jogos externos aparecem como conteúdo informativo, sem criar uma página vazia ou um botão inoperante.

### Vale a pena voltar?

- Seis jogos selecionados para a estreia.
- Cada item apresenta o que mudou, para quem a mudança importa, último marco editorial e veredito.
- Vereditos: `VOLTE AGORA` e `ESPERE MAIS`.
- Quando o jogo existe no catálogo, o card leva à página individual e permite acompanhamento.

### Ordem para jogar

- Franquias iniciais: Resident Evil, God of War, Grand Theft Auto e The Witcher.
- Cada franquia possui uma linha do tempo editorial, um ponto recomendado para começar e uma observação sobre continuidade.
- Cada entrada recebe uma classificação: `ESSENCIAL` ou `OPCIONAL`.
- A ordem representa uma recomendação editorial de entrada, não uma afirmação de que toda a cronologia precisa ser seguida.

## Arquitetura de informação

- Nova rota: `/central`.
- Novo item **Central** na navegação principal.
- Uma página com três abas acessíveis:
  - `#catalogo`
  - `#voltar`
  - `#ordem`
- Um hash válido abre diretamente a aba correspondente.
- Hash ausente ou inválido abre `#catalogo`.
- A troca de aba atualiza o endereço sem recarregar a página.
- O Meu Radar permanece dedicado à lista pessoal. A Central usa o mesmo `RadarProvider` e o mesmo `TrackButton` para adicionar jogos compatíveis.

## Estrutura de componentes

### Página e orquestração

- `src/app/central/page.tsx`: metadata, introdução e montagem da experiência.
- `src/components/intelligence-hub.tsx`: estado da aba, sincronização com hash, teclado e animação de transição.
- `src/components/intelligence-summary.tsx`: painel superior com quantidades editoriais.

### Experiências isoladas

- `src/components/catalog-radar.tsx`: filtros por serviço e cards de catálogo.
- `src/components/return-radar.tsx`: cards de mudanças e vereditos de retorno.
- `src/components/play-order.tsx`: seletor de franquia e timeline.

Cada componente recebe dados tipados. Nenhum componente busca conteúdo na rede na primeira versão.

## Modelo de dados

Os dados serão mantidos em módulos separados para permitir revisão editorial e futura substituição por integrações:

- `src/lib/catalog-services.ts`
- `src/lib/returning-games.ts`
- `src/lib/franchise-guides.ts`

Referências opcionais ao catálogo usam `gameId`. A interface só cria link interno ou botão `TRACKING` quando `gameId` corresponde a um jogo existente.

Todos os registros têm identificador estável. Textos de data usam rótulos editoriais explícitos e não fingem atualização em tempo real.

## Interface

### Cabeçalho da Central

- Eyebrow: `CENTRAL DE INTELIGÊNCIA / RADAR ATIVO`.
- Título: `Tudo o que merece voltar ao seu radar.`
- Descrição curta sobre catálogo, atualizações e franquias.
- Painel de status com quantidade de movimentos de catálogo, jogos avaliados para retorno e franquias mapeadas.

### Abas

- Abas grandes com ícone, nome e contador.
- Semântica ARIA de tabs, navegação com setas e foco visível.
- Rolagem horizontal contida em telas pequenas.
- Conteúdo da aba inativa sai da ordem de foco.

### Radar de catálogo

- Filtros: Todos, Game Pass, PlayStation Plus e EA Play.
- Cards com cor do serviço, estado, plataforma, data e resumo.
- `SAINDO` usa tratamento visual de atenção, sem depender apenas da cor.

### Vale a pena voltar

- Cards com arte do jogo quando disponível.
- Blocos `O QUE MUDOU`, `PARA QUEM IMPORTA` e veredito.
- Veredito sempre acompanhado por texto explicativo.

### Ordem para jogar

- Seletor de franquia no topo.
- Linha vertical conectando entradas.
- Ponto `COMECE AQUI` em destaque.
- Selos textuais `ESSENCIAL` e `OPCIONAL`.

## Movimento

- GSAP anima a primeira entrada do painel, o stagger dos cards e a troca entre abas.
- Uma linha de scanner atravessa o painel de status de modo lento.
- A timeline desenha sua linha conforme entra na tela.
- Cards reutilizam a inclinação sutil do `MotionScope`.
- Animações usam transformações e opacidade, sem alterar a posição final do conteúdo.
- Com `prefers-reduced-motion`, todo o conteúdo aparece imediatamente e nenhum recurso perde significado.

## Responsividade

- Desktop: grids amplos e timeline com conteúdo em duas zonas.
- Tablet: cards em duas colunas e controles flexíveis.
- Mobile: uma coluna, abas roláveis e timeline compacta.
- Nenhuma largura deve criar rolagem horizontal na página.
- Textos editoriais mantêm pelo menos 14 px nos cards.

## Estados e falhas

- Hash inválido volta para a primeira aba.
- Filtro sem resultado mostra estado vazio com ação para limpar.
- Arte indisponível usa o fallback local do BROADCAST.GG.
- Referência a jogo externo permanece informativa e não gera link quebrado.
- Referência interna inválida é detectada pelos testes de integridade.
- Todas as abas exibem `CURADORIA DEMONSTRATIVA` e informam que disponibilidade, datas e conteúdo podem mudar.

## Acessibilidade

- Abas seguem os papéis `tablist`, `tab` e `tabpanel`.
- Setas movem o foco entre abas; Home e End levam à primeira e à última.
- Foco retorna de forma previsível depois da troca.
- Estados não dependem apenas de cor ou animação.
- Links e botões mantêm nomes específicos por jogo.
- A timeline usa HTML estruturado e continua compreensível sem CSS.

## Testes

### Unidade

- IDs únicos nos três conjuntos de dados.
- Referências internas apontam para jogos existentes.
- Estados e vereditos aceitam apenas os valores definidos.
- Cada franquia possui um ponto recomendado para começar.

### Navegador

- `/central` abre a aba Catálogo.
- Os três hashes abrem o painel correto.
- Troca de abas funciona com clique e teclado.
- Filtros de serviço atualizam cards e estado vazio.
- Jogos internos podem ser adicionados ao Meu Radar.
- Troca de franquia atualiza timeline e ponto de início.
- Layouts permanecem legíveis em 375, 768 e 1440 px.
- Movimento reduzido preserva todo o conteúdo.

### Verificação final

- `npm run lint`
- `npm test`
- `npm run build`
- `npm run test:e2e`
- inspeção visual de desktop e mobile

## Fora do escopo

- Integração automática com APIs de assinatura.
- Autenticação e sincronização entre dispositivos.
- Notificações por e-mail, push ou aplicativos externos.
- Confirmação em tempo real de disponibilidade regional.
- Painel administrativo de curadoria.

## Evolução futura

Os módulos editoriais poderão ser substituídos por uma camada de dados remota que respeite os mesmos tipos. A interface não dependerá da origem dos dados. Uma futura versão poderá acrescentar região, plataforma preferida, alertas e histórico de mudanças sem alterar a organização principal da Central.
