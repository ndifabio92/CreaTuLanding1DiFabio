import type { FC } from "react";
import { AppRouter } from "./routes/AppRouter";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { CartProvider } from "./context/cart/CartProvider";
import { ToastProvider } from "./context/toast/ToastProvider";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
