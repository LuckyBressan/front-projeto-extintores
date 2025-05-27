import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/css/index.css";

import { AlertProvider } from "./components/AlertProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </StrictMode>
);
