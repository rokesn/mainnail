import { useParams, Link } from "react-router-dom";
import { Head } from "@/lib/ssg-shim";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { ChevronRight, Check, X } from "lucide-react";

const ComparisonPage = () => {
  const { slugs } = useParams<{ slugs: string }>();
  const { addItem } = useCart();
  const parts = (slugs || "").split("-vs-");

  const productA = products.find(p => p.slug === parts[0]);
  const productB = products.find(p => p.slug === parts[1]);

  if (!productA || !productB) {
    return (
      <div className="min-h-screen bg-nero flex items-center justify-center">
        <p className="text-cream font-sans">Confronto non disponibile.</p>
      </div>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${productA.name} vs ${productB.name} — Confronto`,
    "description": `Confronto dettagliato tra ${productA.name} e ${productB.name}. Scopri quale fresa per unghie è giusta per te.`,
    "url": `https://fresaunghie.store/confronta/${slugs}`
  };

  const comparisonRows = [
    { label: "Prezzo", a: productA.priceFormatted, b: productB.priceFormatted },
    { label: "Uso Ideale", a: "Uso personale / Casa", b: "Uso salone / Professionale" },
    { label: "RPM", a: "Fino a 20.000", b: "Fino a 45.000" },
    { label: "Punte Incluse", a: "12 punte professionali", b: "12 punte professionali" },
    { label: "Alimentazione", a: "Ricarica Type-C (wireless)", b: "Plug-in (cavo)" },
    { label: "Portatile", a: "yes", b: "no" },
    { label: "Adatta ai Principianti", a: "yes", b: "no" },
    { label: "Adatta al Salone", a: "no", b: "yes" },
    { label: "Gift Box", a: "yes", b: "yes" },
    { label: "Coppia Motore", a: "Standard", b: "Alta coppia professionale" },
    { label: "Raffreddamento", a: "No", b: "Sistema integrato" },
    { label: "Garanzia", a: "12 mesi", b: "12 mesi" },
    { label: "Spedizione", a: "Gratuita", b: "Gratuita" },
  ];

  const renderCell = (value: string) => {
    if (value === "yes") return <Check className="text-green-600 mx-auto" size={18} />;
    if (value === "no") return <X className="text-red-400 mx-auto" size={18} />;
    return <span>{value}</span>;
  };

  return (
    <>
      <Head>
        <title>Fresa Unghie Personale vs Professionale Salone – Quale Scegliere? | fresaunghie.store</title>
        <meta name="description" content={`Confronto completo tra ${productA.name} (${productA.priceFormatted}) e ${productB.name} (${productB.priceFormatted}). Scopri differenze, caratteristiche e quale fresa per unghie scegliere. Guida all'acquisto.`} />
        <link rel="canonical" href={`https://fresaunghie.store/confronta/${slugs}`} />
        <meta property="og:title" content="Fresa Unghie Personale vs Professionale Salone – Confronto Completo" />
        <meta property="og:description" content={`Confronto tra ${productA.name} e ${productB.name}. Scopri quale fresa per unghie è giusta per te.`} />
        <meta property="og:url" content={`https://fresaunghie.store/confronta/${slugs}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fresaunghie.store" },
            { "@type": "ListItem", "position": 2, "name": "Confronto", "item": `https://fresaunghie.store/confronta/${slugs}` }
          ]
        })}</script>
      </Head>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-cream pt-20 md:pt-32">
        <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-4 pb-4">
          <ol className="flex items-center gap-1 text-xs font-sans text-muted-foreground">
            <li><Link to="/" className="hover:text-gold-dark">Home</Link></li>
            <li><ChevronRight size={12} /></li>
            <li className="text-foreground font-medium">Confronto</li>
          </ol>
        </nav>

        <section className="max-w-5xl mx-auto px-4 pb-16">
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-foreground text-center mb-8">
            {productA.name} <span className="text-gold-dark italic">vs</span> {productB.name}
          </h1>
          <p className="text-center text-muted-foreground font-sans mb-10 max-w-2xl mx-auto">
            Non sai quale <strong>fresa per unghie</strong> scegliere? Ecco il confronto completo tra i nostri due modelli per aiutarti a decidere in base alle tue esigenze.
          </p>

          {/* Product images */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <Link to={`/prodotto/${productA.slug}`} className="text-center group">
              <img src={productA.mainImage} alt={productA.name} className="w-full h-48 md:h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
              <h2 className="font-serif text-lg font-bold text-foreground mt-3">{productA.name}</h2>
              <p className="text-gold-dark font-serif text-2xl font-bold">{productA.priceFormatted}</p>
            </Link>
            <Link to={`/prodotto/${productB.slug}`} className="text-center group">
              <img src={productB.mainImage} alt={productB.name} className="w-full h-48 md:h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
              <h2 className="font-serif text-lg font-bold text-foreground mt-3">{productB.name}</h2>
              <p className="text-gold-dark font-serif text-2xl font-bold">{productB.priceFormatted}</p>
            </Link>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm font-sans">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Caratteristica</th>
                  <th className="border border-border px-4 py-3 text-center font-semibold text-foreground">{productA.name}</th>
                  <th className="border border-border px-4 py-3 text-center font-semibold text-foreground">{productB.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-background" : ""}>
                    <td className="border border-border px-4 py-3 font-medium text-foreground">{row.label}</td>
                    <td className="border border-border px-4 py-3 text-center text-muted-foreground">{renderCell(row.a)}</td>
                    <td className="border border-border px-4 py-3 text-center text-muted-foreground">{renderCell(row.b)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="text-center">
              <button onClick={() => addItem(productA)} className="w-full bg-gold text-nero py-3 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors">
                Aggiungi {productA.name}
              </button>
              <p className="text-xs text-muted-foreground mt-2">Ideale per uso personale a casa</p>
            </div>
            <div className="text-center">
              <button onClick={() => addItem(productB)} className="w-full bg-gold text-nero py-3 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors">
                Aggiungi {productB.name}
              </button>
              <p className="text-xs text-muted-foreground mt-2">Ideale per professioniste e saloni</p>
            </div>
          </div>

          <div className="mt-12 space-y-4 text-muted-foreground font-sans leading-relaxed">
            <h2 className="font-serif text-xl font-bold text-foreground">Quale Fresa per Unghie Scegliere?</h2>
            <p>
              La scelta tra la <Link to={`/prodotto/${productA.slug}`} className="text-gold-dark hover:underline font-semibold">{productA.name}</Link> e la <Link to={`/prodotto/${productB.slug}`} className="text-gold-dark hover:underline font-semibold">{productB.name}</Link> dipende dal tuo utilizzo principale.
            </p>
            <p>
              Se sei una <strong>principiante</strong> o cerchi una fresa per uso domestico, la {productA.name} è perfetta: compatta, ricaricabile via Type-C e con 4 velocità regolabili per imparare in sicurezza. Se invece sei una <strong>professionista</strong> o un salone, la {productB.name} offre 45.000 RPM, alta coppia motore e sistema di raffreddamento per sessioni intensive.
            </p>
            <p>
              Entrambi i modelli includono <strong>12 punte professionali</strong>, spedizione gratuita in Italia e garanzia 12 mesi.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ComparisonPage;
