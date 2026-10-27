export type Player = {
  id: number;
  name: string;
};

export type GameMode = "classic" | "chaos";

export type GameCategory = "all" | "places" | "food" | "people" | "animals" | "objects" | "technology";

export type HintMode = "none" | "related";

export type Difficulty = "easy" | "medium" | "hard";

export type GameSettings = {
  mode: GameMode;
  impostorCount: number;
  category: GameCategory;
  hintMode: HintMode;
  difficulty: Difficulty;
};
