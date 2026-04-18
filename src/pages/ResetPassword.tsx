import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setValid(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Errore", description: "La password deve avere almeno 6 caratteri.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "✓ Password aggiornata!" });
      navigate("/account");
    }
  };

  if (!valid) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream flex items-center justify-center pt-24">
          <p className="font-sans text-muted-foreground">Link non valido o scaduto.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | Fresa Unghie Pro</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-cream flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-md bg-background border border-border rounded-xl p-8">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">Nuova Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-sans font-semibold text-foreground block mb-1">Nuova Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-gold text-nero py-3 rounded-md font-sans font-bold text-lg hover:bg-gold-light transition-colors disabled:opacity-50">
              {loading ? "Caricamento..." : "Aggiorna Password"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
