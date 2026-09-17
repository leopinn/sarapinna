// BACKEND — endpoint di ripiego per il form.
// Richiede output: 'server' (o 'hybrid') in astro.config.mjs + un adapter.
// Usa l'API REST di EmailJS con la chiave PRIVATA, che non finisce nel browser.

export const prerender = false;

export async function POST({ request }) {
  let dati;
  try {
    dati = await request.json();
  } catch {
    return json({ errore: 'Corpo della richiesta non valido' }, 400);
  }

  const { nome, cognome, email, messaggio } = dati ?? {};

  if (!nome || !cognome || !email || !messaggio) {
    return json({ errore: 'Compila tutti i campi obbligatori' }, 422);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json({ errore: 'Indirizzo email non valido' }, 422);
  }

  const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = import.meta.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return json({ errore: 'EmailJS non configurato sul server' }, 500);
  }

  const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        nome,
        cognome,
        email,
        messaggio,
        destinatario: import.meta.env.MAIL_TO ?? 'pinna_sara@icloud.com',
      },
    }),
  });

  if (!r.ok) {
    return json({ errore: 'Invio non riuscito', dettaglio: await r.text() }, 502);
  }

  return json({ ok: true });
}

function json(corpo, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
