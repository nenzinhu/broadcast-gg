export type ReturnVerdict = "volte-agora" | "espere-mais";

export type ReturningGame = {
  id: string;
  gameId: string;
  changed: string;
  mattersTo: string;
  milestone: string;
  verdict: ReturnVerdict;
  verdictReason: string;
};

export const returningGames: ReturningGame[] = [
  {
    id: "return-cyberpunk",
    gameId: "cyberpunk",
    changed:
      "A experiência recebeu revisões de sistemas, progressão e combate que tornam uma nova jornada mais fluida.",
    mattersTo:
      "Quem abandonou Night City no lançamento ou quer testar outra construção de personagem.",
    milestone: "GRANDE REVISÃO DE SISTEMAS",
    verdict: "volte-agora",
    verdictReason: "As mudanças centrais já transformam a experiência o bastante para justificar um novo começo.",
  },
  {
    id: "return-starfield",
    gameId: "starfield",
    changed:
      "A exploração ganhou ajustes e conteúdo, mas o ritmo central ainda depende de viagens e atividades espaçadas.",
    mattersTo:
      "Fãs de ficção científica que aceitam uma experiência contemplativa e baseada em objetivos próprios.",
    milestone: "EXPANSÃO DO UNIVERSO",
    verdict: "espere-mais",
    verdictReason: "Ainda vale esperar por uma evolução que altere o ritmo entre exploração e objetivos.",
  },
  {
    id: "return-helldivers-2",
    gameId: "helldivers-2",
    changed:
      "Novos objetivos, equipamentos e ameaças renovam as histórias imprevisíveis de cada esquadrão.",
    mattersTo:
      "Grupos que gostam de cooperação, comunicação e caos provocado pelo próprio time.",
    milestone: "NOVA FRENTE DE GUERRA",
    verdict: "volte-agora",
    verdictReason: "A variedade de missões e ameaças já oferece novas histórias para o esquadrão.",
  },
  {
    id: "return-forza-horizon-5",
    gameId: "forza-horizon-5",
    changed:
      "Mais carros, desafios sazonais e atividades comunitárias ampliaram as rotas do festival.",
    mattersTo:
      "Quem quer corridas rápidas sem reaprender sistemas complexos ou começar uma campanha nova.",
    milestone: "FESTIVAL EM MOVIMENTO",
    verdict: "volte-agora",
    verdictReason: "O retorno é simples e o conteúdo sazonal oferece objetivos imediatos sem exigir recomeço.",
  },
  {
    id: "return-monster-hunter-wilds",
    gameId: "monster-hunter-wilds",
    changed:
      "A rotação de eventos e caçadas oferece novos motivos para testar armas e reencontrar o grupo.",
    mattersTo:
      "Caçadores que gostam de progressão gradual, equipamentos específicos e confrontos cooperativos.",
    milestone: "TEMPORADA DE CAÇA",
    verdict: "volte-agora",
    verdictReason: "As novas caçadas já entregam motivos claros para rever equipamentos e reunir o grupo.",
  },
  {
    id: "return-stardew-valley",
    gameId: "stardew-valley",
    changed:
      "Novos detalhes, eventos e melhorias de qualidade de vida deixam uma fazenda antiga com sensação renovada.",
    mattersTo:
      "Quem procura um retorno tranquilo, sem pressão para consumir todo o conteúdo de uma vez.",
    milestone: "O VALE CRESCEU",
    verdict: "volte-agora",
    verdictReason: "As melhorias deixam uma fazenda antiga renovada sem criar pressão para acompanhar tudo.",
  },
];
