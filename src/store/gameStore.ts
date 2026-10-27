import { create } from "zustand";

import type { GameSettings, Player } from "@/types/game";

import type { GameRound } from "@/utils/game";

type GameStore = {
  players: Player[];
  settings: GameSettings | null;
  round: GameRound | null;

  setPlayers: (players: Player[]) => void;
  setSettings: (settings: GameSettings) => void;
  setRound: (round: GameRound) => void;
  resetGame: () => void;
};

const initialState = {
  players: [],
  settings: null,
  round: null,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setPlayers: (players) => set({ players }),
  setSettings: (settings) => set({ settings }),
  setRound: (round) => set({ round }),
  resetGame: () => set(initialState),
}));
