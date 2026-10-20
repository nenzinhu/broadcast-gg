export type PreviewInformationStatus =
  | "confirmed"
  | "undated"
  | "strong-rumor"
  | "unconfirmed-rumor";

export type PreviewSource = {
  id: string;
  label: string;
  publisher: string;
  url: string;
  checkedAt: string;
  kind: "official" | "report";
};

export type PreviewFact = { text: string; sourceId: string };
export type PreviewRumor = {
  text: string;
  confidence: "alto" | "medio" | "baixo";
  sourceId: string;
};
export type PreviewGalleryImage = {
  src: string;
  alt: string;
  sourceUrl: string;
};

export type PreviewGame = {
  slug: string;
  title: string;
  summary: string;
  whyItMatters: string;
  genre: string[];
  platforms: string[];
  releaseWindow: string;
  informationStatus: PreviewInformationStatus;
  accent: string;
  heroImage: string;
  gallery: PreviewGalleryImage[];
  youtubeId: string | null;
  videoLabel: string;
  officialFacts: PreviewFact[];
  rumors: PreviewRumor[];
  sources: PreviewSource[];
};

export type PreviewFilters = {
  query: string;
  platform: string;
  genre: string;
  status: PreviewInformationStatus | "all";
};

const checkedAt = "19 de outubro de 2026";

type PreviewSeed = Omit<
  PreviewGame,
  "heroImage" | "gallery" | "officialFacts" | "rumors" | "sources"
> & {
  publisher: string;
  sourceUrl: string;
  fact: string;
  imageVideoId?: string;
  rumors?: PreviewRumor[];
  extraSources?: PreviewSource[];
};

function createPreview(seed: PreviewSeed): PreviewGame {
  const imageVideoId = seed.imageVideoId ?? seed.youtubeId ?? "QdBZY2fkU-0";
  const sourceId = `${seed.slug}-official`;
  const mediaSourceUrl = `https://www.youtube.com/watch?v=${imageVideoId}`;
  const sources: PreviewSource[] = [
    {
      id: sourceId,
      label: `Página oficial de ${seed.publisher}`,
      publisher: seed.publisher,
      url: seed.sourceUrl,
      checkedAt,
      kind: "official",
    },
    ...(seed.youtubeId
      ? [
          {
            id: `${seed.slug}-video`,
            label: `Trailer oficial no YouTube — ${seed.publisher}`,
            publisher: seed.publisher,
            url: `https://www.youtube.com/watch?v=${seed.youtubeId}`,
            checkedAt,
            kind: "official" as const,
          },
        ]
      : []),
    ...(seed.extraSources ?? []),
  ];

  return {
    slug: seed.slug,
    title: seed.title,
    summary: seed.summary,
    whyItMatters: seed.whyItMatters,
    genre: seed.genre,
    platforms: seed.platforms,
    releaseWindow: seed.releaseWindow,
    informationStatus: seed.informationStatus,
    accent: seed.accent,
    heroImage: `https://i.ytimg.com/vi/${imageVideoId}/maxresdefault.jpg`,
    gallery: [
      {
        src: `https://i.ytimg.com/vi/${imageVideoId}/hq1.jpg`,
        alt: `Primeiro quadro do trailer oficial de ${seed.title}`,
        sourceUrl: mediaSourceUrl,
      },
      {
        src: `https://i.ytimg.com/vi/${imageVideoId}/hq2.jpg`,
        alt: `Segundo quadro do trailer oficial de ${seed.title}`,
        sourceUrl: mediaSourceUrl,
      },
    ],
    youtubeId: seed.youtubeId,
    videoLabel: seed.videoLabel,
    officialFacts: seed.fact ? [{ text: seed.fact, sourceId }] : [],
    rumors: seed.rumors ?? [],
    sources,
  };
}

