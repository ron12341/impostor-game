import { useRouter } from "expo-router";
import { useMemo, useState, type ReactNode } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import Screen from "@/components/ui/Screen";
import { COLORS } from "@/constants/colors";
import { useGameStore } from "@/store/gameStore";
import type { Difficulty, GameCategory, GameMode, HintMode } from "@/types/game";
import { initializeGame } from "@/utils/game";

export default function GameSettingsScreen() {
  const router = useRouter();
  const savedSettings = useGameStore((state) => state.settings);

  const players = useGameStore((state) => state.players);
  const setSettings = useGameStore((state) => state.setSettings);
  const setRound = useGameStore((state) => state.setRound);

  const maxImpostorCount = useMemo(() => {
    return Math.max(1, Math.floor((players.length - 1) / 2));
  }, [players.length]);

  const [mode, setMode] = useState<GameMode>(() => savedSettings?.mode ?? "classic");
  const [impostorCount, setImpostorCount] = useState<number>(() => Math.max(1, Math.min(savedSettings?.impostorCount ?? 1, maxImpostorCount)));
  const [hintMode, setHintMode] = useState<HintMode>(() => savedSettings?.hintMode ?? "none");
  const [categories, setCategories] = useState<GameCategory[]>(() => savedSettings?.categories ?? ["places"]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>(() => savedSettings?.difficulties ?? ["easy"]);

  const categoryOptions: {
    label: string;
    value: GameCategory;
  }[] = [
    { label: "Places", value: "places" },
    { label: "Food", value: "food" },
    { label: "People", value: "people" },
    { label: "Animals", value: "animals" },
    { label: "Objects", value: "objects" },
    { label: "Technology", value: "technology" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Movies & TV", value: "moviesAndTV" },
    { label: "Sports", value: "sports" },
    { label: "Video Games", value: "videoGames" },
  ];

  const handleIncreaseImpostorCount = () => {
    setImpostorCount((currentImpostorCount) => Math.min(currentImpostorCount + 1, maxImpostorCount));
  };

  const handleDecreaseImpostorCount = () => {
    setImpostorCount((currentImpostorCount) => Math.max(currentImpostorCount - 1, 1));
  };

  const toggleCategory = (category: GameCategory) => {
    setCategories((current) => (current.includes(category) ? current.filter((item) => item !== category) : [...current, category]));
  };

  const toggleDifficulty = (difficulty: Difficulty) => {
    setDifficulties((current) => (current.includes(difficulty) ? current.filter((item) => item !== difficulty) : [...current, difficulty]));
  };

  const handleContinue = () => {
    if (players.length < 3) {
      Alert.alert("Not enough players", "You need at least 3 players to start a game.");
      return;
    }

    if (impostorCount > Math.floor((players.length - 1) / 2)) {
      Alert.alert("Invalid impostor count", "Reduce the number of impostors for this player count.");
      return;
    }

    if (mode === "chaos") {
      Alert.alert("Coming soon", "Chaos mode is not implemented yet. Please select Classic mode.");
      return;
    }

    if (categories.length === 0) {
      Alert.alert("Select a category", "Choose at least one category to continue.");
      return;
    }

    if (difficulties.length === 0) {
      Alert.alert("Select a difficulty", "Choose at least one difficulty to continue.");
      return;
    }

    const settings = {
      mode,
      impostorCount,
      categories,
      hintMode,
      difficulties,
    };

    try {
      const round = initializeGame(players, settings);

      setSettings(settings);
      setRound(round);
      router.push("/game/reveal");
    } catch (error) {
      Alert.alert("Unable to start game", error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <Screen padded={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()}>
            <Text style={styles.backButton}>←</Text>
          </Pressable>

          <View>
            <Text style={styles.eyebrow}>NEW GAME</Text>
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>

        {/* Game Mode */}
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <SettingSection title="Game Mode">
            <View style={styles.optionRow}>
              <OptionButton label="Classic" selected={mode === "classic"} onPress={() => setMode("classic")} />
              <OptionButton label="Chaos" selected={mode === "chaos"} onPress={() => setMode("chaos")} />
            </View>
          </SettingSection>

          {/* Impostor Count */}
          <SettingSection title="Impostor Count">
            <Text style={styles.helperText}>Maximum {maxImpostorCount} impostors</Text>
            <View style={styles.counter}>
              <Pressable style={styles.counterButton} onPress={handleDecreaseImpostorCount} disabled={impostorCount <= 1}>
                <Text style={styles.counterButtonText}>−</Text>
              </Pressable>

              <View style={styles.counterValue}>
                <Text style={styles.counterNumber}>{impostorCount}</Text>

                <Text style={styles.counterLabel}>{impostorCount === 1 ? "IMPOSTOR" : "IMPOSTORS"}</Text>
              </View>

              <Pressable style={styles.counterButton} onPress={handleIncreaseImpostorCount} disabled={impostorCount >= maxImpostorCount}>
                <Text style={styles.counterButtonText}>+</Text>
              </Pressable>
            </View>
          </SettingSection>

          {/* Categories */}
          <SettingSection title="Categories">
            <Text style={styles.helperText}>Choose one or more categories.</Text>

            <View style={styles.wrap}>
              {categoryOptions.map((item) => (
                <OptionButton key={item.value} label={item.label} selected={categories.includes(item.value)} onPress={() => toggleCategory(item.value)} />
              ))}
            </View>
          </SettingSection>

          {/* Hint Mode */}
          <SettingSection title="Hint Mode">
            <Text style={styles.helperText}>Related hints are based on the category you selected.</Text>
            <View style={styles.optionRow}>
              <OptionButton label="None" selected={hintMode === "none"} onPress={() => setHintMode("none")} />
              <OptionButton label="Related" selected={hintMode === "related"} onPress={() => setHintMode("related")} />
            </View>
          </SettingSection>

          {/* Difficulty */}
          <SettingSection title="Difficulty">
            {/* Difficulties */}
            <Text style={styles.helperText}>Choose one or more difficulty levels.</Text>

            <View style={styles.optionRow}>
              <OptionButton label="Easy" selected={difficulties.includes("easy")} onPress={() => toggleDifficulty("easy")} />

              <OptionButton label="Medium" selected={difficulties.includes("medium")} onPress={() => toggleDifficulty("medium")} />

              <OptionButton label="Hard" selected={difficulties.includes("hard")} onPress={() => toggleDifficulty("hard")} />
            </View>
          </SettingSection>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton title="CONTINUE" onPress={handleContinue} />
        </View>
      </View>
    </Screen>
  );
}

type SettingSectionProps = {
  title: string;
  children: ReactNode;
};

function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function OptionButton({ label, selected, onPress }: OptionButtonProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${label} option`} onPress={onPress} style={[styles.option, selected && styles.optionSelected]}>
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 10,
    gap: 14,
  },

  backButton: {
    color: COLORS.text,
    fontSize: 40,
    fontWeight: "300",
    lineHeight: 40,
  },

  eyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 3,
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 28,
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },

  optionRow: {
    flexDirection: "row",
    gap: 10,
  },

  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  option: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  optionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryDark,
  },

  optionText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },

  optionTextSelected: {
    color: COLORS.text,
  },

  checkmark: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
  },

  counterButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  counterButtonText: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "400",
  },

  counterValue: {
    alignItems: "center",
    minWidth: 80,
  },

  counterNumber: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "900",
  },

  counterLabel: {
    color: COLORS.textMuted,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 2,
  },

  helperText: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: "center",
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
  },
});
