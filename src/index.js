import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import App from "./App";
import { FavoritesContextProvider } from "./store/favorites-context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <FavoritesContextProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </FavoritesContextProvider>
);
