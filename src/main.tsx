import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WebFont from "webfontloader";

import App from "./App";

import "./cssReset.scss";
import "./index.scss";

WebFont.load({
  google: {
    families: ["Merriweather&display=swap", "Mulish:wght@300&display=swap"],
  },
});

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

createRoot(container).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </StrictMode>
);
