// Dependencies
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";

// Styles
import "./cssReset.scss";
import "./index.scss";

// Components
import App from "./App";
import WebFont from "webfontloader";

Amplify.configure(config);

WebFont.load({
  google: {
    families: ["Merriweather&display=swap", "Mulish:wght@300&display=swap"],
  },
});

const container = document.getElementById("root") as HTMLElement;
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  container
);
