import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { HashRouter } from "react-router-dom";

import { HeroesApp } from "./HeroesApp.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter baseline="/">
      <HeroesApp />
    </HashRouter>
  </StrictMode>
);
