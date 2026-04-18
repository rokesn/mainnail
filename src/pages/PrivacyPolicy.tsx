import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy | Informativa sulla Privacy | fresaunghie.store</title>
      <meta name="description" content="Informativa sulla privacy di Fresa Unghie Pro. Scopri come trattiamo i tuoi dati personali in conformità al GDPR e alla normativa italiana." />
      <link rel="canonical" href="https://fresaunghie.store/privacy-policy" />
    </Helmet>
    <Navbar />
    <main className="bg-nero min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-sans text-sm mb-8">
          ← Torna alla Home
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-8">
          Informativa sulla <span className="italic text-gold">Privacy</span>
        </h1>
        <div className="space-y-8 text-cream/70 font-sans text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">1. Titolare del Trattamento</h2>
            <p>Il titolare del trattamento dei dati personali è Fresa Unghie Pro, contattabile all'indirizzo email <a href="mailto:supporto@fresaunghie.store" className="text-gold hover:underline">supporto@fresaunghie.store</a>.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">2. Dati Raccolti</h2>
            <p>Raccogliamo i seguenti dati personali quando effettui un acquisto o ti registri sul nostro sito:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Nome e cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono</li>
              <li>Indirizzo di spedizione</li>
              <li>Dati di pagamento (gestiti da PayPal)</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">3. Finalità del Trattamento</h2>
            <p>I tuoi dati vengono utilizzati per: elaborare e spedire gli ordini, gestire il tuo account, comunicazioni relative agli ordini, assistenza clienti, e, previo consenso, invio di newsletter promozionali.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">4. Base Giuridica</h2>
            <p>Il trattamento dei dati è basato sull'esecuzione del contratto di vendita (Art. 6, comma 1, lett. b del GDPR), sul consenso per le comunicazioni di marketing (Art. 6, comma 1, lett. a), e sull'interesse legittimo per la prevenzione delle frodi.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">5. Conservazione dei Dati</h2>
            <p>I dati personali vengono conservati per il tempo necessario all'adempimento delle finalità indicate, e comunque non oltre i termini previsti dalla normativa fiscale e contabile italiana (10 anni per i dati contabili).</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">6. Diritti dell'Interessato</h2>
            <p>Ai sensi del GDPR (Reg. UE 2016/679) e del D.Lgs. 196/2003, hai il diritto di: accedere ai tuoi dati, rettificarli, cancellarli, limitare il trattamento, opporti al trattamento e alla portabilità dei dati. Per esercitare i tuoi diritti, contattaci a <a href="mailto:supporto@fresaunghie.store" className="text-gold hover:underline">supporto@fresaunghie.store</a>.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">7. Terze Parti</h2>
            <p>I tuoi dati possono essere condivisi con: PayPal (pagamenti), il corriere per la spedizione, e il provider di hosting del sito. Non vendiamo mai i tuoi dati a terzi.</p>
          </section>
          <p className="text-cream/40 text-xs mt-8">Ultimo aggiornamento: Marzo 2026</p>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default PrivacyPolicy;
