import { useEffect, useState } from "react";

/**
 * Auto-generated sticky Table of Contents from <h2>/<h3> in .prose-content.
 * seoip2 §4.1 — reduces pogo-sticking, increases dwell time, signals
 * structured content to AI engines.
 */
interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = document.querySelector(".prose-content");
    if (!root) return;
    const headings = Array.from(root.querySelectorAll("h2, h3")) as HTMLElement[];
    const list: TocItem[] = headings.map((h) => {
      const text = h.textContent || "";
      const id = h.id || slugify(text);
      h.id = id;
      // Inject an anchor copy-link
      if (!h.querySelector("a.heading-anchor")) {
        const a = document.createElement("a");
        a.href = `#${id}`;
        a.className = "heading-anchor opacity-0 group-hover:opacity-100 ml-2 text-gold/60 hover:text-gold text-sm";
        a.setAttribute("aria-label", "Copia link a questa sezione");
        a.textContent = "#";
        h.classList.add("group");
        h.appendChild(a);
      }
      return { id, text, level: (h.tagName === "H2" ? 2 : 3) as 2 | 3 };
    });
    setItems(list);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, []);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Indice dei contenuti"
      className="hidden xl:block fixed right-6 top-32 w-60 max-h-[70vh] overflow-y-auto p-4 border border-gold/15 rounded-lg bg-nero/40 backdrop-blur-sm"
    >
      <p className="text-gold text-[10px] uppercase tracking-wider font-sans mb-3">
        In questa guida
      </p>
      <ul className="space-y-1.5 text-sm font-sans">
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${it.id}`}
              className={`block transition-colors leading-snug ${
                activeId === it.id ? "text-gold" : "text-cream/55 hover:text-cream/90"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
