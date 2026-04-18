import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Prodotti", href: "#prodotti" },
    { label: "Confronto", href: "#confronto" },
    { label: "Come Funziona", href: "#come-funziona" },
    { label: "Guide", href: "/glossario-fresa-unghie", isRoute: true },
    { label: "Recensioni", href: "#recensioni" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "frosted-glass border-b border-gold/10" : "bg-nero"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-bold text-cream">
              Fresa <span className="italic text-gold">Unghie</span> Pro
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-sans text-cream/70 hover:text-gold transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-sans text-cream/70 hover:text-gold transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/accedi" className="text-cream/70 hover:text-gold transition-colors p-2" aria-label="Accedi al tuo account">
              <User size={20} />
            </Link>
            <button onClick={openCart} className="relative text-cream/70 hover:text-gold transition-colors p-2" aria-label={`Apri carrello${totalItems > 0 ? `, ${totalItems} articoli` : ""}`}>
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-nero text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold" aria-hidden="true">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-cream p-2" aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"} aria-expanded={mobileOpen}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-nero border-t border-gold/10">
          <div className="px-4 py-4 space-y-3">
            {links.map(link => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-cream/70 hover:text-gold transition-colors py-2 font-sans"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-cream/70 hover:text-gold transition-colors py-2 font-sans"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
