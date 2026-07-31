import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./app/page";
import "./app/globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Home />
      </ThemeProvider>
    </React.StrictMode>
  );
}
