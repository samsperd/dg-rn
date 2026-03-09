import { createContext, useState } from "react";
import { Appearance } from "react-native";
import { Colors } from "../constants/Colors";

type ColorScheme = "light" | "dark" | null;

type ThemeColors = {
  text: string;
  background: string;
  headerBackground: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

type ThemeContextType = {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  theme: ThemeColors;
};

export const ThemeContext = createContext<ThemeContextType>({
  colorScheme: "light",
  setColorScheme: () => {},
  theme: Colors.light,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider
      value={{ colorScheme, setColorScheme, theme } as ThemeContextType}
    >
      {children}
    </ThemeContext.Provider>
  );
};
