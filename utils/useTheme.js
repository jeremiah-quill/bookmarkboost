import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const value = useThemeHook();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  return useContext(ThemeContext);
};

function useThemeHook() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleIsDarkMode = () => {
    setIsDarkMode((curr) => !curr);
  };

  return {
    isDarkMode,
    toggleIsDarkMode,
  };
}
