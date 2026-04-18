import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "@prerenderer/rollup-plugin";
import { products } from "./src/data/products";
import { cities } from "./src/data/cities";
import { punte } from "./src/data/punte";
import { posts } from "./src/data/blog";

// Build the list of routes to prerender from existing data sources.
// Keep in sync with src/routes.tsx + public/sitemap.xml.
function getPrerenderRoutes(): string[] {
  const staticRoutes = [
    "/",
    "/glossario-fresa-unghie",
    "/guide",
    "/chi-siamo",
    "/contatti",
    "/politica-reso",
    "/privacy-policy",
    "/termini-condizioni",
    "/cookie-policy",
  ];
  const productRoutes = products.map((p) => `/prodotto/${p.slug}`);
  const cityRoutes = cities.map((c) => `/spedizioni/${c.slug}`);
  const puntaRoutes = punte.map((p) => `/punta-fresa/${p.slug}`);
  const blogRoutes = posts.map((p) => `/guide/${p.slug}`);

  // Comparison: every unique pair of products
  const comparisonRoutes: string[] = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      comparisonRoutes.push(`/confronta/${products[i].slug}-vs-${products[j].slug}`);
    }
  }

  return [
    ...staticRoutes,
    ...productRoutes,
    ...cityRoutes,
    ...puntaRoutes,
    ...blogRoutes,
    ...comparisonRoutes,
  ];
}

// Prerendering is OPT-IN via env flag so the Lovable preview build (which
// runs in a sandbox without Chromium) is never broken. Enable it on Vercel
// by setting PRERENDER=1 in the project's environment variables, OR by
// changing the build command to `PRERENDER=1 npm run build`.
const shouldPrerender = process.env.PRERENDER === "1";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ...(shouldPrerender && mode === "production"
      ? [
          prerender({
            routes: getPrerenderRoutes(),
            renderer: "@prerenderer/renderer-puppeteer",
            rendererOptions: {
              // Wait until the React app fires window.dispatchEvent(new Event('render-event'))
              // — emitted from src/main.tsx after hydration.
              renderAfterDocumentEvent: "render-event",
              // Headless Chrome flags compatible with Vercel build env
              maxConcurrentRoutes: 4,
              headless: true,
              launchOptions: {
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
              },
              timeout: 60000,
            },
            postProcess(renderedRoute: any) {
              // Normalize trailing slashes + remove dev-only nodes
              renderedRoute.html = renderedRoute.html
                .replace(/<script[^>]*lovable-tagger[^>]*>[\s\S]*?<\/script>/g, "")
                .trim();
              return renderedRoute;
            },
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Shim: original repo used vite-react-ssg for SSR/SSG.
      // In the Lovable SPA build we redirect those imports to a tiny
      // shim that re-exports react-helmet-async's <Helmet> as <Head>.
      "vite-react-ssg": path.resolve(__dirname, "./src/lib/ssg-shim.ts"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom") || id.includes("react/") || id.includes("react-router")) return "react-vendor";
          if (id.includes("@supabase")) return "supabase";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("recharts") || id.includes("d3-")) return "charts";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("embla-carousel")) return "carousel";
          if (id.includes("lucide-react")) return "icons";
        },
      },
    },
  },
}));
