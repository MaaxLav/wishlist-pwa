import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./styles/index.css";
import App from "./App.tsx";
import { FirebaseProvider } from "./firebase/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </StrictMode>
);
