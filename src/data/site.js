/**
 * Dati del sito. Quello che non cambia con la lingua (recapiti, percorsi delle
 * immagini) sta qui una volta sola; i testi tradotti stanno nei campi `it`/`en`.
 * Le stringhe dell'interfaccia sono invece in src/i18n/index.js.
 */

export const site = {
  nome: 'Sara Pinna',
  citta: 'Isola della Scala, Verona',
  indirizzo: 'Isola della Scala (VR), Italia',
  telefono: '+39 377 140 6220',
  telefonoRaw: '+393771406220',
  whatsapp: '393771406220',
  email: 'info@sarapinna.it',
  instagram: 'https://www.instagram.com/_sara.pinna_/',
  instagramHandle: '@_sara.pinna_',
  // provvisorio: ricerca esperienze in provincia di Verona, da sostituire con la pagina di Sara
  airbnb: 'https://www.airbnb.it/s/Provincia-di-Verona/experiences?place_id=ChIJ4-CbaWhff0cRW1mCaGNa-FM&refinement_paths%5B%5D=%2Fexperiences&location_bb=QjXpv0ExIAhCNX83QS6iyQ%3D%3D&acp_id=5400e5fd-86ef-4115-94bc-2b2704107ac3&date_picker_type=calendar&source=structured_search_input_header&search_type=autocomplete_click',
  booking: '',
};

export const esperienze = [
  {
    numero: '01',
    immagine: '/images/experience-3.jpg',
    it: {
      titolo: 'Tour guidato di Verona',
      testo:
        'Il centro storico a piedi, con calma: l’Arena, Piazza delle Erbe, la Casa di Giulietta e gli angoli che le guide di passaggio non raccontano.',
      meta: ['Circa 2 ore', 'A piedi, in centro'],
    },
    en: {
      titolo: 'Guided tour of Verona',
      testo:
        'The old town on foot, unhurried: the Arena, Piazza delle Erbe, Juliet’s House and the corners that passing guides never mention.',
      meta: ['About 2 hours', 'On foot, in the centre'],
    },
  },
  {
    numero: '02',
    immagine: '/images/experience-1.jpg',
    it: {
      titolo: 'Degustazione di vini locali',
      testo:
        'Valpolicella, Amarone, Soave. Una selezione di cantine della provincia dove si assaggia seduti, senza fretta e senza pullman.',
      meta: ['Mezza giornata', 'Cantine in provincia'],
    },
    en: {
      titolo: 'Local wine tasting',
      testo:
        'Valpolicella, Amarone, Soave. A handful of wineries around Verona where you taste sitting down, with no rush and no tour buses.',
      meta: ['Half a day', 'Wineries around Verona'],
    },
  },
  {
    numero: '03',
    immagine: '/images/experience-2.jpg',
    it: {
      titolo: 'Tour di Verona in auto d’epoca',
      testo:
        'Un giro panoramico a bordo di un’auto storica, tra le colline e il lungadige, con le soste giuste per le fotografie.',
      meta: ['Circa 90 minuti', 'Partenza dal centro'],
    },
    en: {
      titolo: 'Verona by vintage car',
      testo:
        'A scenic ride in a classic car, through the hills and along the river, with the right stops for photographs.',
      meta: ['About 90 minutes', 'Departure from the centre'],
    },
  },
];

export const galleria = [
  { src: '/images/gallery-1.png', wide: true, alt: { it: 'Il soggiorno', en: 'The living room' } },
  { src: '/images/gallery-2.png', alt: { it: 'La camera', en: 'The bedroom' } },
  { src: '/images/gallery-3.png', alt: { it: 'La cucina', en: 'The kitchen' } },
  { src: '/images/gallery-4.png', alt: { it: 'Il bagno', en: 'The bathroom' } },
  {
    src: '/images/gallery-5.png',
    alt: { it: 'Un dettaglio della casa', en: 'A detail of the home' },
  },
];
