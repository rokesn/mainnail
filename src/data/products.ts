export interface Product {
  id: string;
  name: string;
  slug: string;
  badge: string;
  category: string;
  description: string;
  longDescription: string;
  sku: string;
  mpn: string;
  specs: string[];
  mainImage: string;
  images: string[];
  price: number;
  priceFormatted: string;
  rating: number;
  reviewCount: number;
  reviewCountFormatted: string;
  soldLabel: string;
  detailedSpecs?: {
    features: Record<string, string>;
    measurements: Record<string, string>;
    additional: Record<string, string>;
    itemDetails: Record<string, string>;
  };
}

export const products: Product[] = [
  {
    id: "fresa-unghie-professionale",
    name: "Fresa Unghie Personale – Kit 12 Punte",
    slug: "fresa-unghie-professionale",
    badge: "Uso Personale",
    category: "Fresa Unghie · Uso Personale",
    description: "Compatta, silenziosa e potente. Perfetta per uso domestico. Ricarica Type-C inclusa.",
    longDescription: "La Fresa Unghie Professionale è la miglior fresa per unghie professionale compatta, pensata per chi vuole risultati da salone direttamente a casa propria. Con le sue 4 velocità regolabili e la ricarica Type-C, questa lima elettrica per unghie professionale ti permette di limare, modellare e lucidare le unghie naturali, in gel e acriliche in completa libertà. Il kit include 12 testine professionali: punte diamantate per le cuticole, punte in ceramica per la rimozione del gel, e punte in carburo di tungsteno per la modellataura. Il design ergonomico tascabile la rende ideale sia per principianti che per chi cerca una fresa manicure e pedicure professionale. La batteria ricaricabile garantisce sessioni senza fili e senza limiti. Silenziosa e a bassa vibrazione, è perfetta per la preparazione dell'unghia per gel e semipermanente. Ogni kit fresa unghie include un manuale d'uso in italiano per imparare subito come usare la fresa unghie in sicurezza.",
    sku: "FUP-001",
    mpn: "FUP-001",
    specs: [
      "Ricarica Type-C · Batteria 180mAh",
      "4 velocità regolabili",
      "12 testine in dotazione",
      "Ideale per principianti",
      "Design ergonomico tascabile",
    ],
    mainImage: "https://img.fresaunghie.store/fresa-unghie-professionale.png",
    images: [
      "https://img.fresaunghie.store/fresa-unghie-professionale.png",
      "https://img.kwcdn.com/product/fancy/29d42d64-d720-4af0-9d35-11b08aa7041d.jpg",
      "https://img.kwcdn.com/product/fancy/34a95cc7-a91e-49fb-8c66-e9f25f6a9b56.jpg",
      "https://img.kwcdn.com/product/fancy/b2b4f85b-7f62-477a-ad2a-e94a78a33a7d.jpg",
    ],
    price: 29.99,
    priceFormatted: "€29,99",
    rating: 4.9,
    reviewCount: 1738,
    reviewCountFormatted: "1.738",
    soldLabel: "15K+ venduti",
    detailedSpecs: {
      features: {
        "Alimentazione": "Batteria Ricaricabile (Type-C)",
        "Durata Batteria": "3 Ore",
        "Potenza Input": "500 Milliwatts",
        "Velocità Massima": "20.000 RPM",
      },
      measurements: {
        "Dimensioni (L x P x A)": "6 x 3 x 19 cm",
        "Peso": "98 Grammi",
      },
      additional: {
        "Materiale": "ABS (Acrylonitrile Butadiene Styrene)",
      },
      itemDetails: {
        "Marca": "Fresa Unghie Pro",
        "Modello": "Personal Pro K16",
        "Produttore": "FUP Technologies",
        "Codice EAN": "8012345678901",
      }
    }
  },
  {
    id: "salone-pro",
    name: "Fresa Professionale Salone 45000 RPM",
    slug: "fresa-professionale-salone",
    badge: "Uso Salone",
    category: "Fresa Unghie · Uso Professionale",
    description: "Potenza da salone. 45.000 RPM, alta coppia motore, ideale per unghie acriliche, gel e ricostruzione. Gift box inclusa.",
    longDescription: "La Fresa Professionale Salone è la fresa per unghie da 45.000 RPM pensata per onicotecniche, estetiste e professioniste del nail care. L'alta coppia motore garantisce performance superiori anche su unghie acriliche spesse, gel duro e ricostruzioni. Include 12 testine professionali e viene consegnata in un'esclusiva gift box, ideale anche come regalo. Plug-in direttamente alla presa per sessioni intensive senza mai perdere potenza. Con il sistema di raffreddamento integrato e la precisione millimetrica, ogni lavoro risulta pulito, veloce e professionale. Indicata per: rimozione gel, acrilico e semipermanente, modellatura, lucidatura, cura cuticole, preparazione unghia naturale. La scelta numero uno per i saloni professionali in Italia. Ogni kit include 12 punte intercambiabili di alta qualità, un manuale d'uso in italiano e una confezione regalo premium.",
    sku: "FPS-001",
    mpn: "FPS-001",
    specs: [
      "45.000 RPM",
      "Alta coppia professionale",
      "12 testine incluse",
      "Alimentazione plug-in",
      "Gift box · Ideale per saloni",
    ],
    mainImage: "https://img.kwcdn.com/product/fancy/eabaaea2-7f0d-436c-a654-cd902a5bb590.jpg",
    images: [
      "https://img.kwcdn.com/product/fancy/eabaaea2-7f0d-436c-a654-cd902a5bb590.jpg",
      "https://img.kwcdn.com/product/fancy/9e1c1a89-ef74-4990-a97b-4a14a3a51f5e.jpg",
      "https://img.kwcdn.com/product/fancy/f95eb70e-a8d5-494f-9dda-b9f09c32b4c1.jpg",
      "https://img.kwcdn.com/product/fancy/3e91c176-3a21-4dc3-b25e-51cd93e2ace1.jpg",
    ],
    price: 79.99,
    priceFormatted: "€79,99",
    rating: 4.7,
    reviewCount: 466,
    reviewCountFormatted: "466",
    soldLabel: "3,6K+ venduti",
  },
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
