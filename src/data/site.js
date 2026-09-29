/**
 * Dati del sito. Quello che non cambia con la lingua (recapiti, percorsi delle
 * immagini, nomi delle esperienze) sta qui una volta sola; i testi tradotti
 * stanno nei campi `it`/`en`. Le stringhe dell'interfaccia sono invece in
 * src/i18n/index.js.
 */

export const site = {
  nome: 'Sara Pinna',
  citta: 'Verona',
  indirizzo: 'Verona (VR), Italia',
  telefono: '+39 377 140 6220',
  telefonoRaw: '+393771406220',
  whatsapp: '393771406220',
  email: 'info@sarapinna.it',
  instagram: 'https://www.instagram.com/_sara.pinna_/',
  instagramHandle: '@_sara.pinna_',
  // provvisorio: ricerca esperienze in provincia di Verona, da sostituire con
  // il profilo Airbnb Experiences dedicato appena è pronto
  airbnb: 'https://www.airbnb.it/s/Provincia-di-Verona/experiences?place_id=ChIJ4-CbaWhff0cRW1mCaGNa-FM&refinement_paths%5B%5D=%2Fexperiences&location_bb=QjXpv0ExIAhCNX83QS6iyQ%3D%3D&acp_id=5400e5fd-86ef-4115-94bc-2b2704107ac3&date_picker_type=calendar&source=structured_search_input_header&search_type=autocomplete_click'
};

/**
 * Le esperienze in preparazione. I nomi sono in inglese in entrambe le lingue:
 * sono gli stessi con cui compaiono su Airbnb Experiences.
 * Le foto mancanti (experience-4, experience-5) vanno caricate in public/images.
 */
export const esperienze = [
  {
    id: 'wine-food',
    numero: '01',
    titolo: 'Verona Wine & Food Experience',
    immagine: '/images/experience-1.jpg',
    it: {
      testo:
        'Una passeggiata nel centro storico di Verona con una parte dedicata alla città e una parte enogastronomica: luoghi iconici, vino del territorio e cucina locale, con aperitivo, degustazione o cena a seconda del format.',
      meta: ['Centro storico di Verona', 'Vino e cucina locale'],
    },
    en: {
      testo:
        'A walk through the old town of Verona, part city and part food and wine: iconic places, local wine and local cooking, with an aperitivo, a tasting or dinner depending on the format.',
      meta: ['Verona old town', 'Food and local wine'],
    },
  },
  {
    id: 'cooking-class',
    numero: '02',
    titolo: 'Traditional Veronese Cooking Class',
    immagine: '/images/experience-4.jpg',
    it: {
      testo:
        'Una cooking class con chef dedicata alla cucina veronese: piccoli gruppi, preparazione dei piatti con le mani in pasta, il racconto delle tradizioni e il momento finale a tavola, tutti insieme.',
      meta: ['Piccoli gruppi', 'Con chef'],
    },
    en: {
      testo:
        'A cooking class with a chef devoted to Veronese cooking: small groups, hands on the dough, the stories behind the traditions and, at the end, the table shared together.',
      meta: ['Small groups', 'With a chef'],
    },
  },
  {
    id: 'classic-car',
    numero: '03',
    titolo: 'Verona Classic Car Experience',
    immagine: '/images/experience-2.jpg',
    it: {
      testo:
        'L’esperienza più esclusiva: Verona e il territorio visti da bordo di un’auto d’epoca con conducente. Scenografica, comoda, pensata per chi vuole qualcosa che non somigli a un normale tour cittadino.',
      meta: ['Premium', 'Auto d’epoca con conducente'],
    },
    en: {
      testo:
        'The most exclusive of them all: Verona and the countryside seen from a chauffeur-driven classic car. Scenic, comfortable, made for those who want something that looks nothing like a standard city tour.',
      meta: ['Premium', 'Chauffeur-driven classic car'],
    },
  },
  {
    id: 'horse-riding',
    numero: '04',
    titolo: 'Horse Riding & Wine Experience',
    immagine: '/images/experience-5.jpg',
    it: {
      testo:
        'Una cavalcata nel territorio veronese, tra campagna e colline, con la possibilità di chiudere la giornata con una degustazione in cantina. Natura, territorio e vino nella stessa esperienza.',
      meta: ['Campagna veronese', 'Con degustazione in cantina'],
    },
    en: {
      testo:
        'A ride through the countryside and hills around Verona, with the option of closing the day with a tasting at a winery. Nature, land and wine in a single experience.',
      meta: ['Verona countryside', 'With a winery tasting'],
    },
  },
  {
    id: 'soave',
    numero: '05',
    titolo: 'Soave Village & Wine Experience',
    immagine: '/images/experience-3.jpg',
    it: {
      testo:
        'Una passeggiata alla scoperta di Soave e del suo borgo storico, con il castello che domina i vigneti, abbinata a una degustazione in una cantina del posto. Atmosfera, territorio e vino.',
      meta: ['Borgo di Soave', 'Cantina locale'],
    },
    en: {
      testo:
        'A walk through Soave and its old village, with the castle watching over the vineyards, paired with a tasting at a local winery. Atmosphere, land and wine.',
      meta: ['Village of Soave', 'Local winery'],
    },
  },
];
