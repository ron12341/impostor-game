export type Player = {
  id: number;
  name: string;
};

export type GameMode = "classic" | "chaos";

export type GameCategory = "places" | "food" | "people" | "animals" | "objects" | "technology" | "fantasy" | "moviesAndTV" | "sports" | "videoGames";

export type HintMode = "none" | "related";

export type Difficulty = "easy" | "medium" | "hard";

export type GameSettings = {
  mode: GameMode;
  impostorCount: number;
  categories: GameCategory[];
  hintMode: HintMode;
  difficulties: Difficulty[];
};
