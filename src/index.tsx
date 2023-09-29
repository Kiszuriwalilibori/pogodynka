import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { App } from "components";
import { breakWhenInternetExplorer } from "./js/functions";
import { TanstackQueryProvider, AppProvider } from "components";

breakWhenInternetExplorer();

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <AppProvider>
    <TanstackQueryProvider>
      <App />
    </TanstackQueryProvider>
  </AppProvider>
);
