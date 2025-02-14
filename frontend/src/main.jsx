import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster } from "sonner";
import { SocketProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
    <SocketProvider>
      <App />
      <Toaster closeButton />
    </SocketProvider>
//   </React.StrictMode>
);
