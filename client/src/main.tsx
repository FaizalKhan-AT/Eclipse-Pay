import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import AuthContext from "@/context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <Toaster />
        <App />
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
