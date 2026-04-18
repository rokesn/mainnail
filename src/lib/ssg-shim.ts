// SPA shim for `vite-react-ssg`'s <Head> SEO component.
// We re-export react-helmet-async's <Helmet> under the same name so
// existing page code (`import { Head } from "vite-react-ssg"`) keeps working.
import { Helmet } from "react-helmet-async";

export const Head = Helmet;
