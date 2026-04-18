import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !localStorage.getItem("exit-intent-shown")) {
      setShow(true);
      localStorage.setItem("exit-intent-shown", "true");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("exit-intent-shown")) return;
    document.addEventListener("mouseleave", handleMouseLeave);
    // Mobile: show after 45s of inactivity
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768 && !localStorage.getItem("exit-intent-shown")) {
        setShow(true);
        localStorage.setItem("exit-intent-shown", "true");
      }
    }, 45000);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [handleMouseLeave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Could integrate with newsletter signup
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-nero/60 backdrop-blur-sm p-4">
      <div className="bg-background border border-border rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-2xl">
        <button onClick={() => setShow(false)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
          <X size={20} />
        </button>
        {submitted ? (
          <div className="text-center py-4">
            <p className="text-3xl mb-3">🎉</p>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">Grazie!</h3>
            <p className="text-muted-foreground font-sans text-sm">Controlla la tua email per il codice sconto.</p>
          </div>
        ) : (
          <>
            <p className="text-3xl text-center mb-3">⚡</p>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground text-center mb-2">
              Prima di andare...
            </h3>
            <p className="text-center text-gold-dark font-serif text-lg font-bold mb-1">10% DI SCONTO</p>
            <p className="text-center text-muted-foreground font-sans text-sm mb-5">sulla tua prima fresa per unghie!</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="La tua email..."
                className="w-full border border-border rounded-md px-4 py-3 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors"
              />
              <button type="submit" className="w-full bg-gold text-nero py-3 rounded-md font-sans font-bold hover:bg-gold-light transition-colors">
                Ottieni lo Sconto 🎁
              </button>
            </form>
            <p className="text-center text-muted-foreground/60 text-xs font-sans mt-3">Niente spam. Solo offerte esclusive.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ExitIntentPopup;
