import { Box, Typography, Chip, Stack } from "@mui/material";
import { optionsStyles } from "./Options.styles";

interface OptionsProps {
  type: "size" | "color";
  options: string[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  label: string;
  disabled?: boolean;
}

const Options = ({
  type: _type,
  options,
  selectedValue,
  onSelect,
  label,
  disabled = false,
}: OptionsProps) => {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <Box sx={optionsStyles.container}>
      <Typography variant="body2" sx={optionsStyles.label}>
        {label}:
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {options.map((option) => {
          const isSelected = selectedValue === option;
          return (
            <Chip
              key={option}
              label={option}
              onClick={() => !disabled && onSelect(option)}
              variant={isSelected ? "filled" : "outlined"}
              color={isSelected ? "primary" : "default"}
              sx={optionsStyles.chip(isSelected)}
              disabled={disabled}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default Options;
