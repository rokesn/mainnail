import { useParams, Link } from "react-router-dom";
import { Head } from "@/lib/ssg-shim";
import { getPuntaBySlug } from "@/data/punte";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { ChevronRight } from "lucide-react";

const PuntaPage = () => {
  const { type } = useParams<{ type: string }>();
  const punta = getPuntaBySlug(type || "");

  if (!punta) {
    return (
      <div className="min-h-screen bg-nero flex items-center justify-center">
        <p className="text-cream font-sans">Punta non trovata.</p>
      </div>
    );
  }

  const pageUrl = `https://fresaunghie.store/punta-fresa/${punta.slug}`;
  const publishDate = "2026-01-15";
  const modifiedDate = "2026-03-31";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Punta Fresa Unghie ${punta.name}: Come si Usa e a Cosa Serve`,
    "description": `${punta.name}: ${punta.useCase}. Scopri come usare la punta ${punta.slug} per fresa unghie, il materiale (${punta.material}) e i consigli professionali.`,
    "author": { "@type": "Person", "name": "Francesca Conti", "url": "https://fresaunghie.store/chi-siamo" },
    "publisher": { "@type": "Organization", "name": "Fresa Unghie Pro", "url": "https://fresaunghie.store", "logo": { "@type": "ImageObject", "url": "https://fresaunghie.store/favicon.png" } },
    "mainEntityOfPage": pageUrl,
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "image": products[0].mainImage
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fresaunghie.store" },
      { "@type": "ListItem", "position": 2, "name": "Guide", "item": "https://fresaunghie.store/glossario-fresa-unghie" },
      { "@type": "ListItem", "position": 3, "name": punta.name, "item": pageUrl }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Come usare la ${punta.name} per fresa unghie`,
    "description": `Guida all'uso della ${punta.name} (${punta.material}) per fresa per unghie professionale.`,
    "step": [
      { "@type": "HowToStep", "name": "Seleziona la punta", "text": `Scegli la ${punta.name} dal kit di 12 punte incluse.` },
      { "@type": "HowToStep", "name": "Inserisci nel manipolo", "text": "Inserisci la punta nel manipolo della fresa fino al click di sicurezza." },
      { "@type": "HowToStep", "name": "Imposta la velocità", "text": "Inizia dalla velocità più bassa e aumenta gradualmente secondo la lavorazione." },
      { "@type": "HowToStep", "name": "Applica la tecnica", "text": punta.whenToUse }
    ]
  };

  return (
    <>
      <Head>
        <title>Punta Fresa Unghie {punta.name}: Come si Usa e a Cosa Serve | fresaunghie.store</title>
        <meta name="description" content={`${punta.name} per fresa unghie: ${punta.useCase}. Materiale: ${punta.material}. Scopri come usarla correttamente e quali prodotti la includono. Guida professionale.`} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`${punta.name} per Fresa Unghie – Guida Completa`} />
        <meta property="og:description" content={`${punta.name}: ${punta.useCase}. Materiale ${punta.material}. Inclusa nel kit 12 punte.`} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Head>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-cream pt-20 md:pt-32">
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 pb-4">
          <ol className="flex items-center gap-1 text-xs font-sans text-muted-foreground">
            <li><Link to="/" className="hover:text-gold-dark">Home</Link></li>
            <li><ChevronRight size={12} /></li>
            <li><Link to="/glossario-fresa-unghie" className="hover:text-gold-dark">Guide</Link></li>
            <li><ChevronRight size={12} /></li>
            <li className="text-foreground font-medium">{punta.name}</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto px-4 pb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            {punta.name} per Fresa Unghie — <span className="italic text-gold-dark">Guida e Utilizzo</span>
          </h1>
          <p className="text-xs text-muted-foreground font-sans mb-6">
            Scritto da <Link to="/chi-siamo" className="text-gold-dark hover:underline">Francesca Conti</Link> · Aggiornato il 31 marzo 2026
          </p>

          <div className="space-y-6 text-muted-foreground font-sans leading-relaxed">
            <div className="bg-background border border-border rounded-xl p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">Materiale</dt>
                  <dd>{punta.material}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Uso Ideale</dt>
                  <dd>{punta.useCase}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Inclusa in</dt>
                  <dd>Kit 12 punte</dd>
                </div>
              </dl>
            </div>

            <h2 className="font-serif text-xl font-bold text-foreground">Cos'è la {punta.name}?</h2>
            <p>{punta.description}</p>

            <h2 className="font-serif text-xl font-bold text-foreground">Quando e Come Usare la {punta.name}</h2>
            <p>{punta.whenToUse}</p>

            <h2 className="font-serif text-xl font-bold text-foreground">Errori Comuni da Evitare</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Non premere troppo: la {punta.name} deve scorrere leggermente sulla superficie, senza forza eccessiva.</li>
              <li>Non usarla su unghie infiammate o danneggiate — aspetta la guarigione completa.</li>
              <li>Pulisci la punta dopo ogni utilizzo con la spazzolina inclusa nel kit.</li>
              <li>Inizia sempre dalla velocità più bassa per controllare il risultato.</li>
            </ul>

            <h2 className="font-serif text-xl font-bold text-foreground">In Quali Prodotti è Inclusa</h2>
            <p>{punta.productsIncluded}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {products.map(product => (
                <Link key={product.id} to={`/prodotto/${product.slug}`} className="block bg-background border border-border rounded-xl overflow-hidden group hover:border-gold/30 transition-colors">
                  <img src={product.mainImage} alt={`${product.name} con ${punta.name} inclusa`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-bold text-foreground">{product.name}</h3>
                    <p className="text-gold-dark font-serif text-xl font-bold mt-2">{product.priceFormatted}</p>
                    <p className="text-green-600 text-xs mt-1">✓ {punta.name} inclusa nel kit</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 mt-4">
              <p className="text-sm font-sans font-semibold text-foreground mb-1">Esplora tutte le punte</p>
              <p className="text-xs text-muted-foreground mb-3">Scopri la nostra guida completa alle punte per fresa per unghie.</p>
              <Link to="/glossario-fresa-unghie" className="text-gold-dark text-sm font-sans font-semibold hover:underline">→ Glossario Fresa Unghie</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default PuntaPage;
