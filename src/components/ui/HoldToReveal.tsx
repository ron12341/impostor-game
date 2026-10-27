import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { COLORS } from "@/constants/colors";

type HoldToRevealProps = {
  children: ReactNode;
};

export default function HoldToReveal({ children }: HoldToRevealProps) {
  const revealed = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      // reveal after the player swipes upward
      revealed.value = event.translationY < -55 ? 1 : 0;
    })
    .onEnd(() => {
      // hide the word when the player releases
      revealed.value = 0;
    })
    .onFinalize(() => {
      // hide if the swiping is interupted or cancelled
      revealed.value = 0;
    });

  const secretStyle = useAnimatedStyle(() => ({
    opacity: withTiming(revealed.value, { duration: 80 }),
    transform: [
      {
        scale: withTiming(revealed.value ? 1 : 0.97, { duration: 80 }),
      },
    ],
  }));

  const instructionStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1 - revealed.value, { duration: 80 }),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.card}>
        <Animated.View pointerEvents="none" style={[styles.instruction, instructionStyle]}>
          <Text style={styles.arrow}>↑</Text>
          <Text style={styles.instructionTitle}>SWIPE UP & HOLD</Text>
          <Text style={styles.instructionDescription}>Keep your finger up to see your secret</Text>
        </Animated.View>

        <Animated.View pointerEvents="none" style={[styles.secret, secretStyle]}>
          {children}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 300,
    width: "100%",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    overflow: "hidden",
  },
  instruction: {
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 16,
  },
  instructionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
  },
  instructionDescription: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 21,
  },
  secret: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
