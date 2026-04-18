import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import App from "./App";
// Self-hosted fonts (replaces external Google Fonts request → faster LCP)
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/700-italic.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/jost/600.css";
import "@fontsource/jost/700.css";
import "./index.css";

const RoutedApp = () => {
  const element = useRoutes(routes);
  return element;
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <App>
      <RoutedApp />
    </App>
  </BrowserRouter>
);

// Signal to @prerenderer/rollup-plugin (vite.config.ts) that the app is
// fully hydrated and ready to snapshot. Wrapped in two rAFs + a small
// timeout so React, react-helmet-async, and lazy-loaded route chunks
// have time to commit their <head> tags before HTML serialization.
if (typeof window !== "undefined") {
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      setTimeout(() => {
        document.dispatchEvent(new Event("render-event"));
      }, 100)
    )
  );
}
