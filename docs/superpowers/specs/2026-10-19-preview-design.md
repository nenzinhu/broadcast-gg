# Aba Preview — Design

**Data:** 19 de outubro de 2026  
**Status:** aguardando revisão do usuário

## Objetivo

Criar uma área editorial chamada **Preview** para acompanhar 18 dos jogos mais esperados. A experiência deve permitir comparar rapidamente os títulos e, ao selecionar um deles, revelar descrição, plataformas, situação do lançamento, fatos confirmados, rumores identificados, fotos e vídeo sem sair da página.

O Preview deve reforçar o posicionamento do BROADCAST.GG como uma central de decisão e contexto. A página não será apenas uma grade de notícias: ela explicará o que se sabe, o que ainda é incerto e por que cada jogo merece atenção.

## Escopo da primeira versão

A primeira versão terá:

- rota pública `/preview`;
- link **Preview** na navegação principal;
- 18 jogos em uma curadoria tipada e local;
- hero editorial com um título selecionado;
- lista pesquisável e filtrável;
- painel multimídia que muda sem recarregar a página;
- descrição, gênero, plataformas e janela de lançamento;
- separação explícita entre fatos oficiais e rumores;
- galeria de imagens;
- trailer carregado somente após interação;
- URL compartilhável por jogo;
- estados de erro e ausência de resultados;
- animações GSAP com suporte a movimento reduzido.

Não fazem parte desta versão: painel administrativo, atualização automática por API, comentários, notas de usuários, notificações e páginas individuais exclusivas para cada preview.

## Curadoria inicial

1. Grand Theft Auto VI
2. Phantom Blade Zero
3. Marvel’s Wolverine
4. The Witcher IV
5. Intergalactic: The Heretic Prophet
6. Fable
7. Gears of War: E-Day
8. State of Decay 3
9. Marvel’s Blade
10. Kingdom Hearts IV
11. OD
12. Judas
13. Clockwork Revolution
14. Light No Fire
15. Exodus
16. The Elder Scrolls VI
17. Próximo Mass Effect
18. The Wolf Among Us Remastered

Antes da publicação, todos os dados editoriais devem ser verificados. Um título sem anúncio oficial, incluindo **The Wolf Among Us Remastered**, deve aparecer como rumor e nunca como lançamento confirmado.

## Modelo editorial

Cada jogo será representado por um registro com:

- `slug` e `title`;
- `summary` e `whyItMatters`;
- `genre`;
- `platforms`;
- `releaseWindow`;
- `informationStatus`: `confirmed`, `undated`, `strong-rumor` ou `unconfirmed-rumor`;
- `accent` para personalização visual;
- `heroImage` e `gallery`;
- `youtubeId` e rótulo do vídeo;
- lista de `officialFacts`;
- lista de `rumors`;
- fontes com título, URL, veículo ou publicador e data de consulta.

As fontes devem acompanhar a afirmação correspondente. Rumores também terão um nível de confiança curto e legível. Datas não confirmadas serão apresentadas como janela estimada ou “sem data anunciada”, nunca como datas definitivas.

## Experiência da página

### Navegação

O cabeçalho ganhará a opção **Preview**, apontando para `/preview`. A aba deve usar a linguagem visual das demais opções e indicar corretamente seu estado ativo.

### Hero editorial

O topo mostrará a imagem principal do jogo selecionado, nome, gênero, plataformas, janela de lançamento, estado da informação e uma frase explicando por que o jogo importa. O botão principal abrirá o trailer. Um indicador visual distinguirá informação confirmada de rumor.

### Lista e filtros

A lista terá os 18 jogos e permitirá:

- busca por título;
- filtro por plataforma;
- filtro por gênero;
- filtro por situação da informação.

No desktop, a lista ficará ao lado do painel. No celular, será horizontal e ficará acima do conteúdo selecionado. Uma combinação sem resultados exibirá uma mensagem clara e um botão para limpar os filtros.

### Seleção e compartilhamento

Selecionar um jogo atualizará o painel e a URL, usando `?jogo=<slug>`. Abrir uma URL válida selecionará o título correspondente. Um slug ausente ou inválido retornará ao primeiro jogo da curadoria sem quebrar a página.

### Conteúdo detalhado

