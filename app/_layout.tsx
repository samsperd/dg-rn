import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Appearance, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme!);

  return (
    <SafeAreaProvider style={styles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Todo App",
            headerTintColor: colorScheme === "dark" ? theme.tint : "#000",
            headerStyle: { backgroundColor: theme.background },
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

function createStyles(
  theme: typeof Colors.light | typeof Colors.dark,
  colorScheme: string,
) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
}
