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

export type PreviewHype = {
  score: number;
  momentum: "subindo" | "estavel" | "cauteloso";
  drivers: string[];
};

export type PreviewCommunityVideo = {
  title: string;
  channel: string;
  kind: "Análise" | "Gameplay" | "Notícia";
  youtubeId: string;
};

export type PreviewGame = {
  slug: string;
  title: string;
  summary: string;
  whyItMatters: string;
  deepDive: string[];
  hype: PreviewHype;
  genre: string[];
  platforms: string[];
  releaseWindow: string;
  informationStatus: PreviewInformationStatus;
  accent: string;
  heroImage: string;
  gallery: PreviewGalleryImage[];
  youtubeId: string | null;
  videoLabel: string;
  communityVideos: PreviewCommunityVideo[];
  officialFacts: PreviewFact[];
  rumors: PreviewRumor[];
  sources: PreviewSource[];
};

export type PreviewOrder = "curated" | "hype";

export type PreviewFilters = {
  query: string;
  platform: string;
  genre: string;
  status: PreviewInformationStatus | "all";
  order?: PreviewOrder;
};

const checkedAt = "19 de outubro de 2026";

type PreviewSeed = Omit<
  PreviewGame,
  | "heroImage"
  | "gallery"
  | "officialFacts"
  | "rumors"
  | "sources"
  | "communityVideos"
> & {
  publisher: string;
  sourceUrl: string;
  fact: string;
  videoPublisher?: string;
  imageVideoId?: string;
  rumors?: PreviewRumor[];
  extraSources?: PreviewSource[];
  communityVideos?: PreviewCommunityVideo[];
};

const momentumLabels = {
  subindo: "SUBINDO",
  estavel: "ESTÁVEL",
  cauteloso: "CAUTELOSO",
} as const;

export function getMomentumLabel(momentum: PreviewHype["momentum"]) {
  return momentumLabels[momentum];
}

export function getHypeLabel(score: number) {
  if (score >= 90) return "HYPE MÁXIMO";
  if (score >= 80) return "HYPE ALTO";
  if (score >= 65) return "HYPE MODERADO";
  return "EM OBSERVAÇÃO";
}

export function getCommunitySearchUrl(game: { title: string }) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${game.title} análise`,
  )}`;
}

function createPreview(seed: PreviewSeed): PreviewGame {
  const imageVideoId = seed.imageVideoId ?? seed.youtubeId ?? "QdBZY2fkU-0";
  const sourceId = `${seed.slug}-official`;
  const mediaSourceUrl = `https://www.youtube.com/watch?v=${imageVideoId}`;
  const videoPublisher = seed.videoPublisher ?? seed.publisher;
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
            label: `Trailer oficial no YouTube — ${videoPublisher}`,
            publisher: videoPublisher,
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
    deepDive: seed.deepDive,
    hype: seed.hype,
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
    communityVideos: seed.communityVideos ?? [],
    officialFacts: seed.fact ? [{ text: seed.fact, sourceId }] : [],
    rumors: seed.rumors ?? [],
    sources,
  };
}

