import { WORDS } from "@/data/words";
import type { Difficulty, GameCategory } from "@/types/game";

const categories: Exclude<GameCategory, "all">[] = ["places", "food", "people", "animals", "objects", "technology"];

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

describe("WORD database", () => {
  it("contains every category", () => {
    for (const category of categories) {
      expect(WORDS[category]).toBeDefined();
    }
  });

  it("contains every difficulty for every category", () => {
    for (const category of categories) {
      for (const difficulty of difficulties) {
        expect(WORDS[category][difficulty]).toBeDefined();
      }
    }
  });

  it("contains at least 3 words for every category and difficulty", () => {
    for (const category of categories) {
      for (const difficulty of difficulties) {
        expect(WORDS[category][difficulty].length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("contains a word and hint for every entry", () => {
    for (const category of categories) {
      for (const difficulty of difficulties) {
        for (const entry of WORDS[category][difficulty]) {
          expect(entry.word.trim()).not.toBe("");
          expect(entry.hint.trim()).not.toBe("");
        }
      }
    }
  });
});
