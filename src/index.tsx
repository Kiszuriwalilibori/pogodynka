import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "components";
import { breakWhenInternetExplorer } from "./js/functions";
import { TanstackQueryProvider, AppProvider } from "components";

breakWhenInternetExplorer();

const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppProvider>
      <TanstackQueryProvider>
        <App />
      </TanstackQueryProvider>
    </AppProvider>
  </React.StrictMode>
);
