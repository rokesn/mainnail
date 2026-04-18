import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

// Lazy-loaded pages (code splitting for performance)
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmed = lazy(() => import("./pages/OrderConfirmed"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Account = lazy(() => import("./pages/Account"));
const Admin = lazy(() => import("./pages/Admin"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));
const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));
const Contatti = lazy(() => import("./pages/Contatti"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TerminiCondizioni = lazy(() => import("./pages/TerminiCondizioni"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const CityPage = lazy(() => import("./pages/CityPage"));
const PuntaPage = lazy(() => import("./pages/PuntaPage"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));
const Glossario = lazy(() => import("./pages/Glossario"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const PageLoader = () => (
  <div className="min-h-screen bg-nero flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

const Lazy = ({ component: Component }: { component: React.ComponentType }) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// SPA route config (converted from vite-react-ssg).
// Providers live in App.tsx so the layout route here is just an Outlet wrapper.
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Index /> },
      { path: "glossario-fresa-unghie", element: <Lazy component={Glossario} /> },
      { path: "guide", element: <Lazy component={Blog} /> },
      { path: "guide/:slug", element: <Lazy component={BlogPost} /> },
      { path: "chi-siamo", element: <Lazy component={ChiSiamo} /> },
      { path: "contatti", element: <Lazy component={Contatti} /> },
      { path: "politica-reso", element: <Lazy component={ReturnPolicy} /> },
      { path: "privacy-policy", element: <Lazy component={PrivacyPolicy} /> },
      { path: "termini-condizioni", element: <Lazy component={TerminiCondizioni} /> },
      { path: "cookie-policy", element: <Lazy component={CookiePolicy} /> },
      { path: "prodotto/:slug", element: <ProductDetail /> },
      { path: "spedizioni/:city", element: <Lazy component={CityPage} /> },
      { path: "punta-fresa/:type", element: <Lazy component={PuntaPage} /> },
      { path: "confronta/:slugs", element: <Lazy component={ComparisonPage} /> },
      { path: "accedi", element: <Lazy component={Login} /> },
      { path: "registrati", element: <Lazy component={Register} /> },
      { path: "reset-password", element: <Lazy component={ResetPassword} /> },
      { path: "account", element: <Lazy component={Account} /> },
      { path: "admin", element: <Lazy component={Admin} /> },
      { path: "checkout", element: <Lazy component={Checkout} /> },
      { path: "ordine-confermato", element: <Lazy component={OrderConfirmed} /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
