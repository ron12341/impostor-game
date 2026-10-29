import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import Screen from "@/components/ui/Screen";
import { COLORS } from "@/constants/colors";

const RULES = [
  {
    number: "01",
    icon: "👥",
    title: "Set up your game",
    description: "Add at least 3 players, choose your word categories and difficulty, and configure your game mode.",
  },
  {
    number: "02",
    icon: "🤫",
    title: "Reveal your role",
    description:
      "Pass the phone around. Each player privately reveals their role. Most players receive the secret word, while impostors receive a different message and may get a hint.",
  },
  {
    number: "03",
    icon: "💬",
    title: "Give a clue",
    description:
      "A randomly selected player starts by saying one word related to the secret word. Continue clockwise or counterclockwise. Keep your clue subtle without saying the secret word itself.",
  },
  {
    number: "04",
    icon: "🔎",
    title: "Find the impostor",
    description: "Discuss everyone's clues and decide who seems suspicious. When you're ready, reveal the result to discover the impostor or impostors.",
  },
];

export default function HowToPlayScreen() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push("/game/setup");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.replace("/")} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.eyebrow}>GAME GUIDE</Text>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.intro}>
            <Text style={styles.title}>HOW TO PLAY</Text>

            <Text style={styles.subtitle}>One phone. One secret word. Find the impostor.</Text>
          </View>

          <View style={styles.rules}>
            {RULES.map((rule) => (
              <View key={rule.number} style={styles.ruleRow}>
                <View style={styles.iconContainer}>
                  <Text style={styles.ruleIcon}>{rule.icon}</Text>
                </View>

                <View style={styles.ruleContent}>
                  <View style={styles.ruleHeading}>
                    <Text style={styles.ruleNumber}>{rule.number}</Text>

                    <Text style={styles.ruleTitle}>{rule.title}</Text>
                  </View>

                  <Text style={styles.ruleDescription}>{rule.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.modesCard}>
            <Text style={styles.sectionTitle}>GAME MODES</Text>

            <View style={styles.modeItem}>
              <Text style={styles.modeTitle}>CLASSIC</Text>
              <Text style={styles.modeDescription}>You choose how many impostors are in the round. At least one player will be an impostor.</Text>
            </View>

            <View style={styles.modeDivider} />

            <View style={styles.modeItem}>
              <Text style={styles.modeTitle}>CHAOS</Text>
              <Text style={styles.modeDescription}>The game randomly chooses the number of impostors. There may even be no impostor at all!</Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 QUICK TIP</Text>

            <Text style={styles.tipDescription}>
              Keep your role and secret word private. Listen carefully to everyone's clues, and be careful not to reveal too much about what you know.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton title="LET'S PLAY" onPress={handleStartGame} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 12,
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

  eyebrow: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  intro: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 8,
  },

  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 3,
    textAlign: "center",
  },

  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 10,
  },

  rules: {
    gap: 24,
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  ruleIcon: {
    fontSize: 23,
  },

  ruleContent: {
    flex: 1,
  },

  ruleHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 7,
  },

  ruleNumber: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
  },

  ruleTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
    flexShrink: 1,
  },

  ruleDescription: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 21,
  },

  modesCard: {
    marginTop: 30,
    padding: 18,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  modeItem: {
    gap: 6,
  },

  modeTitle: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
  },

  modeDescription: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },

  modeDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  tipCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },

  tipTitle: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
  },

  tipDescription: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 21,
  },

  footer: {
    paddingTop: 14,
    paddingBottom: 8,
  },
});
