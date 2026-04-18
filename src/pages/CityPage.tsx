import { useParams, Link } from "react-router-dom";
import { Head } from "@/lib/ssg-shim";
import { getCityBySlug } from "@/data/cities";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Truck, ChevronRight, MapPin, Clock, ShieldCheck } from "lucide-react";

const CityPage = () => {
  const { city } = useParams<{ city: string }>();
  const cityData = getCityBySlug(city || "");

  if (!cityData) {
    return (
      <div className="min-h-screen bg-nero flex items-center justify-center">
        <p className="text-cream font-sans">Pagina non trovata.</p>
      </div>
    );
  }

  const pageUrl = `https://fresaunghie.store/spedizioni/${cityData.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Fresa Unghie ${cityData.name}: Spedizione Gratuita e Consegna Rapida`,
    "description": `Fresa per unghie professionale con spedizione gratuita a ${cityData.name}, ${cityData.region}. Kit 12 punte da €29,99. Consegna in 5-7 giorni. Acquista ora!`,
    "url": pageUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Fresa Unghie Pro",
      "address": { "@type": "PostalAddress", "addressLocality": cityData.name, "addressCountry": "IT" }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fresaunghie.store" },
      { "@type": "ListItem", "position": 2, "name": "Spedizioni", "item": "https://fresaunghie.store/" },
      { "@type": "ListItem", "position": 3, "name": cityData.name, "item": pageUrl }
    ]
  };

  return (
    <>
      <Head>
        <title>Fresa Unghie {cityData.name}: Spedizione Gratuita e Consegna Rapida | fresaunghie.store</title>
        <meta name="description" content={`Fresa per unghie professionale con spedizione gratuita a ${cityData.name}. Kit 12 punte da €29,99. Consegna in 5-7 giorni lavorativi. Acquista ora su fresaunghie.store!`} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`Fresa Unghie ${cityData.name}: Spedizione Gratuita | fresaunghie.store`} />
        <meta property="og:description" content={`Fresa per unghie professionale con spedizione gratuita a ${cityData.name}. Kit 12 punte da €29,99.`} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Head>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-cream pt-20 md:pt-32">
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 pb-4">
          <ol className="flex items-center gap-1 text-xs font-sans text-muted-foreground">
            <li><Link to="/" className="hover:text-gold-dark">Home</Link></li>
            <li><ChevronRight size={12} /></li>
            <li><Link to="/" className="hover:text-gold-dark">Spedizioni</Link></li>
            <li><ChevronRight size={12} /></li>
            <li className="text-foreground font-medium">{cityData.name}</li>
          </ol>
        </nav>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Fresa Unghie <span className="italic text-gold-dark">{cityData.name}</span>: Spedizione Gratuita e Consegna Rapida
          </h1>

          <div className="space-y-6 text-muted-foreground font-sans leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-background border border-border rounded-xl p-4 flex items-center gap-3">
                <Truck className="text-gold-dark flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground text-sm">Spedizione Gratuita</p>
                  <p className="text-xs">A {cityData.name} e provincia</p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4 flex items-center gap-3">
                <Clock className="text-gold-dark flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground text-sm">5-7 Giorni Lavorativi</p>
                  <p className="text-xs">Consegna a {cityData.name}</p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4 flex items-center gap-3">
                <ShieldCheck className="text-gold-dark flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground text-sm">Reso Gratuito 30gg</p>
                  <p className="text-xs">Garanzia soddisfatti o rimborsati</p>
                </div>
              </div>
            </div>

            <p>
              Spediamo la nostra <strong>fresa per unghie professionale</strong> a <strong>{cityData.name}</strong> con corriere espresso. La consegna è completamente gratuita in tutta la {cityData.region} e in ogni altra regione d'Italia. Ordina entro le ore 14:00 per l'evasione in giornata — la tua fresa arriverà a {cityData.name} entro 5-7 giorni lavorativi.
            </p>

            <p>{cityData.uniqueNote}</p>

            <h2 className="font-serif text-xl font-bold text-foreground mt-8">I Nostri Prodotti Disponibili a {cityData.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {products.map(product => (
                <Link key={product.id} to={`/prodotto/${product.slug}`} className="block bg-background border border-border rounded-xl overflow-hidden group hover:border-gold/30 transition-colors">
                  <img src={product.mainImage} alt={`${product.name} — spedizione gratuita a ${cityData.name}`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="p-4">
                    <span className="bg-gold/20 text-gold-dark px-2 py-0.5 text-xs rounded-full font-sans">{product.badge}</span>
                    <h3 className="font-serif text-lg font-bold text-foreground mt-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                    <p className="text-gold-dark font-serif text-xl font-bold mt-3">{product.priceFormatted}</p>
                    <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                      <MapPin size={12} /> Spedizione gratuita a {cityData.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <h2 className="font-serif text-xl font-bold text-foreground mt-8">Perché Scegliere fresaunghie.store a {cityData.name}</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Spedizione <strong>sempre gratuita</strong> a {cityData.name} e in tutta Italia</li>
              <li>Consegna garantita in <strong>5-7 giorni lavorativi</strong></li>
              <li>Reso gratuito entro 30 giorni — <Link to="/politica-reso" className="text-gold-dark hover:underline">leggi la politica di reso</Link></li>
              <li>Kit completo con <strong>12 punte professionali</strong> incluse</li>
              <li>Assistenza clienti in italiano via <Link to="/contatti" className="text-gold-dark hover:underline">email e WhatsApp</Link></li>
              <li>Garanzia 12 mesi su tutti i prodotti</li>
            </ul>

            <h2 className="font-serif text-xl font-bold text-foreground mt-8">Le Punte Incluse nel Kit</h2>
            <p>Ogni fresa per unghie spedita a {cityData.name} include un kit completo di 12 punte professionali: <Link to="/punta-fresa/diamantata" className="text-gold-dark hover:underline">punta diamantata</Link>, <Link to="/punta-fresa/ceramica" className="text-gold-dark hover:underline">punta in ceramica</Link>, <Link to="/punta-fresa/carburo-di-tungsteno" className="text-gold-dark hover:underline">carburo di tungsteno</Link>, <Link to="/punta-fresa/a-fiamma" className="text-gold-dark hover:underline">punta a fiamma</Link> e molte altre. Tutto il necessario per manicure e pedicure professionali a casa o in salone.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CityPage;
