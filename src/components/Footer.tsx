import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const topCities = [
  { slug: "milano", name: "Milano" },
  { slug: "roma", name: "Roma" },
  { slug: "napoli", name: "Napoli" },
  { slug: "torino", name: "Torino" },
  { slug: "palermo", name: "Palermo" },
  { slug: "genova", name: "Genova" },
  { slug: "bologna", name: "Bologna" },
  { slug: "firenze", name: "Firenze" },
  { slug: "bari", name: "Bari" },
  { slug: "catania", name: "Catania" },
];

const Footer = () => {
  const columns = [
    {
      title: "Prodotti",
      links: [
        { label: "Fresa Unghie Professionale", href: "/prodotto/fresa-unghie-professionale" },
        { label: "Fresa Salone Pro", href: "/prodotto/fresa-professionale-salone" },
      ],
    },
    {
      title: "Guide",
      links: [
        { label: "Tutte le guide", href: "/guide" },
        { label: "Come usare la fresa", href: "/guide/come-usare-fresa-unghie" },
        { label: "Rimuovere il gel", href: "/guide/fresa-unghie-gel-rimozione" },
        { label: "Quale punta scegliere", href: "/guide/punte-fresa-unghie-quale-scegliere" },
        { label: "Migliore fresa 2026", href: "/guide/migliore-fresa-unghie-2026" },
        { label: "Glossario punte", href: "/glossario-fresa-unghie" },
      ],
    },
    {
      title: "Supporto",
      links: [
        { label: "FAQ", href: "/#faq" },
        { label: "Spedizioni e Consegne", href: "/politica-reso" },
        { label: "Resi e Rimborsi", href: "/politica-reso" },
        { label: "Contattaci", href: "/contatti" },
      ],
    },
    {
      title: "Azienda",
      links: [
        { label: "Chi Siamo", href: "/chi-siamo" },
        { label: "Recensioni", href: "/#recensioni" },
      ],
    },
    {
      title: "Legale",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Termini e Condizioni", href: "/termini-condizioni" },
        { label: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-nero border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl font-bold text-cream mb-2">
              Fresa <span className="italic text-gold">Unghie</span> Pro
            </h3>
            <p className="text-cream/40 text-xs font-sans leading-relaxed">
              La fresa per unghie professionale pensata per te. Kit completo con 12 punte frese per manicure e pedicure.
            </p>
            <p className="text-cream/30 text-xs font-sans mt-4">
              📦 Spedizione gratuita in tutta Italia
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-cream/30 hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Columns */}
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-gold font-sans text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-cream/40 hover:text-gold text-xs font-sans transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Spedizione in Italia — internal linking silo for local SEO */}
        <div className="border-t border-gold/5 mt-12 pt-8">
          <h4 className="text-gold font-sans text-sm font-semibold mb-4 text-center">
            Spedizione Fresa Unghie in tutta Italia
          </h4>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {topCities.map(city => (
              <li key={city.slug}>
                <Link
                  to={`/spedizioni/${city.slug}`}
                  className="text-cream/40 hover:text-gold text-xs font-sans transition-colors"
                >
                  Fresa Unghie {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gold/5 mt-8 pt-8 text-center space-y-2">
          <p className="text-cream/20 text-xs font-sans">
            © 2025 Fresa Unghie Pro · Tutti i diritti riservati
          </p>
          <p className="text-cream/20 text-xs font-sans">
            Fresa Unghie Pro · Email: supporto@fresaunghie.store · Italia (IT)
          </p>
          <p className="text-cream/15 text-xs font-sans">
            <Link to="/privacy-policy" className="hover:text-gold/40 transition-colors">Privacy</Link>
            {" · "}
            <Link to="/termini-condizioni" className="hover:text-gold/40 transition-colors">Termini</Link>
            {" · "}
            <Link to="/cookie-policy" className="hover:text-gold/40 transition-colors">Cookie</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
