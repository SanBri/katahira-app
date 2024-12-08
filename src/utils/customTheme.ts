import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1A237E", // Bleu Indigo
      light: "#343b82",
    },
    secondary: {
      main: "#F48FB1", // Rose Sakura
    },
    background: {
      default: "#FBEAE2", // Blanc Sakura
    },
    text: {
      primary: "#212121", // Noir Encre
      secondary: "#F48FB1", // Bleu Indigo
    },
    error: {
      main: "#B71C1C", // Rouge pour erreurs
    },
    success: {
      main: "#4CAF50", // Vert Bambou pour succès
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 5,
          minWidth: "6rem",
          width: "fit-content",
          color: "white",
          fontWeight: "400",
          textTransform: "none",
          padding: "5px 10px",
        }),
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        }),
        outlined: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          "&: hover": {
            backgroundColor: theme.palette.primary.light,
            color: "white",
          },
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 28,
          height: 16,
          padding: 0,
          marginRight: 4,
          display: "flex",

          "&:active": {
            "& .MuiSwitch-thumb": {
              width: 15,
            },
            "& .MuiSwitch-switchBase.Mui-checked": {
              transform: "translateX(9px)",
            },
          },
          "& .MuiSwitch-switchBase": {
            padding: 2,
            "&.Mui-checked": {
              transform: "translateX(12px)",
              color: "#fff",
              "& + .MuiSwitch-track": {
                opacity: 1,
              },
            },
          },
          "& .MuiSwitch-thumb": {
            boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
            width: 12,
            height: 12,
            borderRadius: 6,
          },
          "& .MuiSwitch-track": {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: "rgba(0,0,0,.25)",
            boxSizing: "border-box",
          },
        }),
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "& .MuiTypography-root": {
            fontSize: "0.8rem",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle1: ({ theme }) => ({
          fontSize: "0.6rem",
          color: theme.palette.secondary.main,
        }),
      },
    },
  },
});

export default customTheme;
