import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
