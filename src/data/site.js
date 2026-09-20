export const site = {
  nome: 'Sara Pinna',
  claim: 'Affitti brevi · Verona e provincia',
  citta: 'Isola della Scala, Verona',
  indirizzo: 'Isola della Scala (VR), Italia',
  telefono: '+39 377 140 6220',
  telefonoRaw: '+393771406220',
  whatsapp: '393771406220',
  whatsappMsg: 'Ciao Sara, vorrei informazioni sulla disponibilità',
  email: 'info@sarapinna.it',
  instagram: 'https://www.instagram.com/_sara.pinna_/',
  instagramHandle: '@_sara.pinna_',
  airbnb: '',
  booking: '',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Chi sono', href: '/chi-sono' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Galleria', href: '/galleria' },
  { label: 'Contatti', href: '/contatti' },
];

export const esperienze = [
  {
    numero: '01',
    titolo: 'Tour guidato di Verona',
    testo:
      'Il centro storico a piedi, con calma: l’Arena, Piazza delle Erbe, la Casa di Giulietta e gli angoli che le guide di passaggio non raccontano.',
    meta: ['Circa 2 ore', 'A piedi, in centro'],
    immagine: '/images/experience-3.jpg',
  },
  {
    numero: '02',
    titolo: 'Degustazione di vini locali',
    testo:
      'Valpolicella, Amarone, Soave. Una selezione di cantine della provincia dove si assaggia seduti, senza fretta e senza pullman.',
    meta: ['Mezza giornata', 'Cantine in provincia'],
    immagine: '/images/experience-1.jpg',
  },
  {
    numero: '03',
    titolo: 'Tour di Verona in auto d’epoca',
    testo:
      'Un giro panoramico a bordo di un’auto storica, tra le colline e il lungadige, con le soste giuste per le fotografie.',
    meta: ['Circa 90 minuti', 'Partenza dal centro'],
    immagine: '/images/experience-2.jpg',
  },
];

export const galleria = [
  { src: '/images/gallery-1.png', alt: 'Il soggiorno', wide: true },
  { src: '/images/gallery-2.png', alt: 'La camera' },
  { src: '/images/gallery-3.png', alt: 'La cucina' },
  { src: '/images/gallery-4.png', alt: 'Il bagno' },
  { src: '/images/gallery-5.png', alt: 'Un dettaglio della casa' },
];
