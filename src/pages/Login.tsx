import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Errore", description: "Credenziali non valide. Riprova.", variant: "destructive" });
    } else {
      toast({ title: "✓ Accesso effettuato!" });
      const { data: isAdmin } = await supabase.rpc("has_role" as any, { _user_id: data.user.id, _role: "admin" });
      navigate(isAdmin ? "/admin" : "/account");
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "✓ Controlla la tua email!", description: "Link per il reset della password inviato." });
    }
  };

  return (
    <>
      <Helmet>
        <title>Accedi al tuo Account | fresaunghie.store</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="bg-nero min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div className="w-full max-w-md bg-nero-card border border-gold/10 rounded-2xl p-6 md:p-8">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-cream text-center mb-6">
            {resetMode ? "Reset Password" : "Accedi"}
          </h1>
          <form onSubmit={resetMode ? handleReset : handleLogin} className="space-y-4">
            <input
              type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-nero border border-gold/10 rounded-lg px-4 py-3 text-cream font-sans text-sm focus:border-gold outline-none"
            />
            {!resetMode && (
              <input
                type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-nero border border-gold/10 rounded-lg px-4 py-3 text-cream font-sans text-sm focus:border-gold outline-none"
              />
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-gold text-nero py-3 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors disabled:opacity-50">
              {loading ? "Caricamento..." : resetMode ? "Invia Link Reset" : "Accedi"}
            </button>
          </form>
          <div className="flex flex-col items-center gap-2 mt-4">
            <button onClick={() => setResetMode(!resetMode)} className="text-gold text-xs font-sans hover:underline">
              {resetMode ? "← Torna al login" : "Password dimenticata?"}
            </button>
            {!resetMode && (
              <p className="text-cream/40 text-xs font-sans">
                Non hai un account? <Link to="/registrati" className="text-gold hover:underline">Registrati</Link>
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
