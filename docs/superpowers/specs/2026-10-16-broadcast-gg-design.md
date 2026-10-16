# BROADCAST.GG — primeira entrega

## Objetivo e escopo
Criar a homepage completa de uma plataforma gamer para acompanhar mudanças, quedas de preço e decisões de compra. O repositório está vazio; será criada a base Next.js com App Router, TypeScript, GSAP, @gsap/react e ScrollTrigger.

Esta entrega inclui a homepage e componentes reutilizáveis. Páginas dedicadas de Deals, Signals, Discover, radar pessoal e jogo ficam para a próxima entrega. A navegação inicial aponta para seções reais da homepage, sem links para páginas inexistentes.

## Abordagens
1. Recomendada: homepage editorial com módulos de radar, hierarquia visual forte e interações locais. Comunica a marca e permite validar o produto sem depender de serviços externos.
2. Dashboard denso: prioriza monitoramento, mas reduz o impacto da apresentação inicial e dificulta o uso mobile.
3. Backend e integrações desde o início: permite dados reais, porém exige escolher fornecedores, credenciais e regras de atualização antes de entregar a interface.

## Direção visual
Fundo quase preto, superfícies grafite, bordas discretas, texto branco e cinza e verde signal #A6FF00 reservado para destaques. Tipografia sans-serif forte e limpa, metadados monoespaçados e espaçamento generoso. Radar abstrato com círculos e marcadores; evitar glitch, excesso de brilho e estética cyberpunk.

Header com BROADCAST.GG, links para seções e acesso ao radar. Hero com o título exato “O QUE MUDOU. O QUE IMPORTA. O QUE JOGAR.” e subtexto “Seu radar pessoal para acompanhar games, detectar quedas de preço e descobrir o que realmente merece seu tempo.” Composição em duas colunas no desktop e uma no mobile.

## Conteúdo e interação
- Hero: texto, indicador SIGNAL LIVE, chamadas para explorar sinais e acompanhar jogos; radar visual animado.
- Live Signals: cards classificados como PRICE SIGNAL, UPDATE SIGNAL e TREND SIGNAL, com filtros funcionais e estado vazio.
- Price Radar / Deals: preços em BRL, descontos e chamadas para acompanhar jogos.
- Decision Engine: seletor de jogo com recomendação BUY, WAIT ou SKIP, razões e contexto demonstrativo. Não apresentar a recomendação como avaliação de mercado em tempo real.
- Radar pessoal: adicionar/remover jogos, persistência local no navegador e estado vazio. Sem conta ou autenticação nesta entrega.
- Discover: seleção de jogos com detalhes em diálogo acessível, reutilizando dados tipados.
- Rodapé: marca e slogan, com indicação clara de que sinais, preços e recomendações são exemplos.

## Arquitetura e dados
App Router com layout e página como Server Components; componentes Client apenas onde há interação ou animação. Separar componentes de layout, seções, primitivas de interface, animações, dados e lógica de recomendação. Dados demonstrativos centralizados e tipados. Sem segredos, serviços pagos, banco ou APIs externas nesta etapa.

Persistência local com tratamento de JSON inválido e indisponibilidade de localStorage. Renderização inicial estável para evitar divergência de hidratação. Imagens opcionais com dimensões definidas e alternativa visual sem depender de credenciais.

## Animação e acessibilidade
GSAP com useGSAP e escopo por componente; ScrollTrigger para reveals e stagger. Reveal de texto, scanner horizontal, radar e microinterações de cards com duração moderada. Respeitar prefers-reduced-motion, limpar animações e listeners e manter o conteúdo acessível sem animação. Interações via teclado, foco visível, labels de formulário, fechamento de diálogo com Escape e gerenciamento de foco. Layout responsivo sem rolagem horizontal.

## Validação e critérios de aceite
Instalar dependências e gerar lockfile. Executar lint e build de produção, corrigindo erros. Iniciar aplicação e validar resposta e renderização da homepage; conferir interações e tamanhos mobile/desktop em navegador se ferramenta disponível. Testes direcionados à decisão BUY/WAIT/SKIP e persistência do radar quando houver infraestrutura adequada. Não considerar uma resposta HTTP suficiente para validar interações.

Aceite: homepage completa com todas as seções acima, navegação válida, filtros e radar funcionais, dados demonstrativos explícitos, animações com redução de movimento, componentes reutilizáveis e lint/build aprovados. Nenhuma alegação de preços ou sinais reais.
