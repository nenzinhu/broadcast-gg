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
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
    heroImage:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/library_hero.jpg",
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
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
    heroImage:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/library_hero.jpg",
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
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg",
    heroImage:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/library_hero.jpg",
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
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg",
    heroImage:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/library_hero.jpg",
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
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/header.jpg",
    heroImage:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/library_hero.jpg",
    fallbackImage: "/art/starfield.svg",
    steamAppId: 1716740,
    youtubeId: "uMOPoAq5vIA",
    color: "#ffab7c",
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
