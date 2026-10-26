import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";

type ScreenProps = ViewProps & {
  children: React.ReactNode;
  padded?: boolean;
};

export default function Screen({ children, padded = true, style, ...viewProps }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View {...viewProps} style={[styles.content, padded && styles.padded, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
  },

  padded: {
    paddingHorizontal: 24,
  },
});