export const previewGames: PreviewGame[] = [
  createPreview({
    slug: "grand-theft-auto-vi",
    deepDive: [
      "GTA VI leva a série de volta a Vice City, agora dentro do estado fictício de Leonida. A história acompanha Lucia e Jason, dois criminosos que se conhecem em circunstâncias adversas e passam a agir em dupla — uma estrutura de dois protagonistas que a Rockstar não usava desde a era PlayStation 2.",
      "O material oficial mostra um mundo aberto com densidade social incomum: praias, periferias, comércio local e vida noturna convivem com perseguições e assaltos. A proposta é responder ao comportamento do jogador em escala maior do que qualquer GTA anterior, com rotinas de NPCs e um mapa descrito pelo estúdio como o mais ambicioso que já construiu.",
      "A data de 19 de novembro de 2026 é oficial, mas o histórico da Rockstar pede cautela com prazos. O ponto de atenção segue sendo a versão de PC, ainda sem anúncio. Até o lançamento, o sinal a acompanhar é qualquer comunicado da Take-Two sobre janela, plataformas e planos pós-lançamento.",
    ],
    hype: {
      score: 98,
      momentum: "subindo",
      drivers: [
        "O lançamento mais aguardado da década em volume de conversa",
        "Dois protagonistas e um estado inteiro novo para explorar",
      ],
    },
    communityVideos: [
      {
        youtubeId: "3LnGb6-ly_k",
        title: "GTA 6 Trailer 2 Breakdown: Everything You MISSED!",
        channel: "TGG",
        kind: "Análise",
      },
      {
        youtubeId: "HS8ghU5Sn8o",
        title: "My Way Too In Depth Analysis Of The Second GTA:VI Trailer",
        channel: "Joshimuz",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "Phantom Blade Zero coloca o jogador no papel de Soul, um assassino de elite que acorda ferido e com o tempo contado depois de ser acusado por um crime que não cometeu. A premissa de vingança serve de motor para uma campanha de ação com forte identidade wuxia, gênero chinês de artes marciais fantásticas.",
      "O combate aposta em leitura rápida de movimentos, troca de armas incomuns e um ritmo de duelo cinematográfico. A S-GAME construiu a apresentação em torno de câmera próxima e golpes encadeados, uma escolha que afasta o projeto do RPG de ação tradicional e o aproxima de um filme de kung fu jogável.",
      "O título aparece em eventos com demos jogáveis desde 2024, mas segue sem data. O risco editorial é confundir uma fatia polida de demonstração com a escala de uma campanha completa; vale acompanhar relatos de mãos na obra e a confirmação de plataformas além de PlayStation 5 e PC.",
    ],
    hype: {
      score: 76,
      momentum: "subindo",
      drivers: [
        "Combate wuxia com apresentação de cinema",
        "Demos jogáveis bem recebidas pela comunidade de ação",
      ],
    },
    communityVideos: [
      {
        youtubeId: "XNV4F5HN2N4",
        title: "Phantom Blade Zero New Gameplay Analysis & Breakdown",
        channel: "Rurikhan",
        kind: "Análise",
      },
      {
        youtubeId: "oa9FELC7mg0",
        title: "I Played Phantom Blade Zero AGAIN - NEW GAMEPLAY Impressions",
        channel: "Fextralife",
        kind: "Gameplay",
      },
    ],
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
    deepDive: [
      "Marvel’s Wolverine é a aposta da Insomniac Games em uma aventura solo de Logan, sem dividir o palco com outros heróis. O estúdio conhecido por Marvel’s Spider-Man troca o balanço acrobático por um herói mais pesado, violento e movido por conflitos pessoais.",
      "O material divulgado até aqui é curto: um teaser de anúncio e um trailer de gameplay que apresenta combate direto com as garras. A expectativa é de uma campanha linear de ação e aventura, com narrativa em terceira pessoa e classificação indicativa alta, características que a Sony já associou ao projeto.",
      "O jogo está em desenvolvimento há anos e acumula idas e vindas de cronograma. Como não existe data oficial, o hype se sustenta mais na reputação do estúdio do que em informações concretas — um cenário em que qualquer trailer novo tende a mexer forte com a conversa.",
    ],
    hype: {
      score: 87,
      momentum: "subindo",
      drivers: [
        "Insomniac em um herói mais brutal e adulto",
        "Trailer de gameplay reacendeu a expectativa por data",
      ],
    },
    communityVideos: [
      {
        youtubeId: "hMhZhuYG4Ak",
        title: "MARVEL’S WOLVERINE TRAILER BREAKDOWN! Every Easter Egg You Missed!",
        channel: "New Rockstars",
        kind: "Análise",
      },
      {
        youtubeId: "J_vRQzdZ0Dw",
        title: "Marvel's Wolverine D23 Trailer Breakdown - ALL Details You MISSED!",
        channel: "Blitzwinger",
        kind: "Análise",
      },
    ],
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
    youtubeId: "s3pDMUWlA6I",
    videoLabel: "Trailer de gameplay",
    publisher: "PlayStation",
    sourceUrl: "https://www.playstation.com/",
    fact: "Marvel’s Wolverine está em desenvolvimento pela Insomniac Games para PlayStation 5.",
  }),
  createPreview({
    slug: "the-witcher-iv",
    deepDive: [
      "The Witcher IV abre uma nova saga com Ciri no centro da história. O trailer cinematográfico apresentado no The Game Awards mostra a personagem como bruxa em um mundo que ainda desconfia dela, trocando a figura de Geralt por uma protagonista que já conhece as consequências das escolhas da trilogia anterior.",
      "A CD Projekt Red promete um RPG de mundo aberto maior e mais reativo, desenvolvido em Unreal Engine 5. A produtora já exibiu uma demonstração técnica rodando em PlayStation 5, mas deixou claro que aquele material não representa o jogo final — um detalhe importante para calibrar expectativas de gráficos e desempenho.",
      "Não há janela de lançamento. O histórico recente do estúdio, marcado pelo longo desenvolvimento de Cyberpunk 2077 e pelo esforço de recuperação do jogo, explica por que a comunidade acompanha cada comunicado com atenção. O sinal decisivo será a primeira demonstração de gameplay de fato.",
    ],
    hype: {
      score: 93,
      momentum: "estavel",
      drivers: [
        "Ciri como protagonista de uma nova saga",
        "Tecnologia de Unreal Engine 5 e promessa de mundo maior",
      ],
    },
    communityVideos: [
      {
        youtubeId: "ZvPKpv2co8I",
        title: "Witcher 4 Trailer Breakdown and Analysis: Ciri Protagonist Implications",
        channel: "WitcherGeorge",
        kind: "Análise",
      },
      {
        youtubeId: "dmGzyuAZ8Ug",
        title: "The Key Takeaways From The Witcher 4 Tech Demo",
        channel: "WitcherGeorge",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "Intergalactic: The Heretic Prophet é a primeira propriedade inédita da Naughty Dog desde The Last of Us. Jordan A. Mun, uma caçadora de recompensas, fica presa em Sempiria, um planeta distante que se tornou o centro de uma religião e desapareceu dos mapas por séculos.",
      "A direção de arte mistura ficção científica retrô, tecnologia analógica e uma estética inspirada nos anos 1980. Até agora, porém, tudo o que o público viu é cinematográfico: não houve demonstração de gameplay, então combate, exploração e estrutura de missões continuam no campo da especulação.",
      "O estúdio passa por um momento de reestruturação, e o jogo não tem janela definida. O hype é alto porque carrega a assinatura narrativa da Naughty Dog, mas o sinal a observar é simples: o primeiro trailer que mostre o controle nas mãos do jogador.",
    ],
    hype: {
      score: 89,
      momentum: "subindo",
      drivers: [
        "Primeira IP nova da Naughty Dog em mais de uma década",
        "Ficção científica retrô com assinatura narrativa do estúdio",
      ],
    },
    communityVideos: [
      {
        youtubeId: "gmH7VShQ5W8",
        title: "Intergalactic: The Heretic Prophet TRAILER BREAKDOWN (Naughty Dog)",
        channel: "DomTheBomb",
        kind: "Análise",
      },
      {
        youtubeId: "BAUYf2v25xU",
        title: "Intergalactic The Heretic Prophet Story Details And Trailer Breakdown",
        channel: "Luke Stephens LIVE",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "Fable é o retorno de Albion em uma nova linha do tempo, desta vez sob responsabilidade da Playground Games, estúdio que ficou conhecido pela série Forza Horizon. O tom segue britânico e irônico, com um herói que começa pequeno e cresce em fama conforme as escolhas do jogador.",
      "Os trailers mais recentes mostram gameplay de ação em terceira pessoa, combate contra criaturas fantásticas e um mundo colorido que se afasta do realismo sombrio de outros RPGs de fantasia. A proposta é menos simulação e mais aventura de personalidade forte.",
      "A Microsoft adiou o projeto depois de anunciá-lo para uma janela inicial, e o estúdio segue sem data firme. O ponto de atenção é a distância entre o humor dos trailers e a profundidade de sistemas que os fãs da série original esperam encontrar no jogo final.",
    ],
    hype: {
      score: 84,
      momentum: "estavel",
      drivers: [
        "Volta de uma franquia clássica com humor britânico",
        "Primeiro RPG da Playground Games depois de Forza Horizon",
      ],
    },
    communityVideos: [
      {
        youtubeId: "JxH0jSibaKM",
        title: "Fable Xbox Showcase Trailer Deep Dive & Things You Missed!",
        channel: "Sleviin",
        kind: "Análise",
      },
      {
        youtubeId: "pBKLicKTC-M",
        title: "Fable Deep Dive & Things You Missed!",
        channel: "Sleviin",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "Gears of War: E-Day volta catorze anos antes dos eventos do primeiro jogo para mostrar o Dia da Emergência, o momento em que a humanidade perdeu o controle de Sera para os Locust. Marcus Fenix e Dom Santiago aparecem mais jovens, antes de se tornarem as figuras conhecidas da trilogia original.",
      "O anúncio foi feito com um trailer renderizado em tempo real na Unreal Engine 5, com foco em clima de horror e na escala da invasão. A promessa do estúdio é recuperar o peso e a tensão do primeiro Gears, deixando de lado a grandiosidade mais colorida das sequências.",
      "Ainda não há data nem demonstração de gameplay. A Coalition vem mantendo a franquia viva com atualizações e uma remasterização recente, mas E-Day é o teste real de interesse do público em uma nova campanha principal. O hype depende agora de mostrar combate, e não só cinemática.",
    ],
    hype: {
      score: 82,
      momentum: "subindo",
      drivers: [
        "Retorno às origens de Marcus e Dom",
        "Unreal Engine 5 com tom de horror e invasão em escala",
      ],
    },
    communityVideos: [
      {
        youtubeId: "tb6YIHGEqdg",
        title: "Gears of War E Day Story Trailer - LORE BREAKDOWN",
        channel: "King Abz",
        kind: "Análise",
      },
      {
        youtubeId: "YGuO04fsZrw",
        title: "Gears of War E Day Gameplay Trailer LORE BREAKDOWN!",
        channel: "King Abz",
        kind: "Análise",
      },
    ],
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
    youtubeId: "EC20gLfUHeA",
    videoLabel: "Trailer de anúncio",
    publisher: "Xbox",
    sourceUrl: "https://www.xbox.com/",
    fact: "E-Day acompanha Marcus e Dom durante o Dia da Emergência.",
  }),
  createPreview({
    slug: "state-of-decay-3",
    deepDive: [
      "State of Decay 3 mantém a fórmula de simulação de comunidade em um apocalipse zumbi: cada sobrevivente tem habilidades próprias, recursos são escassos e a morte é permanente. A diferença prometida é de escala e de cooperação, com um mundo maior e mais reativo.",
      "O estúdio Undead Labs trabalha com a ideia de que a base é a protagonista. Em vez de heróis invencíveis, o jogador administra conflitos, abrigos e expedições arriscadas — uma estrutura que ganha outra dimensão quando outras pessoas participam da mesma comunidade.",
      "O projeto foi anunciado em 2020 e passou por mudanças internas no estúdio desde então. Não há data, e a comunidade ainda espera uma demonstração de jogo real. O hype é moderado justamente porque a franquia tem público fiel, mas pouca informação nova para sustentar expectativa alta.",
    ],
    hype: {
      score: 64,
      momentum: "cauteloso",
      drivers: [
        "Sobrevivência cooperativa com morte permanente",
        "Longo silêncio desde o anúncio de 2020",
      ],
    },
    communityVideos: [
      {
        youtubeId: "j-HokHnzxZU",
        title: "State Of Decay 3 Trailer Analysis And Breakdown",
        channel: "Brian Menard",
        kind: "Análise",
      },
      {
        youtubeId: "mB9N8nr3UTg",
        title: "State Of Decay 3 Trailer Breakdown By Someone Whos Played It...",
        channel: "Brian Menard",
        kind: "Análise",
      },
    ],
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
    youtubeId: "J4irGDddl04",
    videoLabel: "Gameplay reveal oficial",
    videoPublisher: "GameSpot",
    publisher: "Xbox",
    sourceUrl: "https://www.xbox.com/",
    fact: "State of Decay 3 mantém a construção de comunidades em um mundo tomado por mortos-vivos.",
  }),
  createPreview({
    slug: "marvels-blade",
    deepDive: [
      "Marvel’s Blade coloca o caçador de vampiros em Paris para uma aventura solo da Arkane Lyon. O anúncio foi feito com um trailer cinematográfico que apresenta um Blade mais velho, cansado e cercado por uma cidade que prefere ignorar o que acontece à noite.",
      "A escolha do estúdio não é aleatória: a Arkane construiu sua reputação com níveis densos e sistemas que reagem às decisões do jogador. A promessa é aplicar essa lógica a uma cidade aberta em miniatura, onde descobrir rotas e usar o ambiente importa tanto quanto o combate.",
      "O projeto foi anunciado em 2023 e ainda não mostrou gameplay. O hype é estável, sustentado pela combinação de personagem popular com um estúdio de design respeitado — e limitado pela ausência de qualquer material prático desde então.",
    ],
    hype: {
      score: 72,
      momentum: "estavel",
      drivers: [
        "Arkane Lyon aplicada a um herói da Marvel",
        "Paris como cenário de caça a vampiros",
      ],
    },
    communityVideos: [
      {
        youtubeId: "75SgehgLfbg",
        title: "Marvel’s Blade Trailer COMPLETE Breakdown! 25+ NEW Gameplay & Story",
        channel: "Lunar Squadron",
        kind: "Análise",
      },
      {
        youtubeId: "3vemNAf6ufM",
        title: "Marvel's Blade Game Official Trailer Reaction & Breakdown",
        channel: "Sadot The Gamer",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "Kingdom Hearts IV abre o arco Lost Master com Sora em Quadratum, uma cidade de aparência realista que funciona como um mundo paralelo. O trailer de anúncio mostra o protagonista acordando longe de Donald e Goofy, enquanto a série finalmente encara uma estética mais próxima do nosso mundo.",
      "A Square Enix promete manter o combate de ação com Keyblade, mas com produção em escala maior e um visual mais detalhado. A grande questão narrativa é como o novo arco vai acomodar anos de cronologia sem afastar quem nunca jogou a saga inteira.",
      "Não há data nem plataformas confirmadas além de “a confirmar”. O hype do público fiel continua alto, mas a franquia convive com expectativas difíceis de alinhar. O próximo trailer precisa mostrar gameplay e explicar o novo começo, não apenas alimentar mistérios.",
    ],
    hype: {
      score: 80,
      momentum: "estavel",
      drivers: [
        "Sora em Quadratum e o início do arco Lost Master",
        "Comunidade fiel aguardando notícias há anos",
      ],
    },
    communityVideos: [
      {
        youtubeId: "48EdKYqnlv4",
        title: "KINGDOM HEARTS 4 TRAILER BREAKDOWN | Scene By Scene",
        channel: "Podcast Now",
        kind: "Análise",
      },
      {
        youtubeId: "ce88CnGSIy0",
        title: "Breakdown: Kingdom Hearts 4 Trailer Analysis",
        channel: "Bio-Roxas",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "OD é o projeto de terror de Hideo Kojima em parceria com o Xbox Game Studios. O teaser apresentado no The Game Awards mostra Sophia Lillis em uma sequência de captura de performance, com Hunter Schafer e Udo Kier no elenco — um material que confunde intencionalmente atuação, tecnologia e jogo.",
      "Kojima descreve o projeto como uma experiência que só é possível com a computação em nuvem da Microsoft. A promessa é de um terror sobre o ato de jogar, usando a incerteza como mecanismo, e não apenas sustos roteirizados.",
      "As informações seguem escassas e o diretor também trabalha em Physint, outro projeto. Sem data e sem gameplay, OD é um caso de hype de autor: alto interesse pela assinatura de Kojima, baixa previsibilidade sobre o que o jogo realmente será.",
    ],
    hype: {
      score: 73,
      momentum: "estavel",
      drivers: [
        "Hideo Kojima em um terror experimental",
        "Elenco de Hollywood e uso de tecnologia em nuvem",
      ],
    },
    communityVideos: [
      {
        youtubeId: "xgWlIlQtPSA",
        title: "Hideo Kojima's OD Trailer Analysis | The Game Awards 2023",
        channel: "Cycu1",
        kind: "Análise",
      },
      {
        youtubeId: "aTcOhil7gFY",
        title: "Breaking Down Kojima’s OD – Knock Trailer (Hidden Clues?)",
        channel: "Luke Stephens CLIPS",
        kind: "Análise",
      },
    ],
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
    youtubeId: "Yi-5xTlWiiM",
    videoLabel: "Teaser oficial",
    publisher: "Kojima Productions",
    sourceUrl: "https://www.kojimaproductions.jp/",
    fact: "OD foi apresentado como uma colaboração entre Kojima Productions e Xbox Game Studios.",
  }),
  createPreview({
    slug: "judas",
    deepDive: [
      "Judas é o retorno de Ken Levine a um shooter narrativo em primeira pessoa. A protagonista dá nome ao jogo e tenta escapar de uma nave espacial em colapso, enquanto decide em quem confiar entre as lideranças que controlam a comunidade a bordo.",
      "A proposta central é a reatividade: personagens lembram decisões, alianças mudam e o ambiente responde ao que o jogador fez. É a continuação conceitual das ideias que Levine perseguiu em BioShock, agora com uma estrutura sistêmica mais explícita.",
      "O desenvolvimento é longo e o estúdio passou por reestruturações. Sem data e com pouco material recente, Judas carrega hype de nicho: quem gosta de narrativa emergente acompanha de perto, mas a ausência de novidades mantém o sinal em cautela.",
    ],
    hype: {
      score: 70,
      momentum: "cauteloso",
      drivers: [
        "Ken Levine de volta ao shooter narrativo",
        "Sistemas de confiança e reatividade no espaço",
      ],
    },
    communityVideos: [
      {
        youtubeId: "PGUmQU7yyCI",
        title: "Bioshock Creator's Next Game Looks CRAZY | JUDAS Trailer Breakdown + Analysis",
        channel: "Kanaju",
        kind: "Análise",
      },
      {
        youtubeId: "rYxF-Q2lU2U",
        title: "JUDAS Announcement Trailer ULTIMATE Breakdown, Analysis, and Speculation",
        channel: "Kanaju",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "Clockwork Revolution se passa em Avalon, uma metrópole steampunk governada por uma fundadora que reescreveu a própria história. O jogador descobre que a cidade próspera foi construída sobre o sofrimento de uma versão anterior do mundo e ganha um dispositivo capaz de viajar no tempo.",
      "A promessa da inXile é que as viagens tenham consequências visíveis: mudar um acontecimento no passado altera personagens, lugares e a configuração do presente. É um RPG em primeira pessoa com combate de armas e habilidades, mas o diferencial está na reatividade do cenário.",
      "O estúdio tem histórico com RPGs densos, como Wasteland 3, e o jogo aparece em eventos desde 2023 sem data. O hype é moderado porque o conceito é forte, mas ainda falta ver se a escala das mudanças temporais sobrevive à execução.",
    ],
    hype: {
      score: 66,
      momentum: "estavel",
      drivers: [
        "Viagem no tempo com consequências no mundo",
        "RPG em primeira pessoa da inXile",
      ],
    },
    communityVideos: [
      {
        youtubeId: "CXB1yOH39l4",
        title: "Clockwork Revolution: The RPG That Finally Makes Choices Matter",
        channel: "Messy Dev",
        kind: "Análise",
      },
      {
        youtubeId: "Nz1AMkwfH4E",
        title: "Clockwork Revolution - \"The Heist\" Official Trailer | Full Breakdown & Analysis",
        channel: "XpectoGO",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "Light No Fire é a tentativa da Hello Games de aplicar a tecnologia procedural de No Man’s Sky a um único planeta do tamanho da Terra. O cenário é de fantasia, com montanhas, oceanos, criaturas e civilizações que dividem o mesmo mundo entre todos os jogadores.",
      "A proposta é exploração compartilhada em escala planetária: construir, sobreviver e encontrar outras pessoas sem telas de carregamento. O estúdio descreve o projeto como um mundo único e persistente, em vez de uma galáxia de planetas visitáveis.",
      "O anúncio é de 2023 e não há data. A Hello Games reconstruiu a reputação de No Man’s Sky com anos de atualizações gratuitas, o que sustenta boa vontade, mas também cria a expectativa de que Light No Fire chegue mais completo do que o antecessor no lançamento.",
    ],
    hype: {
      score: 74,
      momentum: "estavel",
      drivers: [
        "Um planeta inteiro procedural compartilhado",
        "Boa vontade acumulada por No Man’s Sky",
      ],
    },
    communityVideos: [
      {
        youtubeId: "ZcVVcWv2Q-o",
        title: "Light No Fire, a new game from Hello games! Trailer breakdown!",
        channel: "Cobra TV",
        kind: "Análise",
      },
      {
        youtubeId: "04qkECHTEt4",
        title: "This is a LIGHT NO FIRE Channel Now (Trailer Breakdown)",
        channel: "Kanaju",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "Exodus é um RPG de ficção científica da Archetype Entertainment, estúdio formado por veteranos de BioWare. A história segue os Travelers, humanos que viajam entre estrelas e enfrentam a dilatação temporal: cada missão pode custar décadas para quem fica para trás.",
      "Essa mecânica é também o coração narrativo. Voltar para casa significa encontrar gerações inteiras transformadas pelas consequências das escolhas do jogador, o que dá peso a decisões que em outros RPGs seriam apenas diálogos.",
      "O projeto tem material cinematográfico com participação de Matthew McConaughey e um sistema de combate ainda pouco demonstrado. Sem data, o hype depende de convencer que a promessa temporal se traduz em jogabilidade, e não só em trailers caros.",
    ],
    hype: {
      score: 68,
      momentum: "estavel",
      drivers: [
        "Dilatação temporal como consequência narrativa",
        "Veteranos de BioWare em um novo RPG espacial",
      ],
    },
    communityVideos: [
      {
        youtubeId: "0NfDeFbx-Gc",
        title: "EXODUS - New Gameplay Trailer BREAKDOWN",
        channel: "MrHulthen",
        kind: "Análise",
      },
      {
        youtubeId: "4Mhigtdhzyg",
        title: "EXODUS Just Got Some Huge News - New Gameplay Trailer & Analysis",
        channel: "MrHulthen",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "The Elder Scrolls VI foi anunciado em 2018 com um teaser de paisagem e quase nenhuma informação desde então. A Bethesda confirmou que o projeto vem depois de Starfield, mas nunca revelou região, protagonista, sistemas ou plataformas.",
      "A expectativa se apoia no que a série representa: exploração livre, criação de personagem e um mundo que aceita longas distâncias sem missões obrigatórias. Qualquer indício de retorno a esse modelo é tratado pela comunidade como notícia grande.",
      "O hype segue altíssimo, mas o momento é de cautela: não há imagem nova há anos e a Bethesda trabalha com uma engine renovada. O sinal que realmente importa será o primeiro material in-engine mostrando o mundo e o combate.",
    ],
    hype: {
      score: 88,
      momentum: "cauteloso",
      drivers: [
        "Uma das franquias de RPG mais influentes de todos os tempos",
        "Silêncio quase total desde o teaser de 2018",
      ],
    },
    communityVideos: [
      {
        youtubeId: "pcWe33w7N98",
        title: "THE ELDER SCROLLS VI - TRAILER ANALYSIS & STORY SPECULATION",
        channel: "Skullzi TV",
        kind: "Análise",
      },
      {
        youtubeId: "NWk01FmJBHQ",
        title: "Elder Scrolls VI Teaser Trailer Analysis & Speculation",
        channel: "Wasteland Dovahkiin",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "O próximo Mass Effect segue sem título e sem janela, mas o teaser de 2020 deixou pistas claras: Liara T’Soni recolhe um fragmento da armadura N7, sugerindo continuidade com os eventos da trilogia original.",
      "A BioWare indicou que o projeto retoma a linha principal da franquia depois de Andromeda, em vez de iniciar um universo paralelo. Isso coloca sobre o jogo a tarefa delicada de lidar com escolhas acumuladas e com o legado de Shepard sem repetir o final polêmico de Mass Effect 3.",
      "O estúdio passou por reorganizações e mudanças de prioridade nos últimos anos, e o projeto segue sem material de gameplay. O hype existe pelo peso da marca, mas é contido pela incerteza sobre o tamanho real da produção.",
    ],
    hype: {
      score: 69,
      momentum: "cauteloso",
      drivers: [
        "Retorno à linha principal da trilogia",
        "Estúdio em reestruturação e silêncio sobre gameplay",
      ],
    },
    communityVideos: [
      {
        youtubeId: "-42ALGA2yH4",
        title: "The Next Mass Effect Official Teaser Trailer - Breakdown & My Thoughts",
        channel: "Fizhy",
        kind: "Análise",
      },
      {
        youtubeId: "s3NxW394Mno",
        title: "New Mass Effect Teaser - Hidden Details You Likely Missed",
        channel: "GamingBolt",
        kind: "Análise",
      },
    ],
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
    deepDive: [
      "Não existe anúncio oficial verificável de uma edição remasterizada de The Wolf Among Us. O título aparece neste radar como hipótese editorial: uma possível volta de Bigby Wolf ao formato narrativo da Telltale despertaria interesse, mas nenhuma fonte pública confirma o projeto.",
      "A Telltale chegou a anunciar uma continuação da série, e esse é o único fio concreto disponível. Qualquer material sobre a sequência é tratado aqui como contexto da franquia, nunca como prova de que um remaster esteja em produção.",
      "Para sair do campo do rumor, o registro precisaria de um anúncio oficial, de uma classificação indicativa ou de uma página de loja. Até lá, não publicamos vídeos da comunidade sobre o assunto para não transformar especulação em evidência.",
    ],
    hype: {
      score: 41,
      momentum: "cauteloso",
      drivers: [
        "Interesse afetivo pela série da Telltale",
        "Nenhuma evidência pública de remaster",
      ],
    },
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
  const matches = games.filter((game) => {
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

  if (filters.order === "hype") {
    return [...matches].sort(
      (first, second) =>
        second.hype.score - first.hype.score ||
        games.indexOf(first) - games.indexOf(second),
    );
  }

  return matches;
}
