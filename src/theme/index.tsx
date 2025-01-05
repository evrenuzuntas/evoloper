import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import { createContext, useContext, useMemo, useState, useEffect } from "react";

// Tema modu için context
interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

// Hook for using the color mode
export const useColorMode = () => useContext(ColorModeContext);

// Tema oluşturma fonksiyonu
const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0",
      },
      secondary: {
        main: "#9c27b0",
        light: "#ba68c8",
        dark: "#7b1fa2",
      },
      background: {
        default: mode === "light" ? "#FFFFFF" : "#000000",
        paper: mode === "light" ? "#FFFFFF" : "#000000",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#FFFFFF",
        secondary: mode === "light" ? "#424242" : "#E0E0E0",
      },
      divider: mode === "light" ? "#E0E0E0" : "#424242",
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "8px 16px",
            "&:hover": {
              boxShadow: mode === "light" ? "0 2px 4px rgba(0,0,0,0.1)" : "0 2px 4px rgba(255,255,255,0.1)",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#000000",
            color: mode === "light" ? "#000000" : "#FFFFFF",
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "light" ? "#E0E0E0" : "#424242"}`,
            "& .MuiToolbar-root": {
              minHeight: "70px",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: mode === "light" ? "#FFFFFF" : "#000000",
            border: `1px solid ${mode === "light" ? "#E0E0E0" : "#424242"}`,
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingTop: "24px",
            paddingBottom: "24px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              "& fieldset": {
                borderColor: mode === "light" ? "#E0E0E0" : "#424242",
              },
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
              backgroundColor: mode === "light" ? "#FFFFFF" : "#000000",
            },
            "& input": {
              color: mode === "light" ? "#000000" : "#FFFFFF",
            },
            "& label": {
              color: mode === "light" ? "#424242" : "#E0E0E0",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#000000",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#000000",
            border: `1px solid ${mode === "light" ? "#E0E0E0" : "#424242"}`,
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
  });

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // localStorage'dan başlangıç modunu al veya light kullan
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("theme-mode");
    return savedMode === "dark" || savedMode === "light" ? savedMode : "light";
  });

  // Mod değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  // Sistem temasını kontrol et ve ilk yüklemede uygula
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? "dark" : "light");
    };

    // Eğer localStorage'da tema tercihi yoksa, sistem temasını kullan
    if (!localStorage.getItem("theme-mode")) {
      setMode(mediaQuery.matches ? "dark" : "light");
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
