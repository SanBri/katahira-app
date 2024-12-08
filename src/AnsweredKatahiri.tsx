import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

import DataModel from "./models/DataModel";

interface Props {
  answeredKatahiri: { katahiri: DataModel; status: "success" | "error" }[];
}

const AnsweredKatahiri = ({ answeredKatahiri }: Props) => {
  return (
    <Stack
      width='fit-content'
      flexDirection={"row"}
      gap={"0.5rem"}
      mt='1rem'
      paddingX={"0.5rem"}
      marginX={"1rem"}
      sx={{ border: "1px solid grey" }}
    >
      {[...answeredKatahiri]
        .sort((a, b) => a.katahiri.id - b.katahiri.id)
        .map((item) => (
          <Typography
            key={item.katahiri.symbol}
            title={item.katahiri.romaji}
            sx={{
              cursor: "default",
            }}
            color={`${item.status}.main`}
          >
            {item.katahiri.symbol}
          </Typography>
        ))}
    </Stack>
  );
};

export default AnsweredKatahiri;
