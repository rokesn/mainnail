export interface CityData {
  slug: string;
  name: string;
  region: string;
  uniqueNote: string;
}

export const cities: CityData[] = [
  { slug: "milano", name: "Milano", region: "Lombardia", uniqueNote: "Milano, capitale della moda e del beauty in Italia, è la città con la più alta concentrazione di saloni di manicure e nail art. Le professioniste milanesi scelgono la nostra fresa per unghie per la qualità e l'affidabilità." },
  { slug: "roma", name: "Roma", region: "Lazio", uniqueNote: "A Roma, la tradizione del beauty si unisce all'innovazione. Le onicotecniche romane apprezzano la praticità della nostra fresa per unghie ricaricabile, ideale per i servizi a domicilio nella Capitale." },
  { slug: "napoli", name: "Napoli", region: "Campania", uniqueNote: "Napoli è da sempre un punto di riferimento per la cura personale e la nail art creativa. Le estetiste napoletane scelgono la nostra fresa professionale per la potenza e la versatilità nelle ricostruzioni." },
  { slug: "torino", name: "Torino", region: "Piemonte", uniqueNote: "Torino, città elegante e raffinata, vanta un settore beauty in costante crescita. Le professioniste torinesi preferiscono la nostra fresa per unghie per la silenziosità e la precisione di lavoro." },
  { slug: "palermo", name: "Palermo", region: "Sicilia", uniqueNote: "A Palermo, il settore della cura delle unghie è in forte espansione. La nostra fresa per unghie con ricarica Type-C è perfetta per le professioniste siciliane che lavorano in mobilità." },
  { slug: "genova", name: "Genova", region: "Liguria", uniqueNote: "Genova, con il suo spirito pratico ligure, apprezza strumenti professionali compatti e affidabili. La nostra lima elettrica è la scelta ideale per le estetiste genovesi." },
  { slug: "bologna", name: "Bologna", region: "Emilia-Romagna", uniqueNote: "Bologna, cuore dell'Emilia-Romagna, è una città dinamica dove il settore beauty cresce rapidamente. Le onicotecniche bolognesi scelgono la nostra fresa per la qualità delle 12 punte incluse." },
  { slug: "firenze", name: "Firenze", region: "Toscana", uniqueNote: "Firenze, culla del Rinascimento e dell'artigianato di qualità, ospita alcuni dei migliori saloni di nail art toscani. La nostra fresa per unghie professionale soddisfa gli standard fiorentini di eccellenza." },
  { slug: "bari", name: "Bari", region: "Puglia", uniqueNote: "Bari, capoluogo della Puglia, vanta un settore estetico vivace e in crescita. Le professioniste baresi apprezzano la potenza del nostro modello da 45.000 RPM per le ricostruzioni in gel." },
  { slug: "catania", name: "Catania", region: "Sicilia", uniqueNote: "A Catania, il mercato della nail art è fiorente. Le estetiste catanesi scelgono la nostra fresa per unghie per il rapporto qualità-prezzo imbattibile e la spedizione gratuita." },
  { slug: "venezia", name: "Venezia", region: "Veneto", uniqueNote: "Venezia, città unica al mondo, ha un settore beauty che riflette la sua eleganza. La nostra fresa per unghie compatta è ideale per i saloni veneziani dove lo spazio è prezioso." },
  { slug: "verona", name: "Verona", region: "Veneto", uniqueNote: "Verona, città dell'amore e dello stile, ospita professioniste del nail care che cercano strumenti di qualità superiore. La nostra fresa professionale è la risposta perfetta." },
  { slug: "messina", name: "Messina", region: "Sicilia", uniqueNote: "A Messina, punto di collegamento tra Sicilia e continente, le estetiste scelgono la nostra fresa per unghie per la versatilità e le 4 velocità regolabili." },
  { slug: "padova", name: "Padova", region: "Veneto", uniqueNote: "Padova, città universitaria e dinamica, ha un settore beauty giovane e innovativo. La nostra lima elettrica ricaricabile è perfetta per le giovani professioniste padovane." },
  { slug: "trieste", name: "Trieste", region: "Friuli-Venezia Giulia", uniqueNote: "Trieste, crocevia di culture, ospita saloni di manicure che combinano tradizione italiana e influenze mitteleuropee. La nostra fresa per unghie soddisfa ogni esigenza." },
  { slug: "taranto", name: "Taranto", region: "Puglia", uniqueNote: "A Taranto, la cura delle unghie è una tradizione radicata. Le professioniste tarentine apprezzano la qualità delle punte in ceramica e diamantate incluse nel nostro kit." },
  { slug: "brescia", name: "Brescia", region: "Lombardia", uniqueNote: "Brescia, città industriosa della Lombardia, vanta un settore estetico professionale in espansione. La nostra fresa da salone 45.000 RPM è la scelta delle professioniste bresciane." },
  { slug: "prato", name: "Prato", region: "Toscana", uniqueNote: "A Prato, centro tessile e creativo della Toscana, le estetiste cercano strumenti professionali affidabili. La nostra fresa per unghie con 12 punte è il kit completo ideale." },
  { slug: "parma", name: "Parma", region: "Emilia-Romagna", uniqueNote: "Parma, città dell'eccellenza emiliana, ospita professioniste del beauty che non accettano compromessi. La nostra fresa per unghie professionale risponde ai più alti standard." },
  { slug: "modena", name: "Modena", region: "Emilia-Romagna", uniqueNote: "Modena, terra di motori e precisione, ispira le onicotecniche modenesi a cercare strumenti di alta qualità. La nostra fresa professionale offre la precisione millimetrica che richiedono." },
];

export const getCityBySlug = (slug: string) => cities.find(c => c.slug === slug);
