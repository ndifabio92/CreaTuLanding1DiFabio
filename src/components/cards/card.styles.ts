import { SxProps, Theme } from "@mui/material";

export const cardStyles: SxProps<Theme> = {
  width: "320px",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 2,
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
};
