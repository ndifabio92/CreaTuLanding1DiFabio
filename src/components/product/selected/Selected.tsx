import { Box, Chip } from "@mui/material";
import { selectedStyles } from "./selected.styles";

interface SelectedProps {
  selectedSize?: string;
  selectedColor?: string;
  isPopover?: boolean;
}

const Selected = ({
  selectedSize,
  selectedColor,
  isPopover = false,
}: SelectedProps) => {
  if (!selectedSize && !selectedColor) {
    return null;
  }

  return (
    <Box sx={selectedStyles.container}>
      {selectedSize && (
        <Chip
          label={`Size: ${selectedSize}`}
          size="small"
          variant="outlined"
          sx={selectedStyles.chip(isPopover)}
        />
      )}
      {selectedColor && (
        <Chip
          label={`Color: ${selectedColor}`}
          size="small"
          variant="outlined"
          sx={selectedStyles.chip(isPopover)}
        />
      )}
    </Box>
  );
};

export default Selected;
