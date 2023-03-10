// Dependencies
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactDOMClient from "react-dom/client";

// Styles
import "./cssReset.scss";
import "./index.scss";

// Components
import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
