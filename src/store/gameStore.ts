import { create } from "zustand";

import type { GameSettings, Player } from "@/types/game";

type GameStore = {
  players: Player[];
  settings: GameSettings | null;

  setPlayers: (players: Player[]) => void;
  setSettings: (settings: GameSettings) => void;
  resetGame: () => void;
};

const initialState = {
  players: [],
  settings: null,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setPlayers: (players) => set({ players }),
  setSettings: (settings) => set({ settings }),
  resetGame: () => set(initialState),
}));
