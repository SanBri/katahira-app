import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Stack, Typography } from "@mui/material";
import LogoText from "./LogoText";
import Quiz from "./Quiz";
import customTheme from "./utils/customTheme";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Stack
        height='100vh'
        bgcolor={"background.default"}
        justifyContent='center'
        gap={6}
      >
        <LogoText />
        <Quiz />
        <Typography variant='subtitle1' textAlign={"right"} pb='1rem' pr='1rem'>
          Développé par SanB ☁️
        </Typography>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
