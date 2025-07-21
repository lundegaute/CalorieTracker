"use client";
import {darkTheme, lightTheme } from "@/components/Theme/themeConfig";
import { ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import { PropsWithChildren } from "react";
import useThemeStore from "@/components/Zustand/ThemeStore";

function ThemeProvider( {children}: PropsWithChildren) {
    const theme = useThemeStore((state) => state.theme);
    return (
        <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    )
};

export default ThemeProvider;