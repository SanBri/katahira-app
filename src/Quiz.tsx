import { Stack } from "@mui/system";
import { useRef, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  Grow,
  TextField,
  Typography,
} from "@mui/material";

import DataModel from "./models/DataModel";
import { data } from "./utils/data";

import ErrorAlert from "./ErrorAlert";
import AnsweredKatahiri from "./AnsweredKatahiri";
import FiltersSwitches from "./FiltersSwitches";

const Quiz = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [lastResultStatus, setlastResultStatus] = useState<
    "success" | "failure"
  >();
  const [gameStatus, setGameStatus] = useState<
    "filterRequested" | "readyToStart" | "isPlaying" | "isCanceled" | "isOver"
  >("filterRequested");
  const [answeredKatahiri] = useState<
    { katahiri: DataModel; status: "success" | "error" }[]
  >([]);

  const [currentKatahiri, setCurrentKatahiri] = useState<DataModel | null>(
    null
  );

  const [filters, setFilters] = useState<
    { label: "category" | "type"; value: string }[]
  >([]);

  const [kataHiriList, setKataHiriList] = useState<DataModel[]>(data);
  const [allKataHiriList, setAllKataHiriList] = useState<DataModel[]>(data);

  const [inputValue, setInputValue] = useState<string>("");

  // Chose a random katahiri
  const getRandomData = () => {
    // Reset lastResultStatus (remove text input error state & red color)
    setlastResultStatus("success");

    // Filter data with chosen filters
    const filteredKataHiriList = kataHiriList.filter((katahiri) =>
      filters.every((filter) => katahiri[filter.label] === filter.value)
    );

    allKataHiriList.length === 0 && setAllKataHiriList(filteredKataHiriList);

    // Generate a number to find a random katahiri
    const randomIndex = Math.floor(Math.random() * filteredKataHiriList.length);

    // Set the asked katahiri
    setCurrentKatahiri(filteredKataHiriList[randomIndex]);

    // Focus automaticatly text input
    inputRef.current?.focus(); // Met le focus sur l'input

    // Remove the asked katahiri to prevent it to be asked again
    let updatedKataHiriList = filteredKataHiriList.filter(
      (katahiri) => katahiri.symbol !== filteredKataHiriList[randomIndex].symbol
    );
    setKataHiriList(updatedKataHiriList);
  };

  const checkAnswer = (value: string) => {
    if (currentKatahiri) {
      setInputValue("");
      if (value === currentKatahiri?.romaji) {
        answeredKatahiri.push({ katahiri: currentKatahiri, status: "success" });
        getRandomData();
      } else {
        setlastResultStatus("failure");
      }
    }
    if (kataHiriList.length <= 0) {
      setGameStatus("isOver");
    }
  };

  return (
    <Stack flex={4}>
      {gameStatus === "isPlaying" ? (
        <>
          {currentKatahiri ? (
            <Stack
              flexDirection='column'
              gap='1rem'
              justifyContent='center'
              alignItems='center'
            >
              <Typography variant='subtitle2'>
                {answeredKatahiri?.length}/{allKataHiriList.length}
              </Typography>
              <Stack
                justifyContent='center'
                alignItems='center'
                width='6rem'
                height='6rem'
                bgcolor='white'
                boxShadow='0px 0px 2px black'
              >
                <Grow key={currentKatahiri.id} in={Boolean(currentKatahiri)}>
                  <Typography variant='h4'>{currentKatahiri.symbol}</Typography>
                </Grow>
              </Stack>
              <FormControl
                component='form'
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  checkAnswer(inputValue);
                }}
              >
                <TextField
                  ref={inputRef}
                  error={Boolean(lastResultStatus === "failure")}
                  autoFocus
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  sx={{ backgroundColor: "white", width: "6rem" }}
                />
                <Stack flexDirection='row' gap={"0.5rem"}>
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={() => {
                      answeredKatahiri.push({
                        katahiri: currentKatahiri,
                        status: "error",
                      });
                      getRandomData();
                    }}
                    sx={{ padding: "0.1rem" }}
                  >
                    Passer
                  </Button>
                </Stack>
              </FormControl>
            </Stack>
          ) : (
            <ErrorAlert
              retryFunction={() => getRandomData()}
              retryMessage={"Recharger"}
            />
          )}
        </>
      ) : gameStatus === "isOver" ? (
        <Card
          elevation={6}
          sx={{
            overflow: "scroll",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            padding: "2rem",
            backgroundColor: "primary.main",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Kaisei Tokumin', sans-serif",
              fontSize: "2rem",
            }}
          >
            FIN
          </Typography>
          {answeredKatahiri.map((item) => (
            <Typography
              key={item.katahiri.id}
              color={`${item.status}.main`}
              title={item.katahiri.romaji}
            >
              {item.katahiri.symbol}
            </Typography>
          ))}
        </Card>
      ) : gameStatus === "filterRequested" ? (
        <Stack gap={"1rem"} justifyContent='center' alignItems='center'>
          <FiltersSwitches filters={filters} setFilters={setFilters} />
          <Button
            variant='contained'
            size='small'
            onClick={() => {
              getRandomData();
              setGameStatus("isPlaying");
            }}
            disabled={
              !filters.some((filter) => filter.label === "category") ||
              !filters.some((filter) => filter.label === "type")
            }
          >
            Commencer
          </Button>
        </Stack>
      ) : (
        <ErrorAlert />
      )}
      {kataHiriList.length > 0 && (
        <Stack flexDirection='column' gap='1rem'>
          {answeredKatahiri.filter(
            (item) => item.katahiri.category === "katakana"
          ).length > 0 && (
            <AnsweredKatahiri
              answeredKatahiri={answeredKatahiri.filter(
                (item) => item.katahiri.category === "katakana"
              )}
            />
          )}
          {answeredKatahiri.filter(
            (item) => item.katahiri.category === "hiragana"
          ).length > 0 && (
            <AnsweredKatahiri
              answeredKatahiri={answeredKatahiri.filter(
                (item) => item.katahiri.category === "hiragana"
              )}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Quiz;
