import { createContext } from "react";
import { ToastContextType } from "../types/ui/toast";


export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
