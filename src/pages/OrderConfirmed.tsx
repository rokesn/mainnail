import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderConfirmedPage = () => {
  const [params] = useSearchParams();
  const ordine = params.get("ordine") || "0000";
  const email = params.get("email") || "";
  const isNewAccount = params.get("nuovo") === "1";

  return (
    <>
      <Helmet>
        <title>Ordine Confermato | Fresa Unghie Pro</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-cream flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="mx-auto text-gold-dark mb-6" size={64} />
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Ordine #{ordine} confermato!
          </h1>
          <p className="text-muted-foreground font-sans mb-4">
            Riceverai una email di conferma a <strong>{decodeURIComponent(email)}</strong>
          </p>

          {isNewAccount && (
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-sans font-semibold text-foreground mb-1">🎉 Account creato con successo!</p>
              <p className="text-xs text-muted-foreground font-sans">
                Il tuo account è stato creato con l'email <strong>{decodeURIComponent(email)}</strong>. 
                Accedi al tuo account per tracciare i tuoi ordini e vedere lo stato della spedizione.
              </p>
            </div>
          )}

          <p className="text-muted-foreground font-sans text-sm mb-8">
            📦 Consegna stimata entro 7 giorni lavorativi
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/account"
              className="inline-block bg-gold text-nero px-8 py-3 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors"
            >
              Vai al Mio Account
            </Link>
            <Link
              to="/"
              className="inline-block bg-background border border-border text-foreground px-8 py-3 rounded-md font-sans font-semibold hover:border-gold transition-colors"
            >
              Torna alla Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderConfirmedPage;
