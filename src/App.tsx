import type { FC } from "react";
import { AppRouter } from "./routes/AppRouter";
import { ThemeProvider } from "@mui/material";
import { ToastProvider } from "./providers/ToastProvider";
import { CartProvider } from "./providers/CartProvider";
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
