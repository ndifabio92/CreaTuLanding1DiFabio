import type { FC } from "react";
import { AppRouter } from "./routes/AppRouter";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

const App: FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </>
  );
};

export default App;
