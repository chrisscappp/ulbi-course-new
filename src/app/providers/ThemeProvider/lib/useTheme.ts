import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from "./ThemeContext";

interface UseThemeResult {
	toggleTheme: (th: Themes) => void;
	theme: Themes
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext)

	const toggleTheme = (th: Themes) => {
		const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
		setTheme(newTheme)
	}

	return { theme, toggleTheme }
}