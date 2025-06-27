import { FC } from "react";
import { Toaster, toast } from "sonner";
import { ToastProviderProps } from "../../types/ui/toast";
import { ToastContext } from "../../context/ToastContext";

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const success = (message: string) => toast.success(message);
  const error = (message: string) => toast.error(message);
  const info = (message: string) => toast.info(message);
  const warning = (message: string) => toast.warning(message);

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      <Toaster position="top-right" richColors expand={true} />
      {children}
    </ToastContext.Provider>
  );
};
