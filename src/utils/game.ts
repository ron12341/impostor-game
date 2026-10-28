import { WORDS, type WordEntry } from "@/data/words";
import type { Difficulty, GameCategory, GameSettings, Player, WordDifficulty } from "@/types/game";
import { randomItem, randomItems } from "@/utils/random";

export type InitializedPlayer = {
  playerId: number;
  name: string;
  isImpostor: boolean;
  word: string | null;
  hint: string | null;
};

export type GameRound = {
  word: WordEntry;
  players: InitializedPlayer[];
};

function getAvailableWords(category: GameCategory, difficulty: Difficulty): WordEntry[] {
  const diff: WordDifficulty = difficulty === "any" ? randomItem<WordDifficulty>(["easy", "medium", "hard"]) : difficulty;

  if (category === "all") {
    return Object.values(WORDS).flatMap((categoryWords) => categoryWords[diff] ?? []);
  }

  return WORDS[category]?.[diff] ?? [];
}

export function initializeGame(players: Player[], settings: GameSettings): GameRound {
  // Validate player count.
  if (players.length < 3) {
    throw new Error("At least 3 players are required to start a game.");
  }

  if (players.length > 12) {
    throw new Error("A maximum of 12 players is allowed.");
  }

  // Validate player names.
  if (players.some((player) => !player.name.trim())) {
    throw new Error("Every player must have a name.");
  }

  // Validate unique player IDs.
  const playerIds = new Set(players.map((player) => player.id));

  if (playerIds.size !== players.length) {
    throw new Error("Every player must have a unique ID.");
  }

  // Validate impostor count.
  const maxImpostorCount = Math.floor((players.length - 1) / 2);

  if (!Number.isInteger(settings.impostorCount) || settings.impostorCount < 1 || settings.impostorCount > maxImpostorCount) {
    throw new Error(`Choose between 1 and ${maxImpostorCount} impostors.`);
  }

  // Chaos mode has not been implemented yet.
  if (settings.mode !== "classic") {
    throw new Error("Chaos mode is not available yet. Please select Classic mode.");
  }

  // Get words matching the selected category and difficulty.
  const availableWords = getAvailableWords(settings.category, settings.difficulty);

  if (availableWords.length === 0) {
    throw new Error("No words are available for the selected category and difficulty.");
  }

  // Select the secret word.
  const secretWord = randomItem(availableWords);

  // Randomly select the impostors.
  const impostorPlayers = randomItems(players, settings.impostorCount);

  const impostorIds = new Set(impostorPlayers.map((player) => player.id));

  // Assign each player their private information.
  const initializedPlayers: InitializedPlayer[] = players.map((player) => {
    const isImpostor = impostorIds.has(player.id);

    return {
      playerId: player.id,
      name: player.name.trim(),
      isImpostor,
      word: isImpostor ? null : secretWord.word,
      hint: isImpostor && settings.hintMode === "related" ? secretWord.hint : null,
    };
  });

  return {
    word: secretWord,
    players: initializedPlayers,
  };
}
