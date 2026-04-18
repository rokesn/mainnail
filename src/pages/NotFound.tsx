import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Head } from "@/lib/ssg-shim";
import { products } from "@/data/products";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Head>
        <title>Pagina non trovata (404) | fresaunghie.store</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="text-center max-w-md">
          <p className="text-gold-dark font-sans text-sm font-semibold mb-2">Errore 404</p>
          <h1 className="mb-4 text-4xl font-bold font-serif text-foreground">Pagina non trovata</h1>
          <p className="mb-8 text-muted-foreground font-sans">La pagina che stai cercando non esiste o è stata spostata.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link to="/" className="bg-foreground text-background px-6 py-3 rounded-lg font-sans font-semibold text-sm hover:bg-gold-dark transition-colors">
              Torna alla Homepage
            </Link>
            <Link to="/glossario-fresa-unghie" className="border border-border text-foreground px-6 py-3 rounded-lg font-sans font-semibold text-sm hover:border-gold-dark transition-colors">
              Guida alla Fresa
            </Link>
          </div>
          <p className="text-sm font-sans font-semibold text-foreground mb-3">I nostri prodotti:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {products.map(p => (
              <Link key={p.id} to={`/prodotto/${p.slug}`} className="text-gold-dark font-sans text-sm hover:underline">
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
