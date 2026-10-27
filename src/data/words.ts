import type { Difficulty, GameCategory } from "@/types/game";

export type WordEntry = {
  word: string;
  hint: string;
};

type WordCategory = Exclude<GameCategory, "all">;

type WordDatabase = Record<WordCategory, Record<Difficulty, WordEntry[]>>;

export const WORDS: WordDatabase = {
  places: {
    easy: [
      { word: "Beach", hint: "Sunscreen" },
      { word: "Airport", hint: "Luggage" },
      { word: "Hospital", hint: "Doctor" },
      { word: "Library", hint: "Books" },
    ],
    medium: [
      { word: "Aquarium", hint: "Marine life" },
      { word: "Museum", hint: "Exhibits" },
      { word: "Lighthouse", hint: "Ships" },
    ],
    hard: [
      { word: "Monastery", hint: "Monks" },
      { word: "Observatory", hint: "Stars" },
      { word: "Amphitheater", hint: "Audience" },
    ],
  },

  food: {
    easy: [
      { word: "Pizza", hint: "Cheese" },
      { word: "Hamburger", hint: "Bun" },
      { word: "Pancakes", hint: "Syrup" },
    ],
    medium: [
      { word: "Sushi", hint: "Chopsticks" },
      { word: "Lasagna", hint: "Layers" },
      { word: "Dumplings", hint: "Filling" },
    ],
    hard: [
      { word: "Ratatouille", hint: "Vegetables" },
      { word: "Beef Wellington", hint: "Pastry" },
      { word: "Crème brûlée", hint: "Caramelized" },
    ],
  },

  people: {
    easy: [
      { word: "Doctor", hint: "Stethoscope" },
      { word: "Teacher", hint: "Classroom" },
      { word: "Chef", hint: "Kitchen" },
    ],
    medium: [
      { word: "Architect", hint: "Blueprints" },
      { word: "Photographer", hint: "Lens" },
      { word: "Detective", hint: "Clues" },
    ],
    hard: [
      { word: "Archaeologist", hint: "Artifacts" },
      { word: "Cartographer", hint: "Mapping" },
      { word: "Paleontologist", hint: "Fossils" },
    ],
  },

  animals: {
    easy: [
      { word: "Dog", hint: "Leash" },
      { word: "Penguin", hint: "Ice" },
      { word: "Shark", hint: "Ocean" },
      { word: "Elephant", hint: "Trunk" },
    ],
    medium: [
      { word: "Chameleon", hint: "Color" },
      { word: "Platypus", hint: "Bill" },
      { word: "Flamingo", hint: "Pink" },
    ],
    hard: [
      { word: "Axolotl", hint: "Regeneration" },
      { word: "Okapi", hint: "Stripes" },
      { word: "Narwhal", hint: "Tusk" },
    ],
  },

  objects: {
    easy: [
      { word: "Umbrella", hint: "Rain" },
      { word: "Backpack", hint: "School" },
      { word: "Mirror", hint: "Reflection" },
    ],
    medium: [
      { word: "Compass", hint: "Direction" },
      { word: "Hourglass", hint: "Sand" },
      { word: "Telescope", hint: "Magnification" },
    ],
    hard: [
      { word: "Kaleidoscope", hint: "Patterns" },
      { word: "Periscope", hint: "Submarine" },
      { word: "Metronome", hint: "Rhythm" },
    ],
  },

  technology: {
    easy: [
      { word: "Keyboard", hint: "Typing" },
      { word: "Smartphone", hint: "Apps" },
      { word: "Headphones", hint: "Music" },
    ],
    medium: [
      { word: "Microprocessor", hint: "Calculations" },
      { word: "Router", hint: "Network" },
      { word: "Projector", hint: "Screen" },
    ],
    hard: [
      { word: "Gyroscope", hint: "Orientation" },
      { word: "Oscilloscope", hint: "Waveforms" },
      { word: "Interferometer", hint: "Waves" },
    ],
  },
};
