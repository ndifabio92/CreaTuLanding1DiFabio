import { useContext } from "react";
import { ToastContextType } from "../types/ui/toast";
import { ToastContext } from "../context/ToastContext";

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
