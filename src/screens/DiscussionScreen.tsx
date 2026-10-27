import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import Screen from "@/components/ui/Screen";
import { COLORS } from "@/constants/colors";
import { useGameStore } from "@/store/gameStore";

export default function DiscussionScreen() {
  const router = useRouter();

  const round = useGameStore((state) => state.round);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);

  const totalPlayers = round?.players.length ?? 0;
  const currentSpeaker = round?.players[currentSpeakerIndex];
  const isLastSpeaker = currentSpeakerIndex === totalPlayers - 1;

  const handleNext = () => {
    if (isLastSpeaker) {
      Alert.alert("Moving to the Voting Page", "Voting Page will be implemented soon");
      console.log("Moving on to the voting page");
      //   router.push('/game/voting');
      return;
    }

    setCurrentSpeakerIndex((index) => index + 1);
  };

  if (!round || !currentSpeaker) {
    return (
      <Screen style={styles.centered}>
        <Text style={styles.title}>NO ACTIVE GAME</Text>

        <Text style={styles.description}>Start a game before entering the discussion.</Text>

        <AppButton title="BACK TO SETUP" onPress={() => router.replace("/game/setup")} />
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>ROUND IN PROGRESS</Text>
      </View>

      <View style={styles.main}>
        <View style={styles.phaseBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.phaseText}>DISCUSSION PHASE</Text>
        </View>

        <Text style={styles.title}>Discussion in progress</Text>

        <Text style={styles.description}>Share your clues, pay attention to what everyone says, and figure out who might be the impostor.</Text>

        <View style={styles.discussionCard}>
          <Text style={styles.discussionIcon}>💬</Text>

          <Text style={styles.discussionTitle}>Discuss among yourselves</Text>

          <Text style={styles.discussionDescription}>Take your time. When everyone is ready, move on to voting.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <AppButton title="START VOTING" onPress={handleNext} />

        <Text style={styles.footerNote}>MAKE YOUR CASE. TRUST YOUR INSTINCTS.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
  },
  centered: {
    justifyContent: "center",
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  // progress: {
  //   color: COLORS.textMuted,
  //   fontSize: 11,
  //   fontWeight: "700",
  //   letterSpacing: 1,
  // },
  main: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 12,
  },
  phaseBadge: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  phaseText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },
  description: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 24,
  },

  discussionCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: 12,
  },
  discussionIcon: {
    fontSize: 36,
    marginBottom: 16,
  },
  discussionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  discussionDescription: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 10,
  },
  footer: {
    gap: 12,
    paddingTop: 12,
  },
  footerNote: {
    color: COLORS.textMuted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    textAlign: "center",
    lineHeight: 15,
  },
});