export const previewGames: PreviewGame[] = [
  createPreview({
    slug: "grand-theft-auto-vi",
    title: "Grand Theft Auto VI",
    summary:
      "Lucia e Jason atravessam o estado de Leonida em uma nova história criminal ambientada ao redor de Vice City.",
    whyItMatters:
      "É o próximo grande mundo aberto da Rockstar e um dos lançamentos com maior potencial para redefinir a geração.",
    genre: ["Ação", "Mundo aberto"],
    platforms: ["PlayStation 5", "Xbox Series X|S"],
    releaseWindow: "19 de novembro de 2026",
    informationStatus: "confirmed",
    accent: "#ff6fae",
    youtubeId: "VQRLujxTm3c",
    videoLabel: "Trailer oficial 2",
    publisher: "Rockstar Games",
    sourceUrl: "https://www.rockstargames.com/VI",
    fact: "A Rockstar apresenta Lucia e Jason como protagonistas de uma história ambientada em Leonida.",
  }),
  createPreview({
    slug: "phantom-blade-zero",
    title: "Phantom Blade Zero",
    summary:
      "Um RPG de ação wuxia com duelos velozes, armas incomuns e direção cinematográfica.",
    whyItMatters:
      "Seu combate combina leitura de movimentos e espetáculo sem abandonar a identidade visual chinesa.",
    genre: ["Ação", "RPG"],
    platforms: ["PlayStation 5", "PC"],
    releaseWindow: "Data a confirmar",
    informationStatus: "undated",
    accent: "#ef4c6d",
    youtubeId: "EZr1HXkEahs",
    videoLabel: "Trailer de gameplay",
    publisher: "S-GAME",
    sourceUrl: "https://www.playstation.com/pt-br/games/phantom-blade-zero/",
    fact: "O projeto foi apresentado para PlayStation 5 e PC com foco em combate de ação.",
  }),
  createPreview({
    slug: "marvels-wolverine",
    title: "Marvel’s Wolverine",
    summary:
      "A Insomniac leva Logan a uma aventura própria, com violência direta e narrativa centrada no personagem.",
    whyItMatters:
      "É a oportunidade de ver o estúdio de Marvel’s Spider-Man trabalhar com um herói mais brutal.",
    genre: ["Ação", "Aventura"],
    platforms: ["PlayStation 5"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#ffd348",
    youtubeId: "Zcj9AzHv_l8",
    videoLabel: "Teaser de anúncio",
    publisher: "PlayStation",
    sourceUrl: "https://www.playstation.com/",
    fact: "Marvel’s Wolverine está em desenvolvimento pela Insomniac Games para PlayStation 5.",
  }),
  createPreview({
    slug: "the-witcher-iv",
    title: "The Witcher IV",
    summary:
      "Ciri assume o centro de uma nova saga de fantasia sombria produzida pela CD Projekt Red.",
    whyItMatters:
      "A mudança de protagonista abre uma nova fase para uma das séries mais influentes dos RPGs modernos.",
    genre: ["RPG", "Mundo aberto"],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#d9e6ef",
    youtubeId: "54dabgZJ5YA",
    videoLabel: "Trailer cinematográfico",
    publisher: "CD Projekt Red",
    sourceUrl: "https://www.thewitcher.com/",
    fact: "Ciri foi apresentada como protagonista da nova saga de The Witcher.",
  }),
  createPreview({
    slug: "intergalactic-the-heretic-prophet",
    title: "Intergalactic: The Heretic Prophet",
    summary:
      "Uma caçadora de recompensas fica presa em um planeta remoto no novo universo da Naughty Dog.",
    whyItMatters:
      "É a primeira propriedade inédita do estúdio em anos e troca o pós-apocalipse por ficção científica.",
    genre: ["Ação", "Ficção científica"],
    platforms: ["PlayStation 5"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#f49b4b",
    youtubeId: "VLGy63pt9vA",
    videoLabel: "Trailer de anúncio",
    publisher: "Naughty Dog",
    sourceUrl: "https://www.naughtydog.com/",
    fact: "A Naughty Dog apresentou Jordan A. Mun como protagonista de seu novo universo.",
  }),
  createPreview({
    slug: "fable",
    title: "Fable",
    summary:
      "Albion retorna com humor britânico, criaturas fantásticas e escolhas em um novo RPG da Playground Games.",
    whyItMatters:
      "O projeto tenta recuperar a personalidade de Fable com a escala técnica de uma produção atual.",
    genre: ["RPG", "Aventura"],
    platforms: ["PC", "Xbox Series X|S"],
    releaseWindow: "Janela oficial a confirmar",
    informationStatus: "undated",
    accent: "#8dd66b",
    youtubeId: "PEQRwpMYPaw",
    videoLabel: "Trailer oficial",
    publisher: "Xbox",
    sourceUrl: "https://www.xbox.com/",
    fact: "Fable é desenvolvido pela Playground Games para PC e Xbox Series X|S.",
  }),
  createPreview({
    slug: "gears-of-war-e-day",
    title: "Gears of War: E-Day",
    summary:
      "Marcus Fenix e Dom Santiago enfrentam os primeiros ataques Locust em uma história de origem.",
    whyItMatters:
      "A série retorna ao peso, ao horror e à amizade que definiram seu início.",
    genre: ["Ação", "Tiro"],
    platforms: ["PC", "Xbox Series X|S"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#ff704f",
    youtubeId: "ECMYB03VR9k",
    videoLabel: "Trailer de anúncio",
    publisher: "Xbox",
    sourceUrl: "https://www.xbox.com/",
    fact: "E-Day acompanha Marcus e Dom durante o Dia da Emergência.",
  }),
  createPreview({
    slug: "state-of-decay-3",
    title: "State of Decay 3",
    summary:
      "Sobrevivência cooperativa, comunidades e escolhas difíceis retornam em uma escala maior.",
    whyItMatters:
      "A continuação pode transformar o simulador de comunidade zumbi em uma experiência cooperativa mais profunda.",
    genre: ["Sobrevivência", "Ação"],
    platforms: ["PC", "Xbox Series X|S"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#9fc2a3",
    youtubeId: "y6uK5C8JDJQ",
    videoLabel: "Trailer oficial",
    publisher: "Xbox",
    sourceUrl: "https://www.xbox.com/",
    fact: "State of Decay 3 mantém a construção de comunidades em um mundo tomado por mortos-vivos.",
  }),
  createPreview({
    slug: "marvels-blade",
    title: "Marvel’s Blade",
    summary:
      "Blade caça vampiros em Paris em uma aventura da Arkane Lyon.",
    whyItMatters:
      "O personagem combina com o design de espaços e sistemas pelo qual a Arkane se tornou conhecida.",
    genre: ["Ação", "Aventura"],
    platforms: ["PC", "Xbox Series X|S"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#dc2f55",
    youtubeId: "basLDO2bj2k",
    videoLabel: "Trailer de anúncio",
    publisher: "Bethesda",
    sourceUrl: "https://bethesda.net/",
    fact: "Marvel’s Blade é desenvolvido pela Arkane Lyon e ambientado em Paris.",
  }),
  createPreview({
    slug: "kingdom-hearts-iv",
    title: "Kingdom Hearts IV",
    summary:
      "Sora desperta em Quadratum e inicia o arco Lost Master em um mundo de aparência mais realista.",
    whyItMatters:
      "O novo arco pode tornar a longa cronologia da série mais acessível sem abandonar seus mistérios.",
    genre: ["RPG", "Ação"],
    platforms: ["Plataformas a confirmar"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#82c8ff",
    youtubeId: "j2DSEkYFRh8",
    videoLabel: "Trailer de anúncio",
    publisher: "Square Enix",
    sourceUrl: "https://www.kingdomhearts.com/",
    fact: "Kingdom Hearts IV inicia o arco Lost Master e apresenta Quadratum.",
  }),
  createPreview({
    slug: "od",
    title: "OD",
    summary:
      "Hideo Kojima explora medo, performance e tecnologia em um projeto ainda cercado de mistério.",
    whyItMatters:
      "A colaboração com Xbox busca experimentar novas formas de interação em um terror pouco explicado.",
    genre: ["Terror", "Experimental"],
    platforms: ["Xbox Series X|S"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#ff5252",
    youtubeId: "yi-5xTnZL-A",
    videoLabel: "Teaser oficial",
    publisher: "Kojima Productions",
    sourceUrl: "https://www.kojimaproductions.jp/",
    fact: "OD foi apresentado como uma colaboração entre Kojima Productions e Xbox Game Studios.",
  }),
  createPreview({
    slug: "judas",
    title: "Judas",
    summary:
      "Uma sobrevivente tenta escapar de uma nave em colapso enquanto escolhe em quem confiar.",
    whyItMatters:
      "Ken Levine retorna a narrativas sistêmicas nas quais personagens reagem às decisões do jogador.",
    genre: ["Ação", "Ficção científica"],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#f2c14e",
    youtubeId: "hSrgezyVfF4",
    videoLabel: "Trailer oficial",
    publisher: "Ghost Story Games",
    sourceUrl: "https://www.judasthegame.com/",
    fact: "Judas é uma experiência narrativa em primeira pessoa desenvolvida pela Ghost Story Games.",
  }),
  createPreview({
    slug: "clockwork-revolution",
    title: "Clockwork Revolution",
    summary:
      "Um RPG em primeira pessoa no qual viagens no tempo alteram uma metrópole steampunk.",
    whyItMatters:
      "A inXile promete mudanças visíveis no mundo a partir das intervenções do jogador no passado.",
    genre: ["RPG", "Ação"],
    platforms: ["PC", "Xbox Series X|S"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#d89b5a",
    youtubeId: "DDFuhaYxeMU",
    videoLabel: "Trailer oficial",
    publisher: "Xbox",
    sourceUrl: "https://www.xbox.com/",
    fact: "Clockwork Revolution é um RPG em primeira pessoa da inXile Entertainment.",
  }),
  createPreview({
    slug: "light-no-fire",
    title: "Light No Fire",
    summary:
      "A Hello Games troca o espaço por um planeta fantástico do tamanho da Terra, feito para exploração coletiva.",
    whyItMatters:
      "O estúdio tenta aplicar anos de tecnologia procedural a um único mundo mais coeso.",
    genre: ["Sobrevivência", "Mundo aberto"],
    platforms: ["Plataformas a confirmar"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#ff8a4c",
    youtubeId: "jKQem4Z6ioQ",
    videoLabel: "Trailer de anúncio",
    publisher: "Hello Games",
    sourceUrl: "https://lightnofire.com/",
    fact: "Light No Fire é uma aventura multiplayer ambientada em um planeta procedural compartilhado.",
  }),
  createPreview({
    slug: "exodus",
    title: "Exodus",
    summary:
      "Viajantes interestelares enfrentam a dilatação temporal e as consequências de deixar gerações para trás.",
    whyItMatters:
      "O RPG transforma a passagem do tempo em uma consequência narrativa central para cada missão.",
    genre: ["RPG", "Ficção científica"],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#62d9ff",
    youtubeId: "WAKAZNQuLqw",
    videoLabel: "Trailer de anúncio",
    publisher: "Archetype Entertainment",
    sourceUrl: "https://www.exodusgame.com/",
    fact: "Exodus é um RPG de ficção científica no qual a dilatação temporal altera o mundo deixado para trás.",
  }),
  createPreview({
    slug: "the-elder-scrolls-vi",
    title: "The Elder Scrolls VI",
    summary:
      "A próxima jornada principal de The Elder Scrolls permanece em desenvolvimento e ainda guarda quase todos os detalhes.",
    whyItMatters:
      "Poucas séries carregam expectativas tão altas para exploração, liberdade e criação de personagens.",
    genre: ["RPG", "Mundo aberto"],
    platforms: ["Plataformas a confirmar"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#c9b17a",
    youtubeId: "OkFdqqyI8y4",
    videoLabel: "Teaser de anúncio",
    publisher: "Bethesda",
    sourceUrl: "https://bethesda.net/",
    fact: "A Bethesda anunciou que The Elder Scrolls VI está em desenvolvimento.",
  }),
  createPreview({
    slug: "next-mass-effect",
    title: "Próximo Mass Effect",
    summary:
      "A BioWare prepara uma nova história para sua ópera espacial, ainda sem título ou janela pública.",
    whyItMatters:
      "O retorno precisa reconciliar escolhas, personagens e expectativas acumuladas ao longo de toda a saga.",
    genre: ["RPG", "Ficção científica"],
    platforms: ["Plataformas a confirmar"],
    releaseWindow: "Sem data anunciada",
    informationStatus: "undated",
    accent: "#e84242",
    youtubeId: null,
    imageVideoId: "Lg-Ctg6k_Ao",
    videoLabel: "Vídeo oficial indisponível",
    publisher: "BioWare",
    sourceUrl: "https://www.ea.com/games/mass-effect",
    fact: "A BioWare mantém uma nova produção de Mass Effect em desenvolvimento.",
  }),
  createPreview({
    slug: "wolf-among-us-remastered",
    title: "The Wolf Among Us Remastered",
    summary:
      "Não existe anúncio oficial verificável de uma edição remasterizada; o título permanece apenas como hipótese no radar.",
    whyItMatters:
      "Uma eventual volta de Bigby Wolf despertaria interesse renovado, mas ainda não há evidência suficiente para tratá-la como projeto.",
    genre: ["Aventura", "Narrativo"],
    platforms: ["Plataformas a confirmar"],
    releaseWindow: "Rumor sem data",
    informationStatus: "unconfirmed-rumor",
    accent: "#d54aff",
    youtubeId: "UkXwW5H28m0",
    videoLabel: "Vídeo relacionado à série",
    publisher: "Telltale Games",
    sourceUrl: "https://www.telltale.com/",
    fact: "",
    rumors: [],
  }),
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleLowerCase("pt-BR");
}

export function getPreviewBySlug(slug: string | null): PreviewGame {
  return previewGames.find((game) => game.slug === slug) ?? previewGames[0];
}

export function filterPreviewGames(
  games: PreviewGame[],
  filters: PreviewFilters,
): PreviewGame[] {
  const query = normalize(filters.query);
  return games.filter((game) => {
    const searchable = normalize(
      [game.title, game.summary, ...game.genre, ...game.platforms].join(" "),
    );
    return (
      (!query || searchable.includes(query)) &&
      (!filters.platform || game.platforms.includes(filters.platform)) &&
      (!filters.genre || game.genre.includes(filters.genre)) &&
      (filters.status === "all" || game.informationStatus === filters.status)
    );
  });
}
