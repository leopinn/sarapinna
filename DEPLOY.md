# Deploy su Hostinger (hosting condiviso)

Il piano Hostinger serve HTML e PHP, ma **non esegue Node**: niente gestore di
applicazioni Node.js in hPanel. Di conseguenza:

- il sito è **statico** (`output: 'static'`), compilato in locale;
- il form di contatto passa da **`public/api/contatti.php`**, che invia via SMTP
  dalla casella `info@sarapinna.it` usando PHPMailer (incluso in
  `public/api/lib/`, nessun Composer da eseguire sul server);
- l'endpoint Node `server-endpoints-unused/api/contatti.js` resta archiviato,
  inutilizzato, per il caso in cui un domani il sito giri su Node.

Due rami:

| Ramo | Contenuto | Chi lo scrive |
|---|---|---|
| `main` | i sorgenti | tu, con `git push` |
| `deploy` | il sito compilato (contenuto di `dist/`) | `npm run pubblica` |

Hostinger clona **`deploy`** dentro `public_html`.

## Configurazione iniziale (una volta sola)

### 1. Credenziali SMTP sul server
Le credenziali NON stanno in Git. Dal File Manager crea un file
**`smtp-config.php`** nella cartella del dominio, **fuori da `public_html`**
(quindi `domains/sarapinna.it/smtp-config.php`, allo stesso livello di
`public_html`), copiando `smtp-config.esempio.php` e mettendo i valori veri:

```php
<?php
return [
    'SMTP_HOST' => 'smtp.hostinger.com',
    'SMTP_PORT' => '465',
    'SMTP_USER' => 'info@sarapinna.it',
    'SMTP_PASS' => 'la password della casella',
    'MAIL_FROM' => 'info@sarapinna.it',
    'MAIL_FROM_NOME' => 'Sito sarapinna.it',
    'MAIL_TO' => 'info@sarapinna.it',
];
```

Sta fuori dalla cartella pubblica perché nessuno possa scaricarlo, e fuori da
`public_html` anche per non essere cancellato dai deploy.

### 2. hPanel → Avanzate → GIT
- Repository: `https://github.com/leopinn/sarapinna.git`
- **Branch: `deploy`** (non `main`: `main` contiene i sorgenti, non il sito)
- Directory: `public_html`

Se avevi già collegato `main`, elimina quel collegamento e ricrealo su `deploy`:
`public_html` deve essere vuota prima del primo clone.

### 3. Prova
Apri `https://sarapinna.it` e compila il form: deve arrivare la notifica a
`info@sarapinna.it` e l'auto-risposta a chi ha compilato.

## Ogni aggiornamento del sito

```bash
git push                # i sorgenti su main
npm run pubblica        # compila e aggiorna il ramo deploy
```

Poi in hPanel: **GIT → Deploy**. Attivando il webhook nella stessa schermata,
quel clic sparisce e il sito si aggiorna da solo a ogni `npm run pubblica`.

## Se qualcosa non va

- **Il form risponde 500 "SMTP non configurato"**: manca o non è leggibile
  `smtp-config.php`, oppure è nel posto sbagliato. Deve stare accanto a
  `public_html`, non dentro.
- **Errore SMTP in fase di invio**: se la porta 465 risulta bloccata, metti
  `'SMTP_PORT' => '587'` nel config: il codice passa da solo a STARTTLS.
- **403 aprendo il sito**: in `public_html` non c'è `index.html`. Quasi sempre
  significa che hai clonato il ramo `main` invece di `deploy`.
- **Le mail finiscono in spam**: è questione di record SPF e DKIM nel DNS del
  dominio, non di codice.
- **Il form dà "Troppi invii ravvicinati"**: è il rate limit, 3 invii ogni 10
  minuti per indirizzo IP. Si regola in cima a `public/api/contatti.php`.
