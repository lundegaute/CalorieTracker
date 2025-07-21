
import {create} from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
    theme: Theme;
    toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
    theme: "dark", // Default theme
    toggleTheme: () => set((state) => ( {
        theme: state.theme === "light" ? "dark" : "light",
    }))
}));

export default useThemeStore;