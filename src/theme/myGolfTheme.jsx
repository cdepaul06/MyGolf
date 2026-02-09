import { createTheme } from "@mui/material/styles";

const myGolfTheme = createTheme({
  palette: {
    mode: "light",

    // Brand greens
    primary: {
      main: "#1B5E20", // deep pine
      dark: "#0B3D12",
      light: "#4C8C4A",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#2E7D32", // fairway green
      dark: "#1B5E20",
      light: "#60AD5E",
      contrastText: "#ffffff",
    },

    // Sand + sky accents (optional)
    warning: {
      main: "#D4A373", // sand bunker
    },

    info: {
      main: "#2D6A9F", // sky/water hint
    },

    background: {
      default: "#F3F7F2", // warm off-white with green tint
      paper: "#FFFFFF",
    },

    text: {
      primary: "#132A13",
      secondary: "#2F3E2F",
    },

    divider: "rgba(19,42,19,0.12)",
  },

  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default myGolfTheme;
