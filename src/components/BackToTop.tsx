import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gold text-nero flex items-center justify-center shadow-lg hover:bg-gold-light transition-colors"
      aria-label="Torna in cima"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
