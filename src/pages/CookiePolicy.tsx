import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => (
  <>
    <Helmet>
      <title>Cookie Policy | Informativa sui Cookie | fresaunghie.store</title>
      <meta name="description" content="Informativa sui cookie di fresaunghie.store. Scopri quali cookie utilizziamo, perché li usiamo e come puoi gestirli in conformità al GDPR." />
      <link rel="canonical" href="https://fresaunghie.store/cookie-policy" />
    </Helmet>
    <Navbar />
    <main className="bg-nero min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-sans text-sm mb-8">
          ← Torna alla Home
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-8">
          Cookie <span className="italic text-gold">Policy</span>
        </h1>
        <div className="space-y-8 text-cream/70 font-sans text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">1. Cosa Sono i Cookie</h2>
            <p>I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo quando visiti un sito web. Ci permettono di riconoscerti, ricordare le tue preferenze e migliorare la tua esperienza di navigazione.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">2. Cookie Tecnici (Necessari)</h2>
            <p>Utilizziamo cookie tecnici strettamente necessari per il funzionamento del sito, come il mantenimento della sessione di login e del carrello. Questi cookie non richiedono il tuo consenso in quanto essenziali per il servizio.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">3. Cookie Analitici</h2>
            <p>Potremmo utilizzare cookie analitici (come Google Analytics) per comprendere come gli utenti navigano il sito e migliorare l'esperienza. Questi dati sono raccolti in forma aggregata e anonima.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">4. Cookie di Terze Parti</h2>
            <p>Il nostro sito può utilizzare servizi di terze parti (come PayPal per i pagamenti) che installano propri cookie. Ti invitiamo a consultare le rispettive informative sulla privacy di questi servizi.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">5. Gestione dei Cookie</h2>
            <p>Puoi gestire le preferenze sui cookie attraverso le impostazioni del tuo browser. La disabilitazione di alcuni cookie potrebbe influire sul funzionamento del sito. I cookie tecnici non possono essere disabilitati in quanto essenziali.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">6. Riferimenti Normativi</h2>
            <p>La presente Cookie Policy è redatta in conformità al Regolamento UE 2016/679 (GDPR), al D.Lgs. 196/2003 e alle Linee Guida del Garante per la protezione dei dati personali (provvedimento del 10 giugno 2021).</p>
          </section>
          <p className="text-cream/40 text-xs mt-8">Ultimo aggiornamento: Marzo 2026</p>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default CookiePolicy;
