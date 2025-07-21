
import useThemeStore from "@/components/Zustand/ThemeStore";
import SunnyIcon from '@mui/icons-material/Sunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import Button from "@mui/material/Button";

function ThemeSwitch() {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <div>
            {theme === "light" ? (
                <Button onClick={toggleTheme}><NightlightRoundIcon fontSize="large" /></Button>
            ) : (
                <Button onClick={toggleTheme}><SunnyIcon fontSize="large" /></Button>
            )}
        </div>
    )
};

export default ThemeSwitch;