// React Library
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Main App Component
import App from "./App.tsx";

// Main CSS File
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
