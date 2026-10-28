import { useGameStore } from "@/store/gameStore";
import type { GameSettings, Player } from "@/types/game";
import type { GameRound } from "@/utils/game";

describe("gameStore", () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  it("starts with an empty game state", () => {
    const state = useGameStore.getState();

    expect(state.players).toEqual([]);
    expect(state.settings).toBeNull();
    expect(state.round).toBeNull();
  });

  it("sets players", () => {
    const players: Player[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    useGameStore.getState().setPlayers(players);

    expect(useGameStore.getState().players).toEqual(players);
  });

  it("sets game settings", () => {
    const settings: GameSettings = {
      mode: "classic",
      impostorCount: 1,
      category: "all",
      hintMode: "none",
      difficulty: "easy",
    };

    useGameStore.getState().setSettings(settings);

    expect(useGameStore.getState().settings).toEqual(settings);
  });

  it("sets the game round", () => {
    const round = {
      word: {
        word: "Beach",
        hint: "Sunscreen",
      },
      players: [
        {
          playerId: 1,
          name: "Alice",
          isImpostor: false,
          word: "Beach",
          hint: null,
        },
        {
          playerId: 2,
          name: "Bob",
          isImpostor: true,
          word: null,
          hint: null,
        },
      ],
    } satisfies GameRound;

    useGameStore.getState().setRound(round);

    expect(useGameStore.getState().round).toEqual(round);
  });

  it("resets only the current round", () => {
    const players: Player[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    const settings: GameSettings = {
      mode: "classic",
      impostorCount: 1,
      category: "food",
      hintMode: "related",
      difficulty: "medium",
    };

    const round = {
      word: {
        word: "Sushi",
        hint: "Chopsticks",
      },
      players: [],
    } satisfies GameRound;

    const store = useGameStore.getState();

    store.setPlayers(players);
    store.setSettings(settings);
    store.setRound(round);

    store.resetRound();

    const state = useGameStore.getState();

    expect(state.round).toBeNull();
    expect(state.players).toEqual(players);
    expect(state.settings).toEqual(settings);
  });

  it("resets the entire game", () => {
    const store = useGameStore.getState();

    store.setPlayers([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);

    store.setSettings({
      mode: "classic",
      impostorCount: 1,
      category: "all",
      hintMode: "none",
      difficulty: "easy",
    });

    store.resetGame();

    const state = useGameStore.getState();

    expect(state.players).toEqual([]);
    expect(state.settings).toBeNull();
    expect(state.round).toBeNull();
  });
});