O painel terá:

1. visão geral;
2. “O que está confirmado”;
3. “O que ainda é rumor”;
4. galeria de fotos;
5. trailer ou vídeo oficial;
6. fontes e data da última revisão editorial.

Quando não houver rumor relevante, a seção de rumores informará que não existem sinais editoriais suficientes, em vez de inventar conteúdo.

## Arquitetura

### Dados

Um novo módulo em `src/lib` armazenará a curadoria e os tipos. Ele ficará separado dos componentes e poderá ser substituído por uma fonte remota no futuro sem alterar a interface pública dos componentes.

### Renderização

`src/app/preview/page.tsx` será um Server Component responsável por metadata, introdução e entrega da curadoria inicial. Um componente cliente controlará seleção, filtros, sincronização da URL, trailer e animações.

### Componentes

A implementação deve dividir responsabilidades entre:

- navegador do Preview;
- lista e filtros;
- painel editorial;
- galeria;
- player de vídeo;
- indicadores de fato e rumor;
- estado vazio.

Os componentes existentes de mídia, arte e estados vazios devem ser reaproveitados quando seus contratos servirem ao novo fluxo. A implementação não deve duplicar o comportamento já validado de carregamento tardio do YouTube ou do fallback visual.

## Mídia

O vídeo será incorporado por `youtube-nocookie.com` somente após o clique. Antes disso, será exibida uma capa com chamada acessível. Fechar o player devolverá o foco ao botão que o abriu.

As imagens devem ter origem oficial ou licenciada para incorporação. Toda imagem terá texto alternativo e fallback identificável. Falhas na galeria não impedirão o acesso à descrição e às fontes. Quando possível, será oferecido um link para a fonte externa da mídia.

## Movimento e aparência

A página manterá o fundo escuro premium e usará a cor de destaque de cada jogo de forma controlada. As transições GSAP incluirão:

- troca suave da imagem principal;
- entrada escalonada dos metadados;
- scanner no indicador de situação;
- transição da lista para o painel no celular;
- reveal da galeria durante a rolagem.

Em `prefers-reduced-motion: reduce`, o conteúdo ficará imediatamente visível, sem movimentos contínuos ou dependência de animação para compreender mudanças.

## Acessibilidade

- lista e filtros operáveis por teclado;
- indicação de seleção disponível para tecnologias assistivas;
- foco visível;
- títulos em ordem semântica;
- status de filtros e resultados anunciados quando necessário;
- player com nome acessível e controle de fechamento;
- devolução de foco após fechar o vídeo;
- cores de fato e rumor acompanhadas por texto e ícones;
- alvos de toque adequados em telas pequenas.

## Estados de falha

- **Imagem indisponível:** fallback visual com o nome do jogo.
- **Galeria indisponível:** mensagem curta e preservação do restante do painel.
- **Vídeo indisponível:** link para abrir o vídeo na origem.
- **Slug inválido:** seleção segura do primeiro título.
- **Nenhum resultado:** estado vazio com ação para limpar filtros.
- **Jogo sem data:** texto “Sem data anunciada”.
- **Rumor sem evidência suficiente:** não publicado.

## Validação

Os testes devem verificar:

- presença e seleção dos 18 jogos;
- funcionamento do link Preview no cabeçalho;
- busca e combinação de filtros;
- estado vazio e limpeza dos filtros;
- leitura de `?jogo=<slug>` e fallback para slug inválido;
- atualização da URL ao selecionar um título;
- distinção textual entre fato e rumor;
- abertura tardia do iframe e fechamento com devolução de foco;
- fallback de mídia;
- navegação por teclado;
- estabilidade com movimento reduzido;
- ausência de rolagem horizontal em 375, 768 e 1440 pixels;
- ausência de erros no console durante trocas repetidas.

Ao final, devem passar `npm run lint`, `npm test`, `npm run build` e `npm run test:e2e`.

## Critérios de aceite

A funcionalidade estará pronta quando a navegação alcançar `/preview`, os 18 jogos puderem ser pesquisados e selecionados, cada painel apresentar descrição e mídia, fatos e rumores estiverem claramente diferenciados, URLs diretas funcionarem, a experiência for responsiva e acessível e toda a validação do projeto passar.
