import { WORDS, type WordEntry } from "@/data/words";
import type { Difficulty, GameCategory } from "@/types/game";
import { GameSettings, Player } from "@/types/game";
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
  if (category === "all") {
    return Object.values(WORDS).flatMap((categoryWords) => categoryWords?.[difficulty] ?? []);
  }

  return WORDS[category]?.[difficulty] ?? [];
}

export function initializeGame(players: Player[], settings: GameSettings): GameRound {
  const availableWords = getAvailableWords(settings.category, settings.difficulty);

  if (availableWords.length === 0) {
    throw new Error("No words are available for the selected category and difficulty!");
  }

  // Select a random word
  const secretWord = randomItem(availableWords);

  // Select impostors randomly
  const impostorPlayers = randomItems(players, settings.impostorCount);
  const impostorIds = new Set(impostorPlayers.map((player) => player.id));

  // Assign information to every player
  const initializedPlayers: InitializedPlayer[] = players.map((player) => {
    const isImpostor = impostorIds.has(player.id);

    return {
      playerId: player.id,
      name: player.name,
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
