import type { FC } from "react";
import { AppRouter } from "./routes/AppRouter";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { CartProvider } from "./context/CartContext";

const App: FC = () => {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </CartProvider>
  );
};

export default App;
