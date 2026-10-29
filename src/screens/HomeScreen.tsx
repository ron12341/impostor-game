import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import Screen from "@/components/ui/Screen";
import { COLORS } from "@/constants/colors";

export default function HomeScreen() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push("/game/setup");
  };

  const handleHowToPlay = () => {
    router.push("/how-to-play");
  };

  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>IMPOSTOR</Text>

          <Text style={styles.subtitle}>WHO CAN YOU TRUST?</Text>
        </View>

        <View style={styles.actions}>
          <AppButton title="START GAME" onPress={handleStartGame} />

          <AppButton title="HOW TO PLAY" variant="secondary" onPress={handleHowToPlay} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>PASS THE PHONE. FIND THE IMPOSTOR.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    alignItems: "center",
    marginTop: 80,
  },

  title: {
    color: COLORS.text,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 5,
  },

  subtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 3,
    marginTop: 10,
  },

  actions: {
    width: "100%",
    gap: 14,
  },

  footer: {
    alignItems: "center",
    marginBottom: 24,
  },

  footerText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1.5,
    textAlign: "center",
  },
});
