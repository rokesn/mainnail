import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", cognome: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast({ title: "Errore", description: "La password deve avere almeno 6 caratteri.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { nome: form.nome, cognome: form.cognome },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      // Update profile with name
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles" as any).update({
          nome: form.nome,
          cognome: form.cognome,
        }).eq("user_id", user.id);
      }
      toast({ title: "✓ Account creato!", description: "Benvenuta su Fresa Unghie Pro!" });
      navigate("/account");
    }
  };

  return (
    <>
      <Helmet>
        <title>Registrati | Crea Account | fresaunghie.store</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-cream flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <span className="font-serif text-2xl font-bold text-foreground">
              Fresa <span className="italic text-gold">Unghie</span> Pro
            </span>
          </div>
          <div className="bg-background border border-border rounded-xl p-8">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">Registrati</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-sans font-semibold text-foreground block mb-1">Nome</label>
                  <input name="nome" required value={form.nome} onChange={handleChange}
                    className="w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-sans font-semibold text-foreground block mb-1">Cognome</label>
                  <input name="cognome" required value={form.cognome} onChange={handleChange}
                    className="w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-foreground block mb-1">Email</label>
                <input name="email" type="email" required value={form.email} onChange={handleChange}
                  className="w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-foreground block mb-1">Password</label>
                <input name="password" type="password" required value={form.password} onChange={handleChange}
                  className="w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-gold text-nero py-3 rounded-md font-sans font-bold text-lg hover:bg-gold-light transition-colors disabled:opacity-50">
                {loading ? "Caricamento..." : "Crea Account"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground font-sans">
              Hai già un account?{" "}
              <Link to="/accedi" className="text-gold hover:underline">Accedi</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
