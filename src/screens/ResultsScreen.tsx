import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import Screen from "@/components/ui/Screen";
import { COLORS } from "@/constants/colors";
import { useGameStore } from "@/store/gameStore";

export default function ResultsScreen() {
  const router = useRouter();
  const round = useGameStore((state) => state.round);
  const settings = useGameStore((state) => state.settings);
  const resetRound = useGameStore((state) => state.resetRound);
  const resetGame = useGameStore((state) => state.resetGame);

  const [isRevealed, setIsRevealed] = useState(false);

  const impostors = round?.players.filter((player) => player.isImpostor) ?? [];

  const handlePlayAgain = () => {
    resetRound();
    router.replace("/game/setup");
  };

  const handleHome = () => {
    resetGame();
    router.replace("/");
  };

  if (!round) {
    return (
      <Screen style={styles.emptyScreen}>
        <Text style={styles.title}>NO ACTIVE GAME</Text>
        <Text style={styles.description}>Start a game before viewing the results.</Text>

        <AppButton title="BACK TO HOME" onPress={handleHome} />
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>GAME COMPLETE</Text>
          <View style={styles.headerLine} />
          <Text style={styles.modeLabel}>{settings?.mode === "chaos" ? "CHAOS MODE" : "CLASSIC MODE"}</Text>
        </View>

        {!isRevealed ? (
          <View style={styles.main}>
            <View style={styles.lockCircle}>
              <Text style={styles.lockIcon}>?</Text>
            </View>

            <Text style={styles.title}>THE TRUTH AWAITS</Text>

            <Text style={styles.description}>The discussion is over and everyone has made their choice. Now find out the truth.</Text>

            <View style={styles.hiddenCard}>
              <Text style={styles.cardLabel}>IMPOSTOR{impostors.length === 1 ? "" : "(S)"}</Text>
              <Text style={styles.hiddenValue}>???</Text>
            </View>

            <View style={styles.footer}>
              <AppButton title="REVEAL THE TRUTH" onPress={() => setIsRevealed(true)} />
              <Text style={styles.footerNote}>THERE IS NO HIDING NOW</Text>
            </View>
          </View>
        ) : (
          <View style={styles.main}>
            <View style={styles.revealCircle}>
              <Text style={styles.revealIcon}>!</Text>
            </View>

            <Text style={styles.title}>THE TRUTH IS OUT</Text>

            <View style={styles.secretCard}>
              <Text style={styles.cardLabel}>THE SECRET WORD</Text>
              <Text style={styles.secretWord}>{round.word.word}</Text>
            </View>

            <View style={styles.impostorSection}>
              <Text style={styles.sectionTitle}>{impostors.length === 0 ? "NO IMPOSTORS" : impostors.length === 1 ? "THE IMPOSTOR" : "THE IMPOSTORS"}</Text>

              {impostors.length === 0 ? (
                <View style={styles.playerCard}>
                  <Text style={styles.playerName}>Nobody was an impostor!</Text>
                </View>
              ) : (
                impostors.map((player) => (
                  <View key={player.playerId} style={styles.impostorCard}>
                    <View style={styles.impostorDot} />

                    <Text style={styles.playerName}>{player.name}</Text>

                    <Text style={styles.impostorBadge}>IMPOSTOR</Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.footer}>
              <AppButton title="PLAY AGAIN" onPress={handlePlayAgain} />
              <AppButton title="BACK TO HOME" variant="secondary" onPress={handleHome} />
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
  },
  headerLine: {
    width: 44,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 12,
  },
  modeLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 12,
  },
  main: {
    flex: 1,
    alignItems: "center",
  },
  lockCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  lockIcon: {
    color: COLORS.primary,
    fontSize: 38,
    fontWeight: "900",
  },
  revealCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  revealIcon: {
    color: COLORS.text,
    fontSize: 40,
    fontWeight: "900",
  },
  title: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 1,
    textAlign: "center",
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 28,
    maxWidth: 340,
  },
  hiddenCard: {
    width: "100%",
    minHeight: 104,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    padding: 20,
  },
  cardLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
  },
  hiddenValue: {
    color: COLORS.primary,
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 12,
  },
  secretCard: {
    width: "100%",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 18,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
    marginTop: 10,
    marginBottom: 32,
  },
  secretWord: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 14,
  },
  impostorSection: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 14,
  },
  impostorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  impostorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.danger,
    marginRight: 12,
  },
  playerName: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
  },
  impostorBadge: {
    color: COLORS.danger,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  playerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
  },
  //   noteCard: {
  //     width: "100%",
  //     backgroundColor: COLORS.surfaceLight,
  //     borderRadius: 14,
  //     padding: 18,
  //     marginBottom: 28,
  //   },
  //   noteTitle: {
  //     color: COLORS.primary,
  //     fontSize: 12,
  //     fontWeight: "900",
  //     letterSpacing: 2,
  //     marginBottom: 8,
  //   },
  //   noteDescription: {
  //     color: COLORS.textSecondary,
  //     fontSize: 13,
  //     lineHeight: 20,
  //   },
  footer: {
    width: "100%",
    gap: 12,
    marginTop: "auto",
  },
  footerNote: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 8,
  },
  emptyScreen: {
    justifyContent: "center",
    gap: 18,
  },
});
