// BACKEND — endpoint del form di contatto.
// Invia le mail via SMTP dalla casella Hostinger info@sarapinna.it, senza servizi terzi.
// Richiede output: 'server' (o 'hybrid') in astro.config.mjs + adapter @astrojs/node.

import nodemailer from 'nodemailer';

export const prerender = false;

// --- Configurazione (vedi .env) --------------------------------------------
const env = (chiave, ripiego) =>
  process.env[chiave] ?? import.meta.env?.[chiave] ?? ripiego;

const SMTP_HOST = env('SMTP_HOST', 'smtp.hostinger.com');
const SMTP_PORT = Number(env('SMTP_PORT', 465));
const SMTP_USER = env('SMTP_USER');
const SMTP_PASS = env('SMTP_PASS');
const MAIL_FROM = env('MAIL_FROM', SMTP_USER);
const MAIL_TO = env('MAIL_TO', SMTP_USER);
const MITTENTE = env('MAIL_FROM_NOME', 'Sito sarapinna.it');

// Una sola connessione riutilizzata: il pool tiene aperta la sessione SMTP.
let trasporto;
function getTrasporto() {
  trasporto ??= nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // 465 = TLS implicito, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    pool: true,
    maxConnections: 2,
  });
  return trasporto;
}

// --- Anti-spam --------------------------------------------------------------
const FINESTRA_MS = 10 * 60 * 1000; // 10 minuti
const MAX_INVII = 3; // per IP, nella finestra
const invii = new Map();

function troppiInvii(ip) {
  const ora = Date.now();
  const recenti = (invii.get(ip) ?? []).filter((t) => ora - t < FINESTRA_MS);
  if (recenti.length >= MAX_INVII) {
    invii.set(ip, recenti);
    return true;
  }
  recenti.push(ora);
  invii.set(ip, recenti);
  if (invii.size > 500) {
    for (const [k, v] of invii) if (!v.some((t) => ora - t < FINESTRA_MS)) invii.delete(k);
  }
  return false;
}

function indirizzoIp(request, clientAddress) {
  const inoltrato = request.headers.get('x-forwarded-for');
  return inoltrato?.split(',')[0].trim() || clientAddress || 'sconosciuto';
}

// --- Handler ----------------------------------------------------------------
export async function POST({ request, clientAddress }) {
  if (!SMTP_USER || !SMTP_PASS) {
    return json({ errore: 'SMTP non configurato sul server' }, 500);
  }

  let dati;
  try {
    dati = await request.json();
  } catch {
    return json({ errore: 'Corpo della richiesta non valido' }, 400);
  }

  const { nome, cognome, email, messaggio, sito } = dati ?? {};

  // Honeypot: se il campo nascosto "sito" è compilato, è un bot.
  // Rispondiamo ok per non dargli segnali, ma non inviamo nulla.
  if (sito) return json({ ok: true });

  if (!nome || !cognome || !email || !messaggio) {
    return json({ errore: 'Compila tutti i campi obbligatori' }, 422);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json({ errore: 'Indirizzo email non valido' }, 422);
  }
  if (String(messaggio).length > 5000) {
    return json({ errore: 'Messaggio troppo lungo' }, 422);
  }
  // Niente a capo nei campi che finiscono nell'intestazione: evita header injection.
  if (/[\r\n]/.test(`${nome}${cognome}${email}`)) {
    return json({ errore: 'Campi non validi' }, 422);
  }

  if (troppiInvii(indirizzoIp(request, clientAddress))) {
    return json({ errore: 'Troppi invii ravvicinati. Riprova tra qualche minuto.' }, 429);
  }

  const nomeCompleto = `${String(nome).trim()} ${String(cognome).trim()}`;
  const testo = String(messaggio).trim();
  const posta = getTrasporto();

  try {
    // 1) Il messaggio a Sara. Reply-To: rispondendo si scrive al visitatore.
    await posta.sendMail({
      from: { name: MITTENTE, address: MAIL_FROM },
      to: MAIL_TO,
      replyTo: { name: nomeCompleto, address: email },
      subject: `Nuova richiesta dal sito — ${nomeCompleto}`,
      text: `Nome: ${nomeCompleto}\nEmail: ${email}\n\n${testo}\n`,
      html: `
        <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1c1c1c">
          <p style="margin:0 0 16px"><strong>Nuova richiesta dal sito</strong></p>
          <p style="margin:0 0 4px"><strong>Nome:</strong> ${esc(nomeCompleto)}</p>
          <p style="margin:0 0 16px"><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
          <div style="border-left:2px solid #d8d2c8;padding-left:16px;white-space:pre-wrap">${esc(testo)}</div>
        </div>`,
    });
  } catch (e) {
    console.error('[contatti] invio fallito:', e);
    return json({ errore: 'Invio non riuscito' }, 502);
  }

  // 2) Auto-risposta al visitatore. Se fallisce, la richiesta è comunque arrivata.
  try {
    await posta.sendMail({
      from: { name: 'Sara Pinna', address: MAIL_FROM },
      to: email,
      replyTo: MAIL_TO,
      subject: 'Grazie per avermi contattato!',
      text:
        `Ciao ${String(nome).trim()},\n\n` +
        `grazie per avermi contattato: ho ricevuto la tua richiesta e ti risponderò al più presto.\n\n` +
        `Questo è il messaggio che mi hai inviato:\n\n${testo}\n\n` +
        `A presto,\nSara Pinna\nsarapinna.it\n`,
      html: `
        <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1c1c1c">
          <p style="margin:0 0 16px">Ciao ${esc(String(nome).trim())},</p>
          <p style="margin:0 0 16px">grazie per avermi contattato: ho ricevuto la tua richiesta e ti risponderò al più presto.</p>
          <p style="margin:0 0 8px;color:#6b6b6b;font-size:13px">Il messaggio che mi hai inviato:</p>
          <div style="border-left:2px solid #d8d2c8;padding-left:16px;white-space:pre-wrap;color:#4a4a4a">${esc(testo)}</div>
          <p style="margin:24px 0 0">A presto,<br /><strong>Sara Pinna</strong><br /><a href="https://sarapinna.it" style="color:#6b6b6b">sarapinna.it</a></p>
        </div>`,
    });
  } catch (e) {
    console.error('[contatti] auto-risposta fallita:', e);
  }

  return json({ ok: true });
}

function esc(valore) {
  return String(valore)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function json(corpo, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
