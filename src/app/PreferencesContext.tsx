/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemePreference = "dark" | "light" | "system";

interface Preferences {
  theme: ThemePreference;
  showVolume: boolean;
}

interface PreferencesContextValue extends Preferences {
  storageError: string | null;
  setTheme: (theme: ThemePreference) => void;
  setShowVolume: (showVolume: boolean) => void;
}

const STORAGE_KEY = "woohoo-terminal-preferences";
const DEFAULT_PREFERENCES: Preferences = { theme: "dark", showVolume: true };

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
  undefined,
);

function isThemePreference(value: unknown): value is ThemePreference {
  return value === "dark" || value === "light" || value === "system";
}

function readPreferences(): { preferences: Preferences; error: string | null } {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return { preferences: DEFAULT_PREFERENCES, error: null };

    const parsed: unknown = JSON.parse(stored);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("theme" in parsed) ||
      !("showVolume" in parsed) ||
      !isThemePreference(parsed.theme) ||
      typeof parsed.showVolume !== "boolean"
    ) {
      throw new Error("Saved preferences have an invalid format.");
    }

    return {
      preferences: { theme: parsed.theme, showVolume: parsed.showVolume },
      error: null,
    };
  } catch (error) {
    console.error("Unable to read saved preferences", error);
    return {
      preferences: DEFAULT_PREFERENCES,
      error: "Saved preferences could not be read; using defaults.",
    };
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [initialState] = useState(readPreferences);
  const [preferences, setPreferences] = useState(initialState.preferences);
  const [storageError, setStorageError] = useState(initialState.error);

  useEffect(() => {
    const applyTheme = (systemPrefersLight: boolean) => {
      const theme =
        preferences.theme === "system"
          ? systemPrefersLight
            ? "light"
            : "dark"
          : preferences.theme;
      document.documentElement.dataset.theme = theme;
    };
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const updateSystemTheme = () => applyTheme(mediaQuery.matches);

    updateSystemTheme();
    mediaQuery.addEventListener("change", updateSystemTheme);
    return () => mediaQuery.removeEventListener("change", updateSystemTheme);
  }, [preferences.theme]);

  const updatePreferences = (next: Preferences) => {
    setPreferences(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageError(null);
    } catch (error) {
      console.error("Unable to save preferences", error);
      setStorageError("Preferences could not be saved in this browser.");
    }
  };

  const value = useMemo(
    () => ({
      ...preferences,
      storageError,
      setTheme: (theme: ThemePreference) =>
        updatePreferences({ ...preferences, theme }),
      setShowVolume: (showVolume: boolean) =>
        updatePreferences({ ...preferences, showVolume }),
    }),
    [preferences, storageError],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }
  return context;
}
