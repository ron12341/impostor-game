import type { Difficulty, GameCategory } from "@/types/game";

import animals from "./animals.json";
import food from "./food.json";
import objects from "./objects.json";
import people from "./people.json";
import places from "./places.json";
import technology from "./technology.json";

export type WordEntry = {
  word: string;
  hint: string;
};

type WordCategory = Exclude<GameCategory, "all">;
type WordDatabase = Record<WordCategory, Record<Difficulty, WordEntry[]>>;

// The vocabulary is bundled with the app, so it works fully offline.
export const WORDS: WordDatabase = {
  places,
  food,
  people,
  animals,
  objects,
  technology,
};
