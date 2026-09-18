<?php
/**
 * BACKEND — endpoint del form di contatto (hosting condiviso PHP).
 *
 * Invia le mail via SMTP dalla casella Hostinger, senza servizi terzi.
 * Le credenziali NON stanno qui: vanno in smtp-config.php, fuori dalla
 * cartella pubblica. Vedi smtp-config.esempio.php.
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

require __DIR__ . '/lib/Exception.php';
require __DIR__ . '/lib/PHPMailer.php';
require __DIR__ . '/lib/SMTP.php';

const LIMITE_INVII = 3;              // per IP
const FINESTRA_SECONDI = 600;        // in 10 minuti
const LUNGHEZZA_MAX_MESSAGGIO = 5000;

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    rispondi(['errore' => 'Metodo non consentito'], 405);
}

$config = caricaConfig();
if ($config['SMTP_USER'] === '' || $config['SMTP_PASS'] === '') {
    error_log('[contatti] credenziali SMTP mancanti: manca smtp-config.php?');
    rispondi(['errore' => 'SMTP non configurato sul server'], 500);
}

$dati = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($dati)) {
    rispondi(['errore' => 'Corpo della richiesta non valido'], 400);
}

$nome      = trim((string) ($dati['nome'] ?? ''));
$cognome   = trim((string) ($dati['cognome'] ?? ''));
$email     = trim((string) ($dati['email'] ?? ''));
$messaggio = trim((string) ($dati['messaggio'] ?? ''));
$esca      = trim((string) ($dati['sito'] ?? ''));

// Honeypot: se il campo nascosto "sito" è compilato, è un bot.
// Rispondiamo ok per non dargli segnali, ma non inviamo nulla.
if ($esca !== '') {
    rispondi(['ok' => true]);
}

if ($nome === '' || $cognome === '' || $email === '' || $messaggio === '') {
    rispondi(['errore' => 'Compila tutti i campi obbligatori'], 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    rispondi(['errore' => 'Indirizzo email non valido'], 422);
}
if (mb_strlen($messaggio) > LUNGHEZZA_MAX_MESSAGGIO) {
    rispondi(['errore' => 'Messaggio troppo lungo'], 422);
}
// Niente a capo nei campi che finiscono nell'intestazione: evita header injection.
if (preg_match('/[\r\n]/', $nome . $cognome . $email)) {
    rispondi(['errore' => 'Campi non validi'], 422);
}

if (troppiInvii(indirizzoIp())) {
    rispondi(['errore' => 'Troppi invii ravvicinati. Riprova tra qualche minuto.'], 429);
}

$nomeCompleto = $nome . ' ' . $cognome;

// 1) Il messaggio a Sara. Reply-To: rispondendo si scrive al visitatore.
try {
    $posta = nuovoMailer($config);
    $posta->setFrom($config['MAIL_FROM'], $config['MAIL_FROM_NOME']);
    $posta->addAddress($config['MAIL_TO']);
    $posta->addReplyTo($email, $nomeCompleto);
    $posta->Subject = 'Nuova richiesta dal sito — ' . $nomeCompleto;
    $posta->isHTML(true);
    $posta->Body = '
        <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1c1c1c">
          <p style="margin:0 0 16px"><strong>Nuova richiesta dal sito</strong></p>
          <p style="margin:0 0 4px"><strong>Nome:</strong> ' . esc($nomeCompleto) . '</p>
          <p style="margin:0 0 16px"><strong>Email:</strong> <a href="mailto:' . esc($email) . '">' . esc($email) . '</a></p>
          <div style="border-left:2px solid #d8d2c8;padding-left:16px;white-space:pre-wrap">' . esc($messaggio) . '</div>
        </div>';
    $posta->AltBody = "Nome: {$nomeCompleto}\nEmail: {$email}\n\n{$messaggio}\n";
    $posta->send();
} catch (PHPMailerException $e) {
    error_log('[contatti] invio fallito: ' . $e->getMessage());
    rispondi(['errore' => 'Invio non riuscito'], 502);
}

// 2) Auto-risposta al visitatore. Se fallisce, la richiesta è comunque arrivata.
try {
    $conferma = nuovoMailer($config);
    $conferma->setFrom($config['MAIL_FROM'], 'Sara Pinna');
    $conferma->addAddress($email, $nomeCompleto);
    $conferma->addReplyTo($config['MAIL_TO'], 'Sara Pinna');
    $conferma->Subject = 'Ho ricevuto il tuo messaggio';
    $conferma->isHTML(true);
    $conferma->Body = '
        <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1c1c1c">
          <p style="margin:0 0 16px">Ciao ' . esc($nome) . ',</p>
          <p style="margin:0 0 16px">grazie per avermi scritto: ho ricevuto la tua richiesta e ti rispondo al più presto.</p>
          <p style="margin:0 0 8px;color:#6b6b6b;font-size:13px">Il messaggio che mi hai inviato:</p>
          <div style="border-left:2px solid #d8d2c8;padding-left:16px;white-space:pre-wrap;color:#4a4a4a">' . esc($messaggio) . '</div>
          <p style="margin:24px 0 0">A presto,<br /><strong>Sara Pinna</strong><br /><a href="https://sarapinna.it" style="color:#6b6b6b">sarapinna.it</a></p>
        </div>';
    $conferma->AltBody = "Ciao {$nome},\n\n"
        . "grazie per avermi scritto: ho ricevuto la tua richiesta e ti rispondo al più presto.\n\n"
        . "Questo è il messaggio che mi hai inviato:\n\n{$messaggio}\n\n"
        . "A presto,\nSara Pinna\nsarapinna.it\n";
    $conferma->send();
} catch (PHPMailerException $e) {
    error_log('[contatti] auto-risposta fallita: ' . $e->getMessage());
}

rispondi(['ok' => true]);

// --- Funzioni ---------------------------------------------------------------

function nuovoMailer(array $config): PHPMailer
{
    $posta = new PHPMailer(true);
    $posta->isSMTP();
    $posta->Host = $config['SMTP_HOST'];
    $posta->Port = (int) $config['SMTP_PORT'];
    // 465 = TLS implicito, 587 = STARTTLS
    $posta->SMTPSecure = ((int) $config['SMTP_PORT'] === 465)
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
    $posta->SMTPAuth = true;
    $posta->Username = $config['SMTP_USER'];
    $posta->Password = $config['SMTP_PASS'];
    $posta->CharSet = PHPMailer::CHARSET_UTF8;
    $posta->Timeout = 20;
    return $posta;
}

/**
 * Le credenziali stanno fuori dalla cartella pubblica: un file .php lì dentro
 * sarebbe scaricabile se il server smettesse di interpretare PHP.
 */
