import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { register } from "./serviceWorkerRegistration.ts";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtU7vXkUmc5jNxFQHCsq8-0gIZJ61mfpI",
  authDomain: "wishlist-pwa.firebaseapp.com",
  projectId: "wishlist-pwa",
  storageBucket: "wishlist-pwa.firebasestorage.app",
  messagingSenderId: "542728530822",
  appId: "1:542728530822:web:7126969671642cef005a07",
};

// Initialize Firebase

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

register();
initializeApp(firebaseConfig);
