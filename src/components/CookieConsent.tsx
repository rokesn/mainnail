import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-nero border-t border-gold/20 p-4 md:p-6 shadow-2xl">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-cream/80 text-sm font-sans leading-relaxed">
            🍪 Utilizziamo i cookie per migliorare la tua esperienza di navigazione e analizzare il traffico del sito.
            Leggi la nostra{" "}
            <Link to="/cookie-policy" className="text-gold hover:underline">Cookie Policy</Link> e la{" "}
            <Link to="/privacy-policy" className="text-gold hover:underline">Privacy Policy</Link> per maggiori informazioni.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={decline} className="px-4 py-2 border border-gold/30 text-cream/60 rounded-md text-sm font-sans hover:border-gold/50 transition-colors">
            Rifiuta
          </button>
          <button onClick={accept} className="px-6 py-2 bg-gold text-nero rounded-md text-sm font-sans font-semibold hover:bg-gold-light transition-colors">
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
