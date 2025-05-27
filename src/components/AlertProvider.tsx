import { AlertEnum } from "@/enums/AlertEnum";
import { createContext, useContext, useState, type ReactNode } from "react";
import Alert from "./Alert";

type AlertContextType = {
  showAlert: (message: AlertMessage, variant: AlertEnum) => void;
};

type AlertMessage = {
    title: string;
    description: string;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert foi usado fora do contexto AlertProvider");
  }
  return context;
}

export function AlertProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<AlertMessage>({});
  const [variant, setVariant] = useState<AlertEnum>(AlertEnum.WARNING);

  const showAlert = (msg: AlertMessage, variant: AlertEnum) => {
    setMessage(msg);
    setVisible(true);
    setVariant(variant);
    setTimeout(() => setVisible(false), 3000); // fecha após 3s
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {visible && (
        <Alert
            variant={variant}
            title={message.title}
            description={message.description}
        />
      )}
    </AlertContext.Provider>
  );
}
