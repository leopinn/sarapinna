// BACKEND — costruisce il link wa.me lato server.
// Utile per tracciare le aperture o per cambiare messaggio senza rifare il build.
// GET /api/whatsapp?msg=Ciao%20Sara  → 302 verso WhatsApp

export const prerender = false;

const NUMERO = '393771406220';
const MSG_DEFAULT = 'Ciao Sara, vorrei informazioni sulla disponibilità';

export async function GET({ url }) {
  const msg = url.searchParams.get('msg') || MSG_DEFAULT;
  const destinazione = `https://wa.me/${NUMERO}?text=${encodeURIComponent(msg.slice(0, 500))}`;
  return new Response(null, { status: 302, headers: { Location: destinazione } });
}
