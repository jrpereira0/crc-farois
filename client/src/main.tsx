import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { useEffect } from "react";

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  AOS.init({
    duration: 800,
    once: true
  });
});

createRoot(document.getElementById("root")!).render(<App />);
