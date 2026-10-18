export type BuyingGuide = {
  enjoy: string;
  caution: string;
  technical: string;
  verdict: string;
};

export const buyingGuides: Record<string, BuyingGuide> = {
  cyberpunk: {
    enjoy:
      "Você quer explorar Night City, construir estilos de combate diferentes e seguir missões com personagens marcantes.",
    caution:
      "A quantidade de sistemas, diálogos e atividades pode cansar quem procura uma campanha curta e direta.",
    technical:
      "O mundo aberto é exigente. Confira os requisitos do seu PC e o espaço disponível antes de baixar.",
    verdict:
      "Uma ótima escolha para quem busca um RPG longo, cinematográfico e cheio de possibilidades.",
  },
  "elden-ring": {
    enjoy:
      "Você gosta de exploração livre, chefes desafiadores e da sensação de descobrir caminhos sem marcadores excessivos.",
    caution:
      "O jogo exige paciência, aceita pouco erro e explica várias mecânicas de forma indireta.",
    technical:
      "Prefira uma configuração que mantenha a taxa de quadros estável; precisão faz diferença nos combates.",
    verdict:
      "Essencial para quem aceita o desafio e quer uma aventura capaz de render dezenas de descobertas.",
  },
  hades: {
    enjoy:
      "Você gosta de runs rápidas, combate responsivo e histórias que avançam mesmo quando uma tentativa termina.",
    caution:
      "A repetição faz parte da proposta e pode não agradar quem prefere campanhas totalmente lineares.",
    technical:
      "É uma experiência leve em comparação com grandes mundos abertos e funciona melhor com controles precisos.",
    verdict:
      "Excelente para sessões curtas que quase sempre viram mais uma tentativa.",
  },
  "hollow-knight": {
    enjoy:
      "Você quer exploração, segredos, atmosfera melancólica e combates que recompensam domínio dos movimentos.",
    caution:
      "É fácil se perder, os pontos de descanso são espaçados e alguns chefes exigem muitas tentativas.",
    technical:
      "Roda bem em máquinas modestas e combina especialmente com controle ou portátil.",
    verdict:
      "Uma das compras com melhor relação entre preço, conteúdo e qualidade para fãs de metroidvania.",
  },
  starfield: {
    enjoy:
      "Você busca exploração espacial, criação de personagem, construção de naves e muitas missões paralelas.",
    caution:
      "O ritmo é lento, há muitas telas de viagem e a exploração não tem a continuidade de outros mundos abertos.",
    technical:
      "É um jogo pesado e se beneficia bastante de SSD, processador moderno e ajustes gráficos equilibrados.",
    verdict:
      "Vale para fãs dedicados de ficção científica; os demais podem esperar um preço mais próximo do histórico.",
  },
  "baldurs-gate-3": {
    enjoy:
      "Você gosta de escolhas com consequências, personagens profundos e combates táticos cheios de alternativas.",
    caution:
      "A campanha é longa e o sistema inspirado em RPG de mesa exige leitura, planejamento e atenção.",
    technical:
      "As áreas mais densas exigem mais do processador. Reserve bastante armazenamento para a instalação.",
    verdict:
      "Uma recomendação forte para quem quer liberdade real de decisão e não tem pressa para terminar.",
  },
  "resident-evil-4": {
    enjoy:
      "Você procura ação tensa, progressão constante e uma campanha feita para ser rejogada.",
    caution:
      "Há violência intensa, gerenciamento de recursos e momentos de pressão quase contínua.",
    technical:
      "Oferece boas opções gráficas, mas efeitos de cabelo e texturas podem pesar em placas com pouca memória.",
    verdict:
      "Uma compra segura para fãs de ação e survival horror, especialmente em promoção.",
  },
  "stardew-valley": {
    enjoy:
      "Você quer jogar no próprio ritmo, cuidar de uma fazenda e criar uma rotina confortável sozinho ou em grupo.",
    caution:
      "Os primeiros dias parecem lentos e a quantidade de objetivos pode intimidar quem tenta otimizar tudo.",
    technical:
      "É leve, ocupa pouco espaço e funciona muito bem em computadores modestos e dispositivos portáteis.",
    verdict:
      "Uma opção acessível, acolhedora e capaz de render centenas de horas sem pressionar o jogador.",
  },
  celeste: {
    enjoy:
      "Você gosta de plataforma precisa, fases curtas e uma história sensível sobre ansiedade e persistência.",
    caution:
      "A dificuldade cresce bastante, embora as opções de assistência permitam adaptar a experiência.",
    technical:
      "Roda em hardware modesto e exige pouca memória; um controle com direcional preciso ajuda bastante.",
    verdict:
      "Pequeno no tamanho e enorme no impacto, especialmente para quem gosta de superar desafios.",
  },
  "god-of-war": {
    enjoy:
      "Você procura combate de impacto, produção cinematográfica e uma relação entre pai e filho no centro da aventura.",
    caution:
      "A exploração é mais guiada que em um mundo aberto e algumas atividades seguem estruturas repetidas.",
    technical:
      "A versão para PC oferece ajustes amplos, mas texturas altas pedem memória de vídeo adequada.",
    verdict:
      "Forte recomendação para quem valoriza narrativa, espetáculo e combate corpo a corpo.",
  },
  "it-takes-two": {
    enjoy:
      "Você tem uma pessoa para jogar junto e gosta de mecânicas novas aparecendo durante toda a campanha.",
    caution:
      "Não existe modo solo tradicional; coordenação e comunicação são parte obrigatória da experiência.",
    technical:
      "O Passe de Amigo permite que apenas uma pessoa compre, mas ambas precisam de conexão estável no online.",
    verdict:
      "Uma das melhores escolhas para duas pessoas que querem rir, conversar e cooperar.",
  },
  "disco-elysium": {
    enjoy:
      "Você valoriza escrita, investigação, escolhas políticas e diálogos tão importantes quanto qualquer combate.",
    caution:
      "Há muita leitura, ritmo contemplativo e quase nenhuma ação convencional.",
    technical:
      "É relativamente leve, mas a experiência depende de áudio e texto; escolha o idioma com atenção.",
    verdict:
      "Indispensável para quem procura um RPG narrativo e aceita trocar ação por ideias.",
  },
  "outer-wilds": {
    enjoy:
      "Você gosta de descobrir regras por conta própria e montar um grande mistério a partir de pequenas pistas.",
    caution:
      "O controle da nave exige adaptação e qualquer spoiler pode reduzir o impacto da descoberta.",
    technical:
      "A simulação física pode exigir mais do processador do que o visual sugere; controle é recomendado para pilotar.",
    verdict:
      "Compre se você quer uma aventura movida por curiosidade e consegue entrar sem procurar respostas antes.",
  },
  "clair-obscur": {
    enjoy:
      "Você quer um RPG por turnos com comandos em tempo real, direção artística forte e uma história emocional.",
    caution:
      "A precisão nas esquivas e aparos pode frustrar quem espera um sistema totalmente baseado em menus.",
    technical:
      "Os cenários detalhados pedem hardware recente; use o ajuste de escala para equilibrar nitidez e desempenho.",
    verdict:
      "Uma escolha marcante para quem deseja estratégia com ritmo e uma campanha de identidade própria.",
  },
  "monster-hunter-wilds": {
    enjoy:
      "Você gosta de dominar armas complexas, preparar caçadas e cooperar contra criaturas gigantes.",
    caution:
      "A curva de aprendizado é longa e repetir monstros para criar equipamentos faz parte do ciclo principal.",
    technical:
      "É uma experiência exigente. Confira requisitos, atualizações e análises da sua plataforma antes da compra.",
    verdict:
      "Ótimo para grupos e jogadores que gostam de melhorar pouco a pouco entre grandes confrontos.",
  },
  "helldivers-2": {
    enjoy:
      "Você procura missões cooperativas caóticas, objetivos compartilhados e histórias engraçadas criadas pelo grupo.",
    caution:
      "O jogo depende de conexão, recebe mudanças frequentes e pode ser frustrante sem comunicação.",
    technical:
      "É exclusivamente online. Verifique a qualidade da conexão e a disponibilidade dos serviços antes de jogar.",
    verdict:
      "Vale muito mais com amigos e para quem aceita que o caos, inclusive o fogo amigo, faz parte da diversão.",
  },
  "forza-horizon-5": {
    enjoy:
      "Você quer uma coleção enorme de carros, direção acessível e liberdade para explorar sem seguir uma ordem rígida.",
    caution:
      "A progressão entrega recompensas rapidamente e pode parecer pouco exigente para fãs de simulação pura.",
    technical:
      "Escala bem entre diferentes configurações, mas o mapa e os carros exigem bastante armazenamento.",
    verdict:
      "Uma porta de entrada excelente para corrida e uma opção fácil de recomendar em promoção.",
  },
  "black-myth-wukong": {
    enjoy:
      "Você busca chefes espetaculares, combate focado em esquiva e uma releitura visual da mitologia chinesa.",
    caution:
      "Algumas lutas são exigentes e a estrutura é mais linear do que a aparência inicialmente sugere.",
    technical:
      "Os efeitos visuais são pesados. Confira testes da sua placa de vídeo e considere tecnologias de escala.",
    verdict:
      "Recomendado para quem prioriza ação, grandes confrontos e apresentação visual acima de exploração livre.",
  },
};

export function getBuyingGuide(gameId: string): BuyingGuide {
  const guide = buyingGuides[gameId];
  if (!guide) {
    throw new Error(`Guia de compra ausente para o jogo: ${gameId}`);
  }
  return guide;
}
