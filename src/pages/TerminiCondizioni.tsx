import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TerminiCondizioni = () => (
  <>
    <Helmet>
      <title>Termini e Condizioni di Vendita | fresaunghie.store</title>
      <meta name="description" content="Termini e condizioni di vendita di Fresa Unghie Pro. Informazioni su acquisti, spedizioni, resi e garanzia per le frese per unghie professionali." />
      <link rel="canonical" href="https://fresaunghie.store/termini-condizioni" />
    </Helmet>
    <Navbar />
    <main className="bg-nero min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-sans text-sm mb-8">
          ← Torna alla Home
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-8">
          Termini e <span className="italic text-gold">Condizioni</span>
        </h1>
        <div className="space-y-8 text-cream/70 font-sans text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">1. Ambito di Applicazione</h2>
            <p>Le presenti condizioni generali di vendita si applicano a tutti gli acquisti effettuati sul sito fresaunghie.store. Effettuando un ordine, il cliente accetta integralmente le presenti condizioni ai sensi del D.Lgs. 206/2005 (Codice del Consumo).</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">2. Prodotti e Prezzi</h2>
            <p>I prezzi indicati sul sito sono in Euro (€), IVA inclusa. Le immagini dei prodotti sono rappresentative e possono differire leggermente dal prodotto reale. Ci riserviamo il diritto di modificare i prezzi in qualsiasi momento, senza preavviso, ma gli ordini già confermati non saranno influenzati.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">3. Ordini e Pagamenti</h2>
            <p>L'ordine si intende perfezionato al momento della ricezione del pagamento. Accettiamo pagamenti tramite PayPal e carte di credito/debito principali. L'elaborazione dell'ordine avviene entro 1-2 giorni lavorativi.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">4. Spedizioni</h2>
            <p>La spedizione è gratuita su tutti gli ordini in Italia. I tempi di consegna sono di circa 7 giorni lavorativi dalla conferma dell'ordine. Il cliente riceverà un'email con il link di tracciamento della spedizione.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">5. Diritto di Recesso</h2>
            <p>Il cliente ha diritto di recedere dal contratto entro 30 giorni dalla ricezione del prodotto, senza dover fornire motivazione, in conformità con il D.Lgs. 206/2005. Per maggiori dettagli, consulta la nostra <Link to="/politica-reso" className="text-gold hover:underline">Politica di Reso</Link>.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">6. Garanzia</h2>
            <p>Tutti i prodotti sono coperti dalla garanzia legale di conformità di 24 mesi (D.Lgs. 206/2005, art. 128-135). In aggiunta, offriamo una garanzia commerciale di 12 mesi dalla data di acquisto che copre difetti di fabbricazione.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-cream mb-3">7. Legge Applicabile e Foro Competente</h2>
            <p>Le presenti condizioni sono regolate dalla legge italiana. Per qualsiasi controversia sarà competente il foro del consumatore, ai sensi dell'art. 66-bis del Codice del Consumo.</p>
          </section>
          <p className="text-cream/40 text-xs mt-8">Ultimo aggiornamento: Marzo 2026</p>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default TerminiCondizioni;
