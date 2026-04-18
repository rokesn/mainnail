export interface PuntaData {
  slug: string;
  name: string;
  material: string;
  useCase: string;
  description: string;
  whenToUse: string;
  productsIncluded: string;
}

export const punte: PuntaData[] = [
  {
    slug: "diamantata",
    name: "Punta Diamantata",
    material: "Diamante sintetico",
    useCase: "Cuticole e bordi",
    description: "La punta diamantata è una delle più versatili nel kit della fresa per unghie. Realizzata con diamante sintetico, offre una superficie abrasiva uniforme ideale per lavorare sulle cuticole e rifinire i bordi dell'unghia con precisione. La granulometria fine permette di rimuovere la pelle secca attorno all'unghia senza irritare la zona periungueale.",
    whenToUse: "Usa la punta diamantata per: preparazione cuticole prima dell'applicazione di gel o semipermanente, rifinitura dei bordi laterali dell'unghia, rimozione delicata della pelle secca, lavorazione su unghie naturali che richiedono precisione. Consiglio: imposta la fresa a velocità medio-bassa (livello 2 su Personal Pro) per un controllo ottimale.",
    productsIncluded: "Inclusa sia nella Fresa Unghie Professionale che nella Fresa Professionale Salone 45000 RPM."
  },
  {
    slug: "ceramica",
    name: "Punta in Ceramica",
    material: "Ceramica tecnica",
    useCase: "Rimozione gel e acrilico",
    description: "La punta in ceramica è lo strumento principale per la rimozione di gel, acrilico e semipermanente. Produce meno calore rispetto alle punte in metallo, riducendo il disagio durante le sessioni prolungate. La ceramica non si corrode e mantiene l'affilatura più a lungo rispetto al carburo di tungsteno.",
    whenToUse: "Usa la punta in ceramica per: rimozione dello strato di gel UV o acrilico, riduzione dello spessore di ricostruzioni, preparazione dell'unghia per una nuova applicazione. Imposta velocità alta (livello 3-4 su Personal Pro, 20.000+ RPM su Salone) per una rimozione efficiente.",
    productsIncluded: "Inclusa in entrambi i kit: Fresa Unghie Professionale e Fresa Professionale Salone 45000 RPM."
  },
  {
    slug: "carburo-di-tungsteno",
    name: "Punta in Carburo di Tungsteno",
    material: "Carburo di tungsteno",
    useCase: "Limatura superficie",
    description: "Il carburo di tungsteno è il materiale più resistente utilizzato nelle punte per fresa unghie. Questa punta è ideale per la limatura rapida della superficie dell'unghia e per la rimozione di grandi quantità di materiale. È lo strumento preferito dalle onicotecniche professioniste per la velocità di lavoro.",
    whenToUse: "Usa la punta in carburo di tungsteno per: limatura rapida della superficie, riduzione dello spessore dell'unghia ricostruita, rimozione veloce di gel e acrilico spessi. Attenzione: richiede mano ferma e velocità controllata per evitare danni all'unghia naturale.",
    productsIncluded: "Inclusa nella Fresa Unghie Professionale e nella Fresa Professionale Salone 45000 RPM."
  },
  {
    slug: "a-fiamma",
    name: "Punta a Fiamma",
    material: "Ceramica / Diamante",
    useCase: "Rimozione gel e zone laterali",
    description: "La punta a fiamma ha una forma affusolata che ricorda una fiammella. Questa geometria la rende perfetta per lavorare nelle zone laterali dell'unghia e negli spazi stretti vicino alle cuticole. È uno degli strumenti più utilizzati dalle professioniste per la rimozione precisa del gel nelle zone difficili da raggiungere.",
    whenToUse: "Usa la punta a fiamma per: rimozione del gel nelle zone laterali, lavoro di precisione vicino alle cuticole, modellatura dei bordi in spazi ristretti. La forma affusolata permette di raggiungere angoli che le punte cilindriche non raggiungono.",
    productsIncluded: "Inclusa in entrambi i kit fresa per unghie."
  },
  {
    slug: "a-cilindro",
    name: "Punta a Cilindro",
    material: "Carburo di tungsteno / Diamante",
    useCase: "Limatura uniforme superficie",
    description: "La punta a cilindro è la forma più classica e versatile. La superficie piatta garantisce una limatura uniforme su grandi aree dell'unghia. È ideale per ridurre lo spessore delle ricostruzioni e per creare una superficie liscia e omogenea prima dell'applicazione di un nuovo strato di gel o acrilico.",
    whenToUse: "Usa la punta a cilindro per: limatura uniforme della superficie, preparazione dell'unghia per nuova applicazione, riduzione spessore ricostruzione. È la punta più intuitiva da usare, perfetta per chi inizia.",
    productsIncluded: "Inclusa in tutti i kit fresa per unghie del nostro shop."
  },
  {
    slug: "a-cono",
    name: "Punta a Cono",
    material: "Pietra / Ceramica",
    useCase: "Modellatura bordi e solchi",
    description: "La punta a cono ha una forma rastremata che la rende ideale per la modellatura dei bordi e dei solchi laterali dell'unghia. La punta sottile permette di lavorare con precisione millimetrica nelle zone più delicate. È particolarmente apprezzata nella nail art per creare forme geometriche precise.",
    whenToUse: "Usa la punta a cono per: modellatura dei bordi laterali, creazione della forma dell'unghia (mandorla, stiletto), lavoro nei solchi laterali, dettagli di nail art. Velocità consigliata: bassa-media.",
    productsIncluded: "Inclusa nella Fresa Unghie Professionale e nella Fresa Professionale Salone."
  },
  {
    slug: "buffing-cap",
    name: "Buffing Cap (Cappuccio Lucidante)",
    material: "Gomma / Silicone",
    useCase: "Lucidatura finale",
    description: "Il buffing cap, o cappuccio lucidante, è la punta finale nel processo di manicure professionale. Realizzato in gomma o silicone morbido, lucida la superficie dell'unghia fino a renderla perfettamente liscia e brillante. Non è abrasivo e non rimuove materiale — serve esclusivamente per la finitura.",
    whenToUse: "Usa il buffing cap per: lucidatura finale dopo limatura, creazione di una superficie liscia per l'applicazione di smalto, finitura brillante su unghie naturali. È l'ultimo step di ogni sessione professionale.",
    productsIncluded: "Incluso in entrambi i kit fresa per unghie."
  },
  {
    slug: "sfera",
    name: "Punta a Sfera",
    material: "Diamante sintetico",
    useCase: "Cuticole e pulizia solchi",
    description: "La punta a sfera è piccola e rotonda, progettata per la pulizia dei solchi laterali e la rimozione precisa delle cuticole. La forma sferica impedisce di creare tagli o graffi sulla pelle, rendendola sicura anche per i principianti.",
    whenToUse: "Usa la punta a sfera per: pulizia delicata dei solchi laterali, rimozione cuticole senza rischio di tagli, preparazione dell'unghia per french manicure. Ideale per principianti grazie alla forma sicura.",
    productsIncluded: "Inclusa nel kit da 12 punte di entrambi i prodotti."
  },
  {
    slug: "ago",
    name: "Punta ad Ago",
    material: "Diamante / Metallo",
    useCase: "Dettagli e nail art",
    description: "La punta ad ago è la più sottile e precisa del kit. È utilizzata per lavori di estrema precisione come la nail art, la creazione di micro-dettagli e la pulizia di zone molto ristrette. Solo per professioniste esperte.",
    whenToUse: "Usa la punta ad ago per: dettagli di nail art, incisioni decorative, pulizia sotto l'unghia, lavori di micro-precisione. Richiede mano ferma e esperienza — non consigliata ai principianti.",
    productsIncluded: "Inclusa nel kit professionale da 12 punte."
  },
  {
    slug: "barrel",
    name: "Punta Barrel (Barile)",
    material: "Ceramica / Carburo",
    useCase: "Rimozione rapida materiale",
    description: "La punta barrel ha una forma arrotondata e tozza, ideale per la rimozione rapida di grandi quantità di materiale. È lo strumento preferito per la rimozione di unghie acriliche spesse e vecchie ricostruzioni in gel.",
    whenToUse: "Usa la punta barrel per: rimozione rapida di acrilico e gel, riduzione spessore di vecchie ricostruzioni, preparazione dell'unghia per refill. Imposta velocità alta per massima efficienza.",
    productsIncluded: "Inclusa nel kit da 12 punte fresa per unghie."
  },
  {
    slug: "mandorla",
    name: "Punta a Mandorla",
    material: "Diamante sintetico",
    useCase: "Modellatura e cuticole",
    description: "La punta a mandorla combina la versatilità della punta a cono con la sicurezza della punta a sfera. La forma ovale permette di lavorare sia sulle cuticole che sulla modellatura dei bordi con un unico strumento, riducendo i cambi di punta durante la sessione.",
    whenToUse: "Usa la punta a mandorla per: modellatura generale dell'unghia, cura cuticole, rifinitura bordi, lavoro su unghie naturali. È la punta più versatile e adatta a molteplici lavorazioni.",
    productsIncluded: "Inclusa in entrambi i kit fresa per unghie professionali."
  },
  {
    slug: "tronco-di-cono",
    name: "Punta a Tronco di Cono",
    material: "Carburo di tungsteno",
    useCase: "Limatura sotto l'unghia e bordi",
    description: "La punta a tronco di cono ha una forma intermedia tra il cilindro e il cono. La superficie laterale piatta permette una limatura uniforme, mentre la punta rastremata raggiunge gli angoli. È utilizzata per la limatura sotto l'unghia e per la preparazione del bordo libero.",
    whenToUse: "Usa la punta a tronco di cono per: limatura del bordo libero, preparazione per french tip, lavoro sotto l'unghia, creazione di linee precise. Velocità consigliata: media.",
    productsIncluded: "Inclusa nel kit professionale da 12 punte."
  },
];

export const getPuntaBySlug = (slug: string) => punte.find(p => p.slug === slug);
