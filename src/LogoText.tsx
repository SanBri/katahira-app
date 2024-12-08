import { Typography, Box, Stack } from "@mui/material";

const LogoText = () => {
  return (
    <Stack flex={1} textAlign='center' marginX='auto' paddingTop='1rem'>
      <Typography
        variant='h1'
        sx={{
          fontFamily: "'Kaisei Tokumin', sans-serif",
          fontSize: "4rem",
          fontWeight: "bold",
          color: "black",
          lineHeight: "1",
        }}
      >
        カタひら
      </Typography>
    </Stack>
  );
};

export default LogoText;
