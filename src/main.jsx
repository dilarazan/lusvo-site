import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import mountReveal from "./utils/reveal";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// Reveal’ı DOM hazır olunca başlat
+ requestAnimationFrame(() => mountReveal());

;
