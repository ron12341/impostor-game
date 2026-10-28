export type Player = {
  id: number;
  name: string;
};

export type GameMode = "classic" | "chaos";

export type GameCategory = "all" | "places" | "food" | "people" | "animals" | "objects" | "technology" | "fantasy" | "moviesAndTV" | "sports" | "videoGames";

export type HintMode = "none" | "related";

export type WordDifficulty = "easy" | "medium" | "hard";

export type Difficulty = "any" | WordDifficulty;

export type GameSettings = {
  mode: GameMode;
  impostorCount: number;
  category: GameCategory;
  hintMode: HintMode;
  difficulty: Difficulty;
};
