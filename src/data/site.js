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

export const servizi = [
  {
    eyebrow: 'Instagram',
    titolo: 'Le case, i giorni, Verona',
    testo: 'Foto delle stanze, novità sulle disponibilità e i posti che consiglio agli ospiti.',
    cta: site.instagramHandle + ' →',
    href: site.instagram,
    wall: 'var(--wall-peach)',
    wallHover: '#f9e1cd',
  },
  {
    eyebrow: 'Airbnb',
    titolo: 'Prenota per notti e weekend',
    testo: 'Calendario aggiornato, check-in autonomo e cancellazione flessibile fino a 5 giorni prima.',
    cta: 'Vedi gli annunci →',
    href: site.airbnb || '/contatti',
    wall: 'var(--wall-mint)',
    wallHover: '#dff7e2',
    inArrivo: !site.airbnb,
  },
  {
    eyebrow: 'Booking',
    titolo: 'Soggiorni di lavoro e fiere',
    testo: 'Fattura su richiesta, colazione lasciata in casa e possibilità di late check-out.',
    cta: 'Vedi le strutture →',
    href: site.booking || '/contatti',
    wall: 'var(--wall-lavender)',
    wallHover: '#dbd0ea',
    inArrivo: !site.booking,
  },
];

export const galleria = [
  { src: '/images/gallery-1.jpg', alt: 'Il soggiorno', wide: true },
  { src: '/images/gallery-2.jpg', alt: 'La camera' },
  { src: '/images/gallery-3.jpg', alt: 'La cucina' },
  { src: '/images/gallery-4.jpg', alt: 'Il bagno' },
  { src: '/images/gallery-5.jpg', alt: 'Un dettaglio della casa' },
];
