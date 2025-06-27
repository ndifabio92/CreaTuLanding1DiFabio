import type { FC } from "react";
import { AppRouter } from "./routes/AppRouter";
import { ThemeProvider } from "@mui/material";
import { ToastProvider } from "./components/providers/ToastProvider";
import { CartProvider } from "./components/providers/CartProvider";
import theme from "./styles/theme";


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
