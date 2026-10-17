export type Game = {
  id: string;
  slug: string;
  genres: string[];
  title: string;
  genre: string;
  price: number;
  originalPrice: number;
  historicalLow: number;
  score: number;
  description: string;
  image: string;
  heroImage: string;
  fallbackImage: string;
  steamAppId: number;
  youtubeId: string;
  color: string;
};
export type Signal = {
  id: string;
  gameId: string;
  type: "price" | "update" | "trend";
  title: string;
  description: string;
  time: string;
};
export const games: Game[] = [
  {
    id: "cyberpunk",
    slug: "cyberpunk-2077",
    genres: ["RPG", "Mundo aberto"],
    title: "Cyberpunk 2077",
    genre: "RPG · MUNDO ABERTO",
    price: 79.96,
    originalPrice: 199.9,
    historicalLow: 79.96,
    score: 86,
    description:
      "Night City ainda tem histórias para contar. Um RPG de mundo aberto sobre poder, identidade e o preço de se tornar uma lenda.",
    image: "/art/cyberpunk.png",
    heroImage: "/art/cyberpunk.png",
    fallbackImage: "/art/cyberpunk.svg",
    steamAppId: 1091500,
    youtubeId: "qIcTM8WXFjk",
    color: "#ffd23f",
  },
  {
    id: "elden-ring",
    slug: "elden-ring",
    genres: ["Soulslike", "Aventura"],
    title: "Elden Ring",
    genre: "SOULSLIKE · AVENTURA",
    price: 149.94,
    originalPrice: 249.9,
    historicalLow: 124.95,
    score: 96,
    description:
      "Um mundo que recompensa sua curiosidade. Explore as Terras Intermédias, encontre seu caminho e enfrente o desconhecido.",
    image: "/art/elden-ring.png",
    heroImage: "/art/elden-ring.png",
    fallbackImage: "/art/elden-ring.svg",
    steamAppId: 1245620,
    youtubeId: "E3Huy2cdih0",
    color: "#e0b96b",
  },
  {
    id: "hades",
    slug: "hades-ii",
    genres: ["Roguelike", "Ação"],
    title: "Hades II",
    genre: "ROGUELIKE · AÇÃO",
    price: 73.99,
    originalPrice: 109.99,
    historicalLow: 73.99,
    score: 94,
    description:
      "Mais uma noite. Mais uma tentativa. Feitiçaria, deuses e combates precisos em uma jornada pelas profundezas do submundo.",
    image: "/art/hades.jpg",
    heroImage: "/art/hades.jpg",
    fallbackImage: "/art/hades.svg",
    steamAppId: 1145350,
    youtubeId: "l-iHDj3EwdI",
    color: "#c69aff",
  },
  {
    id: "hollow-knight",
    slug: "hollow-knight",
    genres: ["Metroidvania", "Indie"],
    title: "Hollow Knight",
    genre: "METROIDVANIA · INDIE",
    price: 23.49,
    originalPrice: 46.99,
    historicalLow: 23.49,
    score: 90,
    description:
      "Desça a um reino esquecido. Um universo desenhado à mão, cheio de segredos, personagens singulares e desafios memoráveis.",
    image: "/art/hollow-knight.png",
    heroImage: "/art/hollow-knight.png",
    fallbackImage: "/art/hollow-knight.svg",
    steamAppId: 367520,
    youtubeId: "UAO2urG23S4",
    color: "#69c5ff",
  },
  {
    id: "starfield",
    slug: "starfield",
    genres: ["RPG", "Exploração"],
    title: "Starfield",
    genre: "RPG · EXPLORAÇÃO",
    price: 209.94,
    originalPrice: 349.9,
    historicalLow: 139.96,
    score: 69,
    description:
      "Uma viagem entre as estrelas. Neste cenário demonstrativo, a combinação de preço e avaliação recomenda priorizar outros jogos.",
    image: "/art/starfield.jpg",
    heroImage: "/art/starfield.jpg",
    fallbackImage: "/art/starfield.svg",
    steamAppId: 1716740,
    youtubeId: "uMOPoAq5vIA",
    color: "#ffab7c",
  },
  {
    id: "baldurs-gate-3",
    slug: "baldurs-gate-3",
    genres: ["RPG", "Mundo aberto"],
    title: "Baldur's Gate 3",
    genre: "RPG · MUNDO ABERTO",
    price: 199.0,
    originalPrice: 299.0,
    historicalLow: 149.0,
    score: 97,
    description:
      "Reúna seus companheiros e volte a Faerûn. Um RPG de escolhas profundas, consequências reais e um elenco memorável.",
    image: "/art/bg3.svg",
    heroImage: "/art/bg3.svg",
    fallbackImage: "/art/bg3.svg",
    steamAppId: 1086940,
    youtubeId: "762oFhLAR3w",
    color: "#8b5cf6",
  },
  {
    id: "resident-evil-4",
    slug: "resident-evil-4",
    genres: ["Survival Horror", "Ação"],
    title: "Resident Evil 4",
    genre: "SURVIVAL HORROR · AÇÃO",
    price: 89.99,
    originalPrice: 199.0,
    historicalLow: 69.99,
    score: 93,
    description:
      "Leon S. Kennedy retorna em uma missão de resgate que se torna um pesadelo de criaturas e cultos sombrios.",
    image: "/art/re4.svg",
    heroImage: "/art/re4.svg",
    fallbackImage: "/art/re4.svg",
    steamAppId: 1983930,
    youtubeId: "q3H-3__lWqQ",
    color: "#7f1d1d",
  },
  {
    id: "stardew-valley",
    slug: "stardew-valley",
    genres: ["Simulação", "Indie"],
    title: "Stardew Valley",
    genre: "SIMULAÇÃO · INDIE",
    price: 26.0,
    originalPrice: 52.0,
    historicalLow: 13.0,
    score: 91,
    description:
      "Herdou a fazenda do avô. Plante, pesque, mine e construa sua vida em um vale cheio de possibilidades.",
    image: "/art/stardew.svg",
    heroImage: "/art/stardew.svg",
    fallbackImage: "/art/stardew.svg",
    steamAppId: 413150,
    youtubeId: "vBjG9L3t8u0",
    color: "#15803d",
  },
  {
    id: "celeste",
    slug: "celeste",
    genres: ["Plataforma", "Indie"],
    title: "Celeste",
    genre: "PLATAFORMA · INDIE",
    price: 18.0,
    originalPrice: 38.0,
    historicalLow: 9.0,
    score: 94,
    description:
      "Suba a montanha Celeste em um desafio preciso de plataformas. Uma história sobre encarar seus próprios medos.",
    image: "/art/celeste.svg",
    heroImage: "/art/celeste.svg",
    fallbackImage: "/art/celeste.svg",
    steamAppId: 504230,
    youtubeId: "GDS5kRwRJdI",
    color: "#0891b2",
  },
  {
    id: "god-of-war",
    slug: "god-of-war",
    genres: ["Ação", "Aventura"],
    title: "God of War",
    genre: "AÇÃO · AVENTURA",
    price: 149.0,
    originalPrice: 249.0,
    historicalLow: 99.0,
    score: 95,
    description:
      "Kratos e Atreus viajam pelos Nove Reinos nórdicos. Uma jornada de pai e filho entre deuses e monstros.",
    image: "/art/godofwar.svg",
    heroImage: "/art/godofwar.svg",
    fallbackImage: "/art/godofwar.svg",
    steamAppId: 1593500,
    youtubeId: "Q5klTIV-E5k",
    color: "#f59e0b",
  },
  {
    id: "it-takes-two",
    slug: "it-takes-two",
    genres: ["Co-op", "Aventura"],
    title: "It Takes Two",
    genre: "CO-OP · AVENTURA",
    price: 99.0,
    originalPrice: 149.0,
    historicalLow: 49.0,
    score: 90,
    description:
      "May e Cody foram transformados em bonecos. Só trabalhando juntos eles conseguem voltar para casa.",
    image: "/art/it-takes-two.svg",
    heroImage: "/art/it-takes-two.svg",
    fallbackImage: "/art/it-takes-two.svg",
    steamAppId: 1490570,
    youtubeId: "o4yYZ5RtJSE",
    color: "#fb923c",
  },
  {
    id: "disco-elysium",
    slug: "disco-elysium",
    genres: ["RPG", "Narrativo"],
    title: "Disco Elysium",
    genre: "RPG · NARRATIVO",
    price: 42.0,
    originalPrice: 89.0,
    historicalLow: 21.0,
    score: 96,
    description:
      "Detetive com uma mente fragmentada. Resolva um assassinato em uma cidade onde cada pensamento tem voz própria.",
    image: "/art/disco-elysium.svg",
    heroImage: "/art/disco-elysium.svg",
    fallbackImage: "/art/disco-elysium.svg",
    steamAppId: 760410,
    youtubeId: "KnQpb8s4XfU",
    color: "#facc15",
  },
  {
    id: "outer-wilds",
    slug: "outer-wilds",
    genres: ["Exploração", "Espaço"],
    title: "Outer Wilds",
    genre: "EXPLORE · ESPAÇO",
    price: 67.0,
    originalPrice: 134.0,
    historicalLow: 33.0,
    score: 95,
    description:
      "Explore um sistema solar preso em um loop temporal de 22 minutos. Descubra o que aconteceu com os antigos.",
    image: "/art/outer-wilds.svg",
    heroImage: "/art/outer-wilds.svg",
    fallbackImage: "/art/outer-wilds.svg",
    steamAppId: 778620,
    youtubeId: "s0ML2BqY4gU",
    color: "#3b82f6",
  },
];
export const signals: Signal[] = [
  {
    id: "s1",
    gameId: "cyberpunk",
    type: "price",
    title: "Night City. Menor preço.",
    description:
      "Cyberpunk 2077 atingiu o menor preço do nosso cenário. Sua próxima grande história está no radar.",
    time: "HÁ 12 MIN",
  },
  {
    id: "s2",
    gameId: "elden-ring",
    type: "update",
    title: "Um novo motivo para voltar.",
    description:
      "Balanceamento, novas possibilidades e aquela vontade de explorar só mais um pouco.",
    time: "HÁ 38 MIN",
  },
  {
    id: "s3",
    gameId: "hades",
    type: "trend",
    title: "Só mais uma run.",
    description:
      "Hades II está entre os destaques da nossa seleção. O submundo nunca pareceu tão convidativo.",
    time: "HÁ 1 H",
  },
];
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export const discount = (game: Game) =>
  Math.round((1 - game.price / game.originalPrice) * 100);

export const getGameBySlug = (slug: string): Game | undefined =>
  games.find((game) => game.slug === slug);
