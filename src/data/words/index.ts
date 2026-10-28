import type { GameCategory, WordDifficulty } from "@/types/game";

import animals from "./animals.json";
import fantasy from "./fantasy.json";
import food from "./food.json";
import moviesAndTV from "./moviesAndTV.json";
import objects from "./objects.json";
import people from "./people.json";
import places from "./places.json";
import sports from "./sports.json";
import technology from "./technology.json";
import videoGames from "./videoGames.json";

export type WordEntry = {
  word: string;
  hint: string;
};

type WordCategory = Exclude<GameCategory, "all">;
type WordDatabase = Record<WordCategory, Record<WordDifficulty, WordEntry[]>>;

// The vocabulary is bundled with the app, so it works fully offline.
export const WORDS: WordDatabase = {
  places,
  food,
  people,
  animals,
  objects,
  technology,
  fantasy,
  moviesAndTV,
  sports,
  videoGames,
};
