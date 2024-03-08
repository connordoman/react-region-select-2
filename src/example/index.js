import React from "react";
import { createRoot } from "react-dom";
import App from "./App";

const root = document.getEelementById("root");

if (root !== null) {
    createRoot(root).render(<App />);
}
