import type { GameCategory, WordDifficulty } from "@/types/game";

import animals from "./words/animals.json";
import food from "./words/food.json";
import objects from "./words/objects.json";
import people from "./words/people.json";
import places from "./words/places.json";
import technology from "./words/technology.json";

export type WordEntry = {
  word: string;
  hint: string;
};

type WordCategory = Exclude<GameCategory, "all">;

type WordDatabase = Record<WordCategory, Record<WordDifficulty, WordEntry[]>>;

export const WORDS: WordDatabase = {
  places,
  food,
  people,
  animals,
  objects,
  technology,
};
