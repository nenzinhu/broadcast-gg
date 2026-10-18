export type PlayOrderClassification = "essencial" | "opcional";

export type PlayOrderEntry = {
  id: string;
  title: string;
  classification: PlayOrderClassification;
  note: string;
  gameId?: string;
};

export type FranchiseGuide = {
  id: "resident-evil" | "god-of-war" | "grand-theft-auto" | "the-witcher";
  name: string;
  continuity: string;
  startEntryId: string;
  entries: PlayOrderEntry[];
};

export const franchiseGuides: FranchiseGuide[] = [
  {
    id: "resident-evil",
    name: "Resident Evil",
    continuity:
      "Comece pelo primeiro incidente em Raccoon City e avance pelos capítulos que definem a história principal.",
    startEntryId: "resident-evil-1",
    entries: [
      {
        id: "resident-evil-1",
        title: "Resident Evil",
        classification: "essencial",
        note: "Apresenta a mansão, a Umbrella e o núcleo da série.",
      },
      {
        id: "resident-evil-2",
        title: "Resident Evil 2",
        classification: "essencial",
        note: "Expande o desastre para Raccoon City e acompanha Leon e Claire.",
      },
      {
        id: "resident-evil-3",
        title: "Resident Evil 3",
        classification: "opcional",
        note: "Mostra outro lado da queda da cidade e encerra a fuga de Jill.",
      },
      {
        id: "resident-evil-4",
        title: "Resident Evil 4",
        classification: "essencial",
        note: "Inicia uma nova fase de ação e acompanha outra missão de Leon.",
        gameId: "resident-evil-4",
      },
      {
        id: "resident-evil-7",
        title: "Resident Evil 7",
        classification: "essencial",
        note: "Recomeça em escala íntima com Ethan e uma nova ameaça.",
      },
      {
        id: "resident-evil-village",
        title: "Resident Evil Village",
        classification: "essencial",
        note: "Continua diretamente a jornada de Ethan.",
      },
    ],
  },
  {
    id: "god-of-war",
    name: "God of War",
    continuity:
      "A saga grega explica o passado de Kratos, mas a fase nórdica também funciona como um novo ponto de entrada.",
    startEntryId: "god-of-war-2018",
    entries: [
      {
        id: "god-of-war-2005",
        title: "God of War",
        classification: "opcional",
        note: "Mostra a origem da vingança de Kratos contra os deuses gregos.",
      },
      {
        id: "god-of-war-2",
        title: "God of War II",
        classification: "opcional",
        note: "Amplia o conflito com o Olimpo.",
      },
      {
        id: "god-of-war-3",
        title: "God of War III",
        classification: "opcional",
        note: "Conclui a fase grega em escala monumental.",
      },
      {
        id: "god-of-war-2018",
        title: "God of War (2018)",
        classification: "essencial",
        note: "Novo começo, nova mitologia e o centro emocional da fase atual.",
        gameId: "god-of-war",
      },
      {
        id: "god-of-war-ragnarok",
        title: "God of War Ragnarök",
        classification: "essencial",
        note: "Continua diretamente a viagem de Kratos e Atreus.",
      },
    ],
  },
  {
    id: "grand-theft-auto",
    name: "Grand Theft Auto",
    continuity:
      "Cada história funciona de forma independente. A ordem mostra a evolução da série, não uma cronologia obrigatória.",
    startEntryId: "gta-5",
    entries: [
      {
        id: "gta-3",
        title: "Grand Theft Auto III",
        classification: "opcional",
        note: "Define a fórmula moderna de mundo aberto da franquia.",
      },
      {
        id: "gta-vice-city",
        title: "Grand Theft Auto: Vice City",
        classification: "opcional",
        note: "Uma história independente marcada por atmosfera e estilo.",
      },
      {
        id: "gta-san-andreas",
        title: "Grand Theft Auto: San Andreas",
        classification: "essencial",
        note: "Amplia liberdade, progressão e escala do mapa.",
      },
      {
        id: "gta-4",
        title: "Grand Theft Auto IV",
        classification: "essencial",
        note: "Uma visão mais densa e dramática de Liberty City.",
      },
      {
        id: "gta-5",
        title: "Grand Theft Auto V",
        classification: "essencial",
        note: "O ponto mais acessível para entender o formato atual da série.",
      },
      {
        id: "gta-6",
        title: "Grand Theft Auto VI",
        classification: "opcional",
        note: "Próximo capítulo em Vice City e no estado de Leonida.",
      },
    ],
  },
  {
    id: "the-witcher",
    name: "The Witcher",
    continuity:
      "Os jogos compartilham personagens e consequências, mas o terceiro capítulo oferece contexto suficiente para começar.",
    startEntryId: "witcher-3",
    entries: [
      {
        id: "witcher-1",
        title: "The Witcher",
        classification: "opcional",
        note: "Apresenta Geralt nos jogos e estabelece conflitos importantes.",
      },
      {
        id: "witcher-2",
        title: "The Witcher 2: Assassins of Kings",
        classification: "opcional",
        note: "Aprofunda a política e as escolhas que cercam Geralt.",
      },
      {
        id: "witcher-3",
        title: "The Witcher 3: Wild Hunt",
        classification: "essencial",
        note: "O melhor ponto de entrada para a jornada de Ciri e a Caçada Selvagem.",
      },
    ],
  },
];
