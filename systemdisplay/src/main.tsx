import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// 1. 将 BrowserRouter 修改为 HashRouter
import { HashRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
    <HashRouter>
      <App />
      <Toaster 
        position="top-center"
        toastOptions={{
          className: "py-4 px-6 text-xl",
          titleClass: "text-2xl font-bold",
          descriptionClass: "text-xl"
        }}
      />
    </HashRouter>
  </StrictMode>
);