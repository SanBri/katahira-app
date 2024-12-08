import {
  FormControlLabel,
  FormGroup,
  Grow,
  Stack,
  Switch,
} from "@mui/material";
import React, { useRef } from "react";

interface Props {
  filters: {
    label: "category" | "type";
    value: string;
  }[];
  setFilters: React.Dispatch<
    React.SetStateAction<
      {
        label: "category" | "type";
        value: string;
      }[]
    >
  >;
}

const FiltersSwitches = ({ filters, setFilters }: Props) => {
  const typesSwitchesFilters = useRef(null);
  const isFilterActive = (label: "category" | "type", value: string) =>
    !filters.some((filter) => filter.label === label && filter.value === value);

  const toggleFilter = (label: "category" | "type", value: string) => {
    setFilters((prevFilters) => {
      // Remove filter if already existing
      if (
        prevFilters.some(
          (filter) => filter.label === label && filter.value === value
        )
      ) {
        return prevFilters.filter(
          (filter) => !(filter.label === label && filter.value === value)
        );
      }
      // Add filter if not existing
      return [...prevFilters, { label, value }];
    });
  };

  return (
    <FormGroup
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      ref={typesSwitchesFilters}
    >
      <Stack flexDirection='row'>
        <FormControlLabel
          control={
            <Switch
              defaultChecked={isFilterActive("category", "hiragana")}
              checked={!isFilterActive("category", "hiragana")}
              onChange={() => toggleFilter("category", "hiragana")}
              size='small'
            />
          }
          label='Hiragana'
        />
        <FormControlLabel
          control={
            <Switch
              defaultChecked={isFilterActive("category", "katakana")}
              checked={!isFilterActive("category", "katakana")}
              onChange={() => toggleFilter("category", "katakana")}
              size='small'
            />
          }
          label='Katakana'
        />
      </Stack>
      {filters.some(
        (filter) => filter.value === "hiragana" || filter.value === "katakana"
      ) && (
        <Grow
          in={filters.some(
            (filter) =>
              filter.value === "hiragana" || filter.value === "katakana"
          )}
        >
          <Stack flexDirection='row'>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={isFilterActive("type", "basic")}
                  checked={!isFilterActive("type", "basic")}
                  onChange={() => toggleFilter("type", "basic")}
                  size='small'
                />
              }
              label='Basique'
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={isFilterActive("type", "diacritic")}
                  checked={!isFilterActive("type", "diacritic")}
                  onChange={() => toggleFilter("type", "diacritic")}
                  size='small'
                />
              }
              label='Diacritique'
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={isFilterActive("type", "combination")}
                  checked={!isFilterActive("type", "combination")}
                  onChange={() => toggleFilter("type", "combination")}
                  size='small'
                />
              }
              label='Combination'
            />
          </Stack>
        </Grow>
      )}
    </FormGroup>
  );
};

export default FiltersSwitches;
