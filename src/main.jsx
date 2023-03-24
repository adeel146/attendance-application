import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// import "@fullcalendar/react/dist/vdom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./assets/styles/main.css";
import "./assets/styles/tailwind.css";
import "./index.scss";

import App from "./App";
import "./i18nextConf";
import "./services/Interceptor";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </>
);
