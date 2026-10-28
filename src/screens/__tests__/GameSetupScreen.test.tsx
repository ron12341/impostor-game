import GameSetupScreen from "@/screens/GameSetupScreen";
import { useGameStore } from "@/store/gameStore";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/store/gameStore", () => ({
  useGameStore: jest.fn(),
}));

jest.mock("@/components/ui/Screen", () => {
  const React = require("react");
  const { View } = require("react-native");

  return function MockScreen({ children }: { children: React.ReactNode }) {
    return <View>{children}</View>;
  };
});

jest.mock("@/components/ui/AppButton", () => {
  const React = require("react");
  const { Pressable, Text } = require("react-native");

  return function MockAppButton({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) {
    return (
      <Pressable accessibilityRole="button" accessibilityState={{ disabled: Boolean(disabled) }} disabled={disabled} onPress={onPress}>
        <Text>{title}</Text>
      </Pressable>
    );
  };
});

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockSetPlayers = jest.fn();

const mockPlayers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

async function setupScreen(initialPlayers: { id: number; name: string }[] = []) {
  const state = {
    players: initialPlayers,
    setPlayers: mockSetPlayers,
  };

  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
    replace: mockReplace,
  });

  (useGameStore as unknown as jest.Mock).mockImplementation((selector: (state: any) => unknown) => selector(state));

  return render(<GameSetupScreen />);
}

describe("GameSetupScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the setup screen and three initial player inputs", async () => {
    const { getByText, getByLabelText } = await setupScreen();

    expect(getByText("Who's Playing?")).toBeTruthy();
    expect(getByText("Add everyone who will play.")).toBeTruthy();

    expect(getByLabelText("Name for player 1")).toBeTruthy();
    expect(getByLabelText("Name for player 2")).toBeTruthy();
    expect(getByLabelText("Name for player 3")).toBeTruthy();
  });

  it("disables Continue while player names are empty", async () => {
    const { getByRole } = await setupScreen();

    expect(getByRole("button", { name: "CONTINUE" }).props.accessibilityState?.disabled).toBe(true);
  });

  it("enables Continue when three unique names are entered", async () => {
    const { getByLabelText, getByRole } = await setupScreen();

    await fireEvent.changeText(getByLabelText("Name for player 1"), "Alice");
    await fireEvent.changeText(getByLabelText("Name for player 2"), "Bob");
    await fireEvent.changeText(getByLabelText("Name for player 3"), "Charlie");

    await waitFor(() => {
      expect(getByRole("button", { name: "CONTINUE" }).props.accessibilityState?.disabled).toBe(false);
    });
  });

  it("shows a validation message for duplicate names", async () => {
    const { getByLabelText, getByText, getByRole } = await setupScreen();

    await fireEvent.changeText(getByLabelText("Name for player 1"), "Alice");
    await fireEvent.changeText(getByLabelText("Name for player 2"), "alice");
    await fireEvent.changeText(getByLabelText("Name for player 3"), "Charlie");

    await waitFor(() => {
      expect(getByText("No duplicate names allowed.")).toBeTruthy();
      expect(getByRole("button", { name: "CONTINUE" }).props.accessibilityState?.disabled).toBe(true);
    });
  });

  it("adds another player when Add Player is pressed", async () => {
    const { getByText, getByLabelText } = await setupScreen();

    await fireEvent.press(getByText("Add Player"));

    await waitFor(() => {
      expect(getByLabelText("Name for player 4")).toBeTruthy();
    });
  });

  it("does not remove a player when only three remain", async () => {
    const { queryByRole } = await setupScreen();

    expect(queryByRole("button", { name: "Remove player 1" })).toBeNull();
  });

  it("saves trimmed player names and navigates when Continue is pressed", async () => {
    const { getByRole, getByLabelText } = await setupScreen();

    await fireEvent.changeText(getByLabelText("Name for player 1"), " Alice ");
    await fireEvent.changeText(getByLabelText("Name for player 2"), " Bob ");
    await fireEvent.changeText(getByLabelText("Name for player 3"), " Charlie ");

    await waitFor(() => {
      expect(getByRole("button", { name: "CONTINUE" }).props.accessibilityState?.disabled).toBe(false);
    });

    await fireEvent.press(getByRole("button", { name: "CONTINUE" }));

    expect(mockSetPlayers).toHaveBeenCalledWith(mockPlayers);
    expect(mockPush).toHaveBeenCalledWith("/game/settings");
  });
});
