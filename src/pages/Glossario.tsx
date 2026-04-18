import { Head } from "@/lib/ssg-shim";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { punte } from "@/data/punte";
import { ChevronRight } from "lucide-react";

const glossaryTerms = [
  { term: "RPM (Giri al Minuto)", definition: "La velocità di rotazione della fresa per unghie, misurata in giri al minuto. 1.000-20.000 RPM per uso personale; 20.000-45.000 RPM per uso professionale da salone." },
  { term: "Manipolo", definition: "L'impugnatura ergonomica della fresa per unghie che contiene il motore e il sistema di aggancio delle punte. Un buon manipolo deve essere leggero, a bassa vibrazione e confortevole durante le sessioni prolungate." },
  { term: "Coppia Motore", definition: "La forza di rotazione del motore della fresa. Una coppia elevata è essenziale per la rimozione di gel e acrilico senza rallentamenti. Le frese professionali da salone hanno coppia motore superiore." },
  { term: "Attacco Standard 2.35mm", definition: "Il diametro universale dello stelo delle punte per fresa unghie. Con attacco da 2.35mm, le punte sono compatibili con la maggior parte delle frese professionali sul mercato." },
  { term: "Cuticola", definition: "La sottile pellicina di pelle alla base dell'unghia. La fresa per unghie, con punte diamantate o a sfera, permette una rimozione delicata e precisa delle cuticole senza tagli." },
  { term: "Gel UV", definition: "Materiale fotopolimerizzante applicato sull'unghia per ricostruzione o copertura. La fresa per unghie con punta in ceramica è lo strumento ideale per la rimozione del gel UV." },
  { term: "Acrilico", definition: "Sistema di ricostruzione unghie a base di polvere e liquido. Più duro del gel, richiede punte in carburo di tungsteno per la rimozione efficiente con la fresa." },
  { term: "Semipermanente", definition: "Smalto a lunga durata (2-3 settimane) che si polimerizza sotto lampada UV/LED. La fresa unghie accelera la rimozione del semipermanente rispetto alla limatura manuale." },
  { term: "Onicotecnica", definition: "Professionista specializzata nella cura e ricostruzione delle unghie. Le onicotecniche utilizzano frese professionali da 20.000+ RPM per il lavoro in salone." },
  { term: "Nail Art", definition: "L'arte della decorazione e personalizzazione delle unghie. La fresa per unghie con punta ad ago permette di creare micro-dettagli e incisioni decorative." },
  { term: "Buffing", definition: "Processo di lucidatura della superficie dell'unghia per renderla liscia e brillante. Si effettua con il buffing cap (punta in gomma/silicone) della fresa." },
  { term: "French Manicure", definition: "Stile classico con base rosa e punta bianca. La fresa unghie con punta a tronco di cono è ideale per creare la linea netta della french tip." },
  { term: "Refill", definition: "Ritocco della ricostruzione unghie per coprire la ricrescita. La fresa professionale velocizza il refill permettendo di limare la giunzione vecchio-nuovo materiale." },
  { term: "Type-C", definition: "Standard di ricarica USB universale. Le frese per unghie portatili con ricarica Type-C offrono praticità e velocità di ricarica superiore rispetto al micro-USB." },
  { term: "CE (Conformità Europea)", definition: "Marchio di conformità che indica che il prodotto rispetta le direttive dell'Unione Europea in materia di sicurezza. Le nostre frese per unghie sono certificate CE." },
];

const Glossario = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Glossario Fresa per Unghie",
    "description": "Glossario completo dei termini tecnici relativi alle frese per unghie professionali.",
    "hasDefinedTerm": glossaryTerms.map(t => ({
      "@type": "DefinedTerm",
      "name": t.term,
      "description": t.definition,
    }))
  };

  return (
    <>
      <Head>
        <title>Glossario Fresa per Unghie — Tutti i Termini Tecnici | fresaunghie.store</title>
        <meta name="description" content="Glossario completo della fresa per unghie: RPM, manipolo, cuticola, gel UV, acrilico e tutti i termini tecnici spiegati. Guida per principianti e professioniste." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://fresaunghie.store/glossario-fresa-unghie" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Head>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-cream pt-20 md:pt-32">
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 pb-4">
          <ol className="flex items-center gap-1 text-xs font-sans text-muted-foreground">
            <li><Link to="/" className="hover:text-gold-dark">Home</Link></li>
            <li><ChevronRight size={12} /></li>
            <li className="text-foreground font-medium">Glossario</li>
          </ol>
        </nav>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Glossario <span className="italic text-gold-dark">Fresa per Unghie</span>
          </h1>
          <p className="text-muted-foreground font-sans mb-10">
            Tutti i termini tecnici spiegati in modo chiaro e semplice. Dalla A alla Z del mondo delle frese per unghie professionali.
          </p>

          <div className="space-y-6">
            {glossaryTerms.map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-5">
                <h2 className="font-serif text-lg font-bold text-foreground">{item.term}</h2>
                <p className="text-muted-foreground font-sans text-sm mt-2 leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-6">
            Guide alle <span className="italic text-gold-dark">Punte per Fresa Unghie</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {punte.map(p => (
              <Link key={p.slug} to={`/punta-fresa/${p.slug}`} className="bg-background border border-border rounded-xl p-4 hover:border-gold/30 transition-colors">
                <h3 className="font-serif font-bold text-foreground text-sm">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.material} · {p.useCase}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Glossario;
