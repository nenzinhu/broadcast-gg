export type CatalogService = "game-pass" | "playstation-plus" | "ea-play";
export type CatalogStatus = "entrou" | "saindo" | "disponivel";

export type CatalogMovement = {
  id: string;
  title: string;
  service: CatalogService;
  status: CatalogStatus;
  platforms: string;
  date: string;
  summary: string;
  gameId?: string;
};

export const catalogMovements: CatalogMovement[] = [
  {
    id: "game-pass-clair-obscur",
    title: "Clair Obscur: Expedition 33",
    service: "game-pass",
    status: "entrou",
    platforms: "Xbox Series X|S e PC",
    date: "Nova entrada · cenário demonstrativo",
    summary:
      "Um RPG por turnos com comandos em tempo real entra como destaque para campanhas focadas em narrativa.",
    gameId: "clair-obscur",
  },
  {
    id: "game-pass-starfield",
    title: "Starfield",
    service: "game-pass",
    status: "saindo",
    platforms: "Xbox Series X|S e PC",
    date: "Saída em breve · cenário demonstrativo",
    summary:
      "Última janela editorial para explorar a campanha espacial pelo serviço antes de uma possível mudança de catálogo.",
    gameId: "starfield",
  },
  {
    id: "game-pass-forza-horizon-5",
    title: "Forza Horizon 5",
    service: "game-pass",
    status: "disponivel",
    platforms: "Xbox Series X|S, Xbox One e PC",
    date: "Disponível agora · cenário demonstrativo",
    summary:
      "O festival de corrida continua como uma opção acessível para jogar sozinho ou em grupo.",
    gameId: "forza-horizon-5",
  },
  {
    id: "ps-plus-resident-evil-4",
    title: "Resident Evil 4",
    service: "playstation-plus",
    status: "entrou",
    platforms: "PlayStation 5 e PlayStation 4",
    date: "Nova entrada · cenário demonstrativo",
    summary:
      "A releitura da missão de Leon chega ao radar de quem procura ação, tensão e uma campanha rejogável.",
    gameId: "resident-evil-4",
  },
  {
    id: "ps-plus-gta-v",
    title: "Grand Theft Auto V",
    service: "playstation-plus",
    status: "saindo",
    platforms: "PlayStation 5 e PlayStation 4",
    date: "Saída em breve · cenário demonstrativo",
    summary:
      "Uma janela de atenção para visitar Los Santos antes da próxima rotação editorial do catálogo.",
  },
  {
    id: "ps-plus-god-of-war",
    title: "God of War",
    service: "playstation-plus",
    status: "disponivel",
    platforms: "PlayStation 5 e PlayStation 4",
    date: "Disponível agora · cenário demonstrativo",
    summary:
      "O ponto recomendado para entrar na fase nórdica permanece no radar do serviço.",
    gameId: "god-of-war",
  },
  {
    id: "ea-play-jedi-survivor",
    title: "Star Wars Jedi: Survivor",
    service: "ea-play",
    status: "entrou",
    platforms: "PlayStation 5, Xbox Series X|S e PC",
    date: "Nova entrada · cenário demonstrativo",
    summary:
      "A jornada de Cal Kestis amplia o espaço de aventuras cinematográficas no serviço.",
  },
  {
    id: "ea-play-fc-26",
    title: "EA Sports FC 26",
    service: "ea-play",
    status: "saindo",
    platforms: "Múltiplas plataformas",
    date: "Teste saindo · cenário demonstrativo",
    summary:
      "O período editorial de acesso está perto do fim para quem ainda quer experimentar os novos modos.",
  },
  {
    id: "ea-play-it-takes-two",
    title: "It Takes Two",
    service: "ea-play",
    status: "disponivel",
    platforms: "PlayStation, Xbox e PC",
    date: "Disponível agora · cenário demonstrativo",
    summary:
      "Uma das experiências cooperativas mais inventivas continua pronta para duas pessoas.",
    gameId: "it-takes-two",
  },
];

export function filterCatalogMovements(
  movements: CatalogMovement[],
  service: "all" | CatalogService,
): CatalogMovement[] {
  return service === "all"
    ? movements
    : movements.filter((movement) => movement.service === service);
}
