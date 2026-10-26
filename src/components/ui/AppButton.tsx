import { Pressable, StyleSheet, Text, type PressableProps } from "react-native";

import { COLORS } from "@/constants/colors";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
} & Pick<PressableProps, "accessibilityLabel">;

export default function AppButton({ title, onPress, variant = "primary", disabled = false, accessibilityLabel }: AppButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel ?? title} onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.button, isPrimary ? styles.primary : styles.secondary, pressed && !disabled && styles.pressed, disabled && styles.disabled]}>
      <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 58,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  primary: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  text: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 2,
  },

  primaryText: {
    color: COLORS.text,
  },

  secondaryText: {
    color: COLORS.textSecondary,
  },

  pressed: {
    opacity: 0.7,
  },

  disabled: {
    opacity: 0.4,
  },
});
