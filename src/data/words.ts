import type { Difficulty, GameCategory } from "@/types/game";

export type WordEntry = {
  word: string;
  hint: string;
};

type WordCategory = Exclude<GameCategory, "all">;

type WordDatabase = Partial<Record<WordCategory, Partial<Record<Difficulty, WordEntry[]>>>>;

export const WORDS: WordDatabase = {
  places: {
    easy: [
      { word: "Beach", hint: "Sunscreen" },
      { word: "Airport", hint: "Luggage" },
      { word: "Hospital", hint: "Doctor" },
      { word: "Library", hint: "Books" },
    ],
  },

  food: {
    easy: [
      { word: "Pizza", hint: "Cheese" },
      { word: "Hamburger", hint: "Bun" },
      { word: "Pancakes", hint: "Syrup" },
    ],
    medium: [{ word: "Sushi", hint: "Chopsticks" }],
  },

  animals: {
    easy: [
      { word: "Dog", hint: "Leash" },
      { word: "Penguin", hint: "Ice" },
      { word: "Shark", hint: "Ocean" },
      { word: "Elephant", hint: "Trunk" },
    ],
    medium: [{ word: "Chameleon", hint: "Color" }],
  },

  people: {
    easy: [
      { word: "Doctor", hint: "Stethoscope" },
      { word: "Teacher", hint: "Classroom" },
      { word: "Chef", hint: "Kitchen" },
    ],
  },

  objects: {
    easy: [
      { word: "Umbrella", hint: "Rain" },
      { word: "Backpack", hint: "School" },
      { word: "Mirror", hint: "Reflection" },
    ],
  },

  technology: {
    easy: [
      { word: "Keyboard", hint: "Typing" },
      { word: "Smartphone", hint: "Apps" },
      { word: "Headphones", hint: "Music" },
    ],
  },
};
