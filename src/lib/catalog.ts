export type Game = {
  id: string;
  slug: string;
  title: string;
  genre: string;
  kicker: string;
  price: number;
  originalPrice: number;
  historicalLow: number;
  score: number;
  description: string;
  image: string;
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
    title: "Cyberpunk 2077",
    genre: "RPG · MUNDO ABERTO",
    kicker: "A CIDADE QUE NUNCA DORME.",
    price: 79.96,
    originalPrice: 199.9,
    historicalLow: 79.96,
    score: 86,
    description:
      "Night City ainda tem histórias para contar. Um RPG de mundo aberto sobre poder, identidade e o preço de se tornar uma lenda.",
    image: "/art/cyberpunk.png",
    color: "#b9aa35",
  },
  {
    id: "elden-ring",
    slug: "elden-ring",
    title: "Elden Ring",
    genre: "SOULSLIKE · AVENTURA",
    kicker: "MORRA. APRENDA. EXPLORE DE NOVO.",
    price: 149.94,
    originalPrice: 249.9,
    historicalLow: 124.95,
    score: 96,
    description:
      "Um mundo que recompensa sua curiosidade. Explore as Terras Intermédias, encontre seu caminho e enfrente o desconhecido.",
    image: "/art/elden-ring.png",
    color: "#6b8159",
  },
  {
    id: "hades",
    slug: "hades-ii",
    title: "Hades II",
    genre: "ROGUELIKE · AÇÃO",
    kicker: "SÓ MAIS UMA TENTATIVA.",
    price: 73.99,
    originalPrice: 109.99,
    historicalLow: 73.99,
    score: 94,
    description:
      "Mais uma noite. Mais uma tentativa. Feitiçaria, deuses e combates precisos em uma jornada pelas profundezas do submundo.",
    image: "/art/hades.jpg",
    color: "#7476a2",
  },
  {
    id: "hollow-knight",
    slug: "hollow-knight",
    title: "Hollow Knight",
    genre: "METROIDVANIA · INDIE",
    kicker: "PEQUENO ESTÚDIO. UNIVERSO GIGANTE.",
    price: 23.49,
    originalPrice: 46.99,
    historicalLow: 23.49,
    score: 90,
    description:
      "Desça a um reino esquecido. Um universo desenhado à mão, cheio de segredos, personagens singulares e desafios memoráveis.",
    image: "/art/hollow-knight.png",
    color: "#6798a8",
  },
  {
    id: "starfield",
    slug: "starfield",
    title: "Starfield",
    genre: "RPG · EXPLORAÇÃO",
    kicker: "MENOS PRESSA. MAIS HORIZONTE.",
    price: 209.94,
    originalPrice: 349.9,
    historicalLow: 139.96,
    score: 69,
    description:
      "Uma viagem entre as estrelas. Neste cenário demonstrativo, a combinação de preço e avaliação recomenda priorizar outros jogos.",
    image: "/art/starfield.jpg",
    color: "#8d7966",
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
