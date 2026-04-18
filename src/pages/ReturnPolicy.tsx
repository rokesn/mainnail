import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield, Clock, RotateCcw, CheckCircle } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Reso Gratuito 30 Giorni | Garanzia 12 Mesi | fresaunghie.store</title>
        <meta name="description" content="Politica di reso gratuito entro 30 giorni per la tua fresa per unghie. Garanzia 12 mesi, rimborso in 5-7 giorni. Acquisto sicuro e senza rischi." />
        <link rel="canonical" href="https://fresaunghie.store/politica-reso" />
      </Helmet>
      <Navbar />
      <main className="bg-nero min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-sans text-sm mb-8"
          >
            <ArrowLeft size={16} /> Torna alla Home
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-8">
            Politica di <span className="italic text-gold">Reso e Rimborso</span>
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: RotateCcw, label: "Reso Gratuito", sub: "30 giorni" },
              { icon: Shield, label: "Garanzia", sub: "12 mesi" },
              { icon: Clock, label: "Rimborso", sub: "5-7 giorni" },
              { icon: CheckCircle, label: "Senza Rischi", sub: "100% sicuro" },
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
              <h2 className="font-serif text-xl font-bold text-cream mb-3">1. Diritto di Recesso</h2>
              <p>
                Hai il diritto di recedere dal contratto entro <strong className="text-gold">30 giorni</strong> dalla
                ricezione del prodotto, senza dover fornire alcuna motivazione. Questo periodo è esteso rispetto ai 14
                giorni previsti dalla legge italiana (D.Lgs. 206/2005), perché vogliamo che tu sia completamente
                soddisfatta del tuo acquisto.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">2. Come Effettuare un Reso</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Contattaci via email a <a href="mailto:supporto@fresaunghie.store" className="text-gold hover:underline">supporto@fresaunghie.store</a> indicando il numero d'ordine.</li>
                <li>Riceverai un'etichetta di reso prepagata entro 24 ore.</li>
                <li>Imballa il prodotto nella confezione originale e applica l'etichetta.</li>
                <li>Consegna il pacco al corriere o presso un punto di ritiro.</li>
              </ol>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">3. Condizioni del Reso</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Il prodotto deve essere nella confezione originale.</li>
                <li>Deve essere in condizioni sostanzialmente integre.</li>
                <li>Tutti gli accessori e le punte frese devono essere inclusi.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">4. Rimborso</h2>
              <p>
                Una volta ricevuto e verificato il reso, procederemo al rimborso completo entro <strong className="text-gold">5-7 giorni lavorativi</strong>.
                Il rimborso verrà effettuato sullo stesso metodo di pagamento utilizzato per l'acquisto.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">5. Garanzia 12 Mesi</h2>
              <p>
                Tutti i nostri prodotti sono coperti da una garanzia di <strong className="text-gold">12 mesi</strong> dalla
                data di acquisto. La garanzia copre difetti di fabbricazione e malfunzionamenti. In caso di prodotto
                difettoso, provvederemo alla sostituzione gratuita o al rimborso completo.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-cream mb-3">6. Contattaci</h2>
              <p>
                Per qualsiasi domanda sulla nostra politica di reso, contattaci a{" "}
                <a href="mailto:supporto@fresaunghie.store" className="text-gold hover:underline">
                  supporto@fresaunghie.store
                </a>
                . Il nostro team di supporto in italiano è disponibile dal lunedì al venerdì, dalle 9:00 alle 18:00.
              </p>
              <p className="mt-4">
                Scopri i nostri prodotti: <Link to="/prodotto/fresa-unghie-professionale" className="text-gold hover:underline">Fresa per unghie professionale uso personale</Link> e <Link to="/prodotto/fresa-professionale-salone" className="text-gold hover:underline">Fresa professionale 45000 RPM per salone</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReturnPolicy;
