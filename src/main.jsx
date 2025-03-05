import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App className="" />
    </CartProvider>
  </StrictMode>
);
