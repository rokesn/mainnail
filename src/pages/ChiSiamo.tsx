import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Heart, Award, Shield } from "lucide-react";

const ChiSiamo = () => {
  return (
    <>
      <Helmet>
        <title>Chi Siamo | Fresa Unghie Pro | fresaunghie.store</title>
        <meta name="description" content="Scopri chi siamo: il team dietro Fresa Unghie Pro, specialisti in frese per unghie professionali in Italia. La nostra missione, esperienza e passione per il nail care." />
        <link rel="canonical" href="https://fresaunghie.store/chi-siamo" />
      </Helmet>
      <Navbar />
      <main className="bg-nero min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-sans text-sm mb-8">
            ← Torna alla Home
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-8">
            Chi <span className="italic text-gold">Siamo</span>
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Users, label: "Team Italiano", sub: "100% Made in Italy" },
              { icon: Heart, label: "Passione Nail Care", sub: "Dal 2024" },
              { icon: Award, label: "Qualità Professionale", sub: "Testata da esperti" },
              { icon: Shield, label: "Garanzia 12 Mesi", sub: "Acquisto sicuro" },
            ].map((item, i) => (
              <div key={i} className="bg-nero-card border border-gold/10 rounded-xl p-4 text-center">
                <item.icon className="mx-auto text-gold mb-2" size={24} />
                <p className="text-cream font-sans text-sm font-semibold">{item.label}</p>
                <p className="text-cream/40 font-sans text-xs">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8 text-cream/70 font-sans text-sm leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">La Nostra Storia</h2>
              <p>
                Fresa Unghie Pro nasce dalla passione per il nail care e dalla frustrazione di non trovare frese per unghie
                di qualità professionale a prezzi accessibili in Italia. Dopo anni di esperienza nel settore della bellezza
                e della cura personale, abbiamo deciso di selezionare e offrire solo i migliori strumenti per manicure e pedicure.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">La Nostra Missione</h2>
              <p>
                Vogliamo rendere accessibile a tutte la cura professionale delle unghie. Che tu sia una principiante che
                desidera prendersi cura delle proprie unghie a casa, o un'onicotecnica professionista che cerca strumenti
                affidabili per il proprio salone, abbiamo la fresa per unghie giusta per te.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">Perché Solo Frese per Unghie?</h2>
              <p>
                Crediamo nella specializzazione. Invece di vendere centinaia di prodotti diversi, ci concentriamo
                esclusivamente sulle frese per unghie professionali. Questo ci permette di selezionare solo i migliori
                prodotti, testarli personalmente e offrire un'assistenza clienti davvero competente e specializzata.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">I Nostri Numeri</h2>
              <p>
                Ad oggi abbiamo servito oltre <strong className="text-gold">1.200 clienti soddisfatti</strong> in tutta Italia,
                con un tasso di soddisfazione del <strong className="text-gold">98%</strong>. Le nostre frese per unghie sono
                state testate da onicotecniche professioniste e apprezzate sia per uso domestico che professionale.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">Contattaci</h2>
              <p>
                Hai domande? Il nostro team di supporto in italiano è a tua disposizione dal lunedì al venerdì,
                dalle 9:00 alle 18:00. Scrivici a{" "}
                <a href="mailto:supporto@fresaunghie.store" className="text-gold hover:underline">supporto@fresaunghie.store</a>{" "}
                o visita la nostra pagina <Link to="/contatti" className="text-gold hover:underline">Contatti</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ChiSiamo;
