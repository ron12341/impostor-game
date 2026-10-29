import type { GameSettings, Player } from "@/types/game";
import { initializeGame } from "@/utils/game";

const players: Player[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" },
];

const baseSettings: GameSettings = {
  mode: "classic",
  impostorCount: 1,
  categories: ["places", "food"],
  hintMode: "none",
  difficulties: ["easy", "medium"],
};

describe("initializeGame", () => {
  it("creates a round with the correct number of players", () => {
    const round = initializeGame(players, baseSettings);

    expect(round.players).toHaveLength(players.length);
  });

  it("allows the maximum configured number of impostors", () => {
    const round = initializeGame(players, {
      ...baseSettings,
      impostorCount: 1,
    });

    const impostors = round.players.filter((player) => player.isImpostor);

    expect(impostors).toHaveLength(1);
  });

  it("rejects more impostors than the player limit allows", () => {
    expect(() =>
      initializeGame(players, {
        ...baseSettings,
        impostorCount: 2,
      }),
    ).toThrow();
  });

  it("gives every non-impostor the same secret word", () => {
    const round = initializeGame(players, baseSettings);
    const regularPlayers = round.players.filter((player) => !player.isImpostor);

    expect(regularPlayers.length).toBeGreaterThan(0);

    for (const player of regularPlayers) {
      expect(player.word).toBe(round.word.word);
    }
  });

  it("does not reveal the secret word to impostors", () => {
    const round = initializeGame(players, baseSettings);
    const impostors = round.players.filter((player) => player.isImpostor);

    for (const player of impostors) {
      expect(player.word).toBeNull();
    }
  });

  it("does not give hints when hint mode is none", () => {
    const round = initializeGame(players, {
      ...baseSettings,
      hintMode: "none",
    });

    const impostors = round.players.filter((player) => player.isImpostor);

    for (const player of impostors) {
      expect(player.hint).toBeNull();
    }
  });

  it("gives impostors a hint when hint mode is related", () => {
    const round = initializeGame(players, {
      ...baseSettings,
      hintMode: "related",
    });

    const impostors = round.players.filter((player) => player.isImpostor);

    for (const player of impostors) {
      expect(player.hint).toBe(round.word.hint);
      expect(player.hint).not.toBeNull();
    }
  });

  it("supports multiple selected categories and difficulties", () => {
    const round = initializeGame(players, {
      ...baseSettings,
      categories: ["places", "food"],
      difficulties: ["easy", "medium"],
    });

    expect(round.word).toBeDefined();
    expect(round.word.word).toBeTruthy();
    expect(round.word.hint).toBeTruthy();
  });

  it("rejects an empty category selection", () => {
    expect(() =>
      initializeGame(players, {
        ...baseSettings,
        categories: [],
      }),
    ).toThrow();
  });

  it("rejects an empty difficulty selection", () => {
    expect(() =>
      initializeGame(players, {
        ...baseSettings,
        difficulties: [],
      }),
    ).toThrow();
  });

  it("rejects fewer than three players", () => {
    expect(() => initializeGame(players.slice(0, 2), baseSettings)).toThrow();
  });

  it("rejects more than twelve players", () => {
    const tooManyPlayers = Array.from({ length: 13 }, (_, index) => ({
      id: index + 1,
      name: `Player ${index + 1}`,
    }));

    expect(() => initializeGame(tooManyPlayers, baseSettings)).toThrow();
  });

  it("rejects duplicate player IDs", () => {
    const duplicateIds: Player[] = [
      { id: 1, name: "Alice" },
      { id: 1, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    expect(() => initializeGame(duplicateIds, baseSettings)).toThrow();
  });

  it("rejects an invalid impostor count", () => {
    expect(() =>
      initializeGame(players, {
        ...baseSettings,
        impostorCount: 0,
      }),
    ).toThrow();
  });

  it("rejects Chaos mode while it is unsupported", () => {
    expect(() =>
      initializeGame(players, {
        ...baseSettings,
        mode: "chaos",
      }),
    ).toThrow();
  });
});
