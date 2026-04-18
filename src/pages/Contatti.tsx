import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Clock, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contatti = () => {
  const [form, setForm] = useState({ nome: "", email: "", oggetto: "", messaggio: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // For now, open mailto
    const subject = encodeURIComponent(form.oggetto || "Contatto dal sito");
    const body = encodeURIComponent(`Nome: ${form.nome}\nEmail: ${form.email}\n\n${form.messaggio}`);
    window.location.href = `mailto:supporto@fresaunghie.store?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast({ title: "✓ Il tuo client email si è aperto!", description: "Invia il messaggio da lì." });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contattaci | Assistenza Fresa Unghie | fresaunghie.store</title>
        <meta name="description" content="Contatta il team di Fresa Unghie Pro. Assistenza in italiano, rispondiamo entro 24 ore lavorative. Email: supporto@fresaunghie.store." />
        <link rel="canonical" href="https://fresaunghie.store/contatti" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contatti - Fresa Unghie Pro",
          "url": "https://fresaunghie.store/contatti",
          "mainEntity": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "supporto@fresaunghie.store",
            "availableLanguage": "Italian",
            "areaServed": "IT",
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          }
        })}</script>
      </Helmet>
      <Navbar />
      <main className="bg-nero min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-sans text-sm mb-8">
            ← Torna alla Home
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-8">
            <span className="italic text-gold">Contattaci</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Mail, label: "Email", sub: "supporto@fresaunghie.store" },
              { icon: Clock, label: "Orari", sub: "Lun-Ven 9:00-18:00" },
              { icon: MessageCircle, label: "Risposta", sub: "Entro 24 ore lavorative" },
            ].map((item, i) => (
              <div key={i} className="bg-nero-card border border-gold/10 rounded-xl p-4 text-center">
                <item.icon className="mx-auto text-gold mb-2" size={24} />
                <p className="text-cream font-sans text-sm font-semibold">{item.label}</p>
                <p className="text-cream/40 font-sans text-xs">{item.sub}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text" required placeholder="Nome e Cognome" value={form.nome}
                onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
                className="bg-nero-card border border-gold/10 rounded-lg px-4 py-3 text-cream font-sans text-sm focus:border-gold outline-none"
              />
              <input
                type="email" required placeholder="Email" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="bg-nero-card border border-gold/10 rounded-lg px-4 py-3 text-cream font-sans text-sm focus:border-gold outline-none"
              />
            </div>
            <input
              type="text" placeholder="Oggetto" value={form.oggetto}
              onChange={e => setForm(p => ({ ...p, oggetto: e.target.value }))}
              className="w-full bg-nero-card border border-gold/10 rounded-lg px-4 py-3 text-cream font-sans text-sm focus:border-gold outline-none"
            />
            <textarea
              required placeholder="Il tuo messaggio..." value={form.messaggio}
              onChange={e => setForm(p => ({ ...p, messaggio: e.target.value }))}
              rows={6}
              className="w-full bg-nero-card border border-gold/10 rounded-lg px-4 py-3 text-cream font-sans text-sm focus:border-gold outline-none resize-none"
            />
            <button
              type="submit" disabled={sending}
              className="bg-gold text-nero px-8 py-3 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {sending ? "Invio..." : "Invia Messaggio"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contatti;