function caricaConfig(): array
{
    $predefinito = [
        'SMTP_HOST' => 'smtp.hostinger.com',
        'SMTP_PORT' => '465',
        'SMTP_USER' => '',
        'SMTP_PASS' => '',
        'MAIL_FROM' => '',
        'MAIL_FROM_NOME' => 'Sito sarapinna.it',
        'MAIL_TO' => '',
    ];

    $config = [];
    foreach ($predefinito as $chiave => $valore) {
        $daAmbiente = getenv($chiave);
        $config[$chiave] = ($daAmbiente !== false && $daAmbiente !== '') ? $daAmbiente : $valore;
    }

    $radice = $_SERVER['DOCUMENT_ROOT'] ?? __DIR__;
    $candidati = [
        getenv('SMTP_CONFIG') ?: '',
        dirname($radice) . '/smtp-config.php',        // accanto a public_html
        dirname($radice, 2) . '/smtp-config.php',
        __DIR__ . '/../../smtp-config.php',
    ];
    foreach ($candidati as $percorso) {
        if ($percorso !== '' && is_readable($percorso)) {
            $daFile = require $percorso;
            if (is_array($daFile)) {
                $config = array_merge($config, array_filter($daFile, 'strlen'));
            }
            break;
        }
    }

    if ($config['MAIL_FROM'] === '') {
        $config['MAIL_FROM'] = $config['SMTP_USER'];
    }
    if ($config['MAIL_TO'] === '') {
        $config['MAIL_TO'] = $config['SMTP_USER'];
    }

    return $config;
}

function indirizzoIp(): string
{
    $inoltrato = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if ($inoltrato !== '') {
        return trim(explode(',', $inoltrato)[0]);
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'sconosciuto';
}

function troppiInvii(string $ip): bool
{
    $cartella = sys_get_temp_dir() . '/contatti-sarapinna';
    if (!is_dir($cartella) && !@mkdir($cartella, 0700, true) && !is_dir($cartella)) {
        return false; // senza spazio scrivibile non blocchiamo nessuno
    }

    $file = $cartella . '/' . sha1($ip) . '.json';
    $ora = time();
    $recenti = [];
    if (is_readable($file)) {
        $salvati = json_decode((string) @file_get_contents($file), true);
        if (is_array($salvati)) {
            $recenti = array_values(array_filter(
                $salvati,
                static fn ($t) => is_int($t) && ($ora - $t) < FINESTRA_SECONDI
            ));
        }
    }

    if (count($recenti) >= LIMITE_INVII) {
        @file_put_contents($file, json_encode($recenti), LOCK_EX);
        return true;
    }

    $recenti[] = $ora;
    @file_put_contents($file, json_encode($recenti), LOCK_EX);
    return false;
}

function esc(string $valore): string
{
    return htmlspecialchars($valore, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** @param array<string,mixed> $corpo */
function rispondi(array $corpo, int $stato = 200): void
{
    http_response_code($stato);
    echo json_encode($corpo, JSON_UNESCAPED_UNICODE);
    exit;
}
