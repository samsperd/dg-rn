import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContext, ThemeProvider } from "../context/ThemeContext";

function AppContent() {
  const { colorScheme, theme, setColorScheme } = useContext(ThemeContext);

  const isDarkMode = colorScheme === "dark" ? true : false;

  const handleThemeModeToggle = () => {
    if (isDarkMode) {
      setColorScheme("light");
    } else {
      setColorScheme("dark");
    }
  };

  const styles = createStyles(theme, colorScheme as string);

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            // title: "Todo App",
            headerTintColor: colorScheme === "dark" ? theme.tint : "#000",
            headerStyle: { backgroundColor: theme.background },
            header: () => (
              <View style={styles.headerStyle}>
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.headerText}>Todo App</Text>
                </View>
                <View>
                  <Pressable onPress={handleThemeModeToggle}>
                    <Ionicons
                      name={isDarkMode ? "sunny" : "moon"}
                      size={22}
                      color={theme.text}
                    />
                  </Pressable>
                </View>
              </View>
            ),
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function createStyles(theme: typeof Colors.dark, colorScheme: string) {
  return StyleSheet.create({
    headerStyle: {
      backgroundColor: theme.background,
      paddingTop: 50,
      paddingBottom: 15,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      shadowColor: colorScheme === "light" ? "#000" : "#ddd",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: 1,
      color: theme.tint,
    },
  });
}
