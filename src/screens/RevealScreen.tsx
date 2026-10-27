import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { useGameStore } from "@/store/gameStore";

import AppButton from "@/components/ui/AppButton";
import HoldToReveal from "@/components/ui/HoldToReveal";
import Screen from "@/components/ui/Screen";

export default function RevealScreen() {
  const router = useRouter();

  const round = useGameStore((state) => state.round);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const currentPlayer = round?.players[currentPlayerIndex];
  const totalPlayers = round?.players.length ?? 0;
  const isLastPlayer = currentPlayerIndex === totalPlayers - 1;

  const handleNext = () => {
    if (isLastPlayer) {
      console.log("Moving to the discussion page");
      router.push("/game/discussion");
      return;
    }

    setCurrentPlayerIndex((index) => index + 1);
  };

  if (!round || !currentPlayer) {
    return (
      <Screen style={styles.centered}>
        <Text style={styles.title}>NO ACTIVE GAME</Text>

        <Text style={styles.description}>Start a new game before revealing player secrets</Text>

        <AppButton title="BACK TO SETUP" onPress={() => router.replace("/game/setup")} />
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>SECRET REVEAL</Text>

        <Text style={styles.progress}>
          Player {currentPlayerIndex + 1} of {totalPlayers}
        </Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.passPhone}>PASS THE PHONE TO</Text>

        <Text style={styles.playerName}>{currentPlayer.name}</Text>

        <Text style={styles.description}>Make sure nobody else can see the phone</Text>

        <View style={styles.revealContainer}>
          <HoldToReveal key={currentPlayer.playerId}>
            {currentPlayer.isImpostor ? (
              <>
                <Text style={styles.impostorLabel}>YOU ARE THE</Text>
                <Text style={styles.impostorTitle}>IMPOSTOR</Text>

                {currentPlayer.hint ? (
                  <View style={styles.hintContainer}>
                    <Text style={styles.hintLabel}>YOUR HINT</Text>
                    <Text style={styles.hintWord}>{currentPlayer.hint}</Text>
                  </View>
                ) : (
                  <Text style={styles.noHint}>You have no hint this round.</Text>
                )}
              </>
            ) : (
              <>
                <Text style={styles.wordLabel}>THE SECRET WORD IS</Text>

                <Text style={styles.secretWord}>{currentPlayer.word?.toUpperCase()}</Text>

                <Text style={styles.reminder}>Remember it. Do not say it out loud.</Text>
              </>
            )}
          </HoldToReveal>
        </View>
      </View>

      <View style={styles.footer}>
        <AppButton title={isLastPlayer ? "START DISCUSSION" : "NEXT PLAYER"} onPress={handleNext} />
        <Text style={styles.footerNote}>RELEASE YOUR FINGER BEFORE PASSING THE PHONE</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 12,
  },
  centered: {
    justifyContent: "center",
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },
  progress: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
  passPhone: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "center",
  },
  playerName: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 8,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 28,
  },
  revealContainer: {
    width: "100%",
  },
  impostorLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "center",
  },
  impostorTitle: {
    color: COLORS.danger,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 8,
  },
  hintContainer: {
    alignItems: "center",
    marginTop: 28,
    padding: 16,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLight,
    width: "100%",
  },
  hintLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },
  hintWord: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 8,
  },
  noHint: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 24,
  },
  wordLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
  },
  secretWord: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 16,
  },
  reminder: {
    color: COLORS.textMuted,
    fontSize: 13,
    textAlign: "center",
    marginTop: 16,
  },
  footer: {
    gap: 14,
    paddingTop: 16,
  },
  footerNote: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    lineHeight: 16,
    textAlign: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
});
