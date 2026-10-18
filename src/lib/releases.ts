export type ReleaseStatus = "confirmado" | "a-confirmar";

export type UpcomingRelease = {
  id: string;
  title: string;
  date: string;
  platforms: string;
  image: string;
  youtubeId: string;
  trailerLabel: string;
  status: ReleaseStatus;
  news: string;
  sourceLabel: string;
  sourceUrl: string;
  accent: string;
};

export const upcomingReleases: UpcomingRelease[] = [
  {
    id: "phantom-blade-zero",
    title: "Phantom Blade Zero",
    date: "29 de outubro de 2026 · data informada",
    platforms: "PS5 e PC",
    image: "https://i.ytimg.com/vi/EZr1HXkEahs/maxresdefault.jpg",
    youtubeId: "EZr1HXkEahs",
    trailerLabel: "Assistir trailer",
    status: "a-confirmar",
    news: "Um RPG de ação com combate veloz, estética wuxia e confrontos cinematográficos. A data permanece marcada como informação a confirmar até uma fonte oficial ser validada.",
    sourceLabel: "PlayStation",
    sourceUrl: "https://www.playstation.com/pt-br/games/phantom-blade-zero/",
    accent: "#ef4c6d",
  },
  {
    id: "wolf-among-us-remastered",
    title: "The Wolf Among Us Remastered",
    date: "29 de outubro de 2026 · não confirmada",
    platforms: "Múltiplas plataformas",
    image: "https://i.ytimg.com/vi/UkXwW5H28m0/maxresdefault.jpg",
    youtubeId: "UkXwW5H28m0",
    trailerLabel: "Ver vídeo relacionado",
    status: "a-confirmar",
    news: "Não há anúncio oficial verificável de uma edição remasterizada nesta curadoria. O vídeo disponível é relacionado à série e o card será atualizado quando houver confirmação da Telltale.",
    sourceLabel: "Telltale Games",
    sourceUrl: "https://www.telltale.com/the-wolf-among-us-2/",
    accent: "#d54aff",
  },
  {
    id: "grand-theft-auto-vi",
    title: "Grand Theft Auto VI",
    date: "19 de novembro de 2026",
    platforms: "PlayStation 5 e Xbox Series X|S",
    image: "https://i.ytimg.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    youtubeId: "QdBZY2fkU-0",
    trailerLabel: "Assistir trailer",
    status: "confirmado",
    news: "Vice City volta como parte do estado de Leonida. Lucia e Jason protagonizam a nova história da Rockstar em um mundo aberto construído para a geração atual.",
    sourceLabel: "Rockstar Games",
    sourceUrl: "https://www.rockstargames.com/VI",
    accent: "#ff7cb8",
  },
];
