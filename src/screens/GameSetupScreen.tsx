import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import Screen from "@/components/ui/Screen";
import { COLORS } from "@/constants/colors";
import { useGameStore } from "@/store/gameStore";

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 12;

type PlayerInput = {
  id: number;
  name: string;
};

export default function GameSetupScreen() {
  const router = useRouter();
  const savedPlayers = useGameStore((state) => state.players);

  const setGamePlayers = useGameStore((state) => state.setPlayers);
  const [players, setPlayers] = useState<PlayerInput[]>(() => {
    if (savedPlayers.length > 0) {
      return savedPlayers.map((player) => ({
        id: player.id,
        name: player.name,
      }));
    }

    return [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
    ];
  });
  const [nextPlayerId, setNextPlayerId] = useState(4);
  const normalizedNames = players.map((player) => player.name.trim().toLowerCase());
  const hasEmptyNames = players.some((player) => player.name.trim().length === 0);
  const hasDuplicateNames = new Set(normalizedNames).size !== normalizedNames.length;
  const isValid = players.length >= MIN_PLAYERS && players.length <= MAX_PLAYERS && !hasEmptyNames && !hasDuplicateNames;

  const updatePlayerName = (id: number, name: string) => {
    setPlayers((currentPlayers) => currentPlayers.map((player) => (player.id === id ? { ...player, name } : player)));
  };

  const addPlayer = () => {
    if (players.length >= MAX_PLAYERS) {
      return;
    }

    setPlayers((currentPlayers) => [...currentPlayers, { id: nextPlayerId, name: "" }]);
    setNextPlayerId((nextPlayerId) => nextPlayerId + 1);
  };

  const removePlayer = (id: number) => {
    if (players.length <= MIN_PLAYERS) {
      return;
    }
    setPlayers((currentPlayers) => currentPlayers.filter((player) => player.id !== id));
  };

  const handleStartGame = () => {
    if (!isValid) {
      return;
    }
    const gamePlayers = players.map((player) => ({ id: player.id, name: player.name.trim() }));
    setGamePlayers(gamePlayers);

    router.push("/game/settings");
  };

  return (
    <Screen>
      <View style={styles.navigation}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.replace("/")} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
      </View>

      <View style={styles.headerText}>
        <Text style={styles.eyebrow}>NEW GAME</Text>
        <Text style={styles.title}>Who's Playing?</Text>
        <Text style={styles.subtitle}>Add everyone who will play.</Text>
      </View>

      <ScrollView style={styles.playerList} contentContainerStyle={styles.playerListContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {players.map((player, index) => {
          const playerName = player.name.trim();

          const nameIsDuplicate = playerName.length > 0 && normalizedNames.filter((name) => name === playerName.toLowerCase()).length > 1;

          return (
            <View key={player.id} style={styles.playerRow}>
              <View style={styles.playerNumber}>
                <Text style={styles.playerNumberText}>{String(index + 1).padStart(2, "0")}</Text>
              </View>

              <TextInput
                value={player.name}
                onChangeText={(value) => updatePlayerName(player.id, value)}
                placeholder={`Player ${index + 1}`}
                placeholderTextColor={COLORS.textMuted}
                style={styles.nameInput}
                selectionColor={COLORS.primary}
                maxLength={24}
                returnKeyType="next"
                accessibilityLabel={`Name for player ${index + 1}`}
              />

              {players.length > MIN_PLAYERS && (
                <Pressable accessibilityRole="button" accessibilityLabel={`Remove player ${index + 1}`} onPress={() => removePlayer(player.id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>x</Text>
                </Pressable>
              )}

              {nameIsDuplicate && <Text style={styles.hiddenValidationText}>Duplicate name</Text>}
            </View>
          );
        })}

        <Pressable
          accessibilityRole="button"
          onPress={addPlayer}
          disabled={players.length >= MAX_PLAYERS}
          style={[styles.addButton, players.length >= MAX_PLAYERS && styles.disabledButton]}
        >
          <View style={styles.plusIcon}>
            <Text style={styles.plusText}>+</Text>
          </View>

          <Text style={styles.addButtonText}>Add Player</Text>

          <Text style={styles.addButtonHint}>{players.length >= MAX_PLAYERS ? "Player limit reached" : ""}</Text>
        </Pressable>

        {(hasEmptyNames && <Text style={styles.validationText}>Fill in every player name to continue.</Text>) ||
          (hasDuplicateNames && <Text style={styles.validationText}>No duplicate names allowed.</Text>)}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerHint}>MINIMUM {MIN_PLAYERS} PLAYERS REQUIRED</Text>
        <AppButton title="CONTINUE" onPress={handleStartGame} disabled={!isValid} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  navigation: {
    paddingTop: 12,
    paddingBottom: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    color: COLORS.text,
    fontSize: 32,
    lineHeight: 35,
    marginTop: -3,
  },

  headerText: {
    paddingBottom: 12,
  },

  eyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 8,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },

  countContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  countLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },

  countValue: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },

  playerList: {
    flex: 1,
  },

  playerListContent: {
    gap: 10,
    paddingBottom: 20,
  },

  playerRow: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 12,
  },

  playerNumber: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
  },

  playerNumberText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
  },

  nameInput: {
    flex: 1,
    minWidth: 0,
    color: COLORS.text,
    fontSize: 15,
    paddingVertical: 12,
  },

  removeButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceLight,
  },

  removeButtonText: {
    color: COLORS.textMuted,
    fontSize: 25,
    lineHeight: 28,
  },

  addButton: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    borderRadius: 14,
  },

  plusIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceLight,
  },

  plusText: {
    color: COLORS.primary,
    fontSize: 24,
    lineHeight: 27,
  },

  addButtonText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },

  addButtonHint: {
    color: COLORS.textMuted,
    fontSize: 10,
  },

  disabledButton: {
    opacity: 0.4,
  },

  validationText: {
    color: "#F87171",
    fontSize: 12,
    marginTop: 2,
  },

  hiddenValidationText: {
    display: "none",
  },

  footer: {
    paddingTop: 14,
    paddingBottom: 12,
    gap: 12,
  },

  footerHint: {
    color: COLORS.textMuted,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
});
