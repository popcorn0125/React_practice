import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";

const container = document.getElementById("root"); // index.html에 있는 root를 말함
const root = ReactDOM.createRoot(container);
root.render(<App />);
