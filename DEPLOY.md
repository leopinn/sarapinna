# Deploy su Hostinger (hosting Node.js, sorgenti da Git)

Hostinger clona il repository e compila il sito sul server: in Git non finiscono
né `dist/` né `node_modules/` né il file `.env`.

## Configurazione iniziale (una volta sola)

### 1. Cartella dell'applicazione
L'app NON va in `public_html`: lì Apache servirebbe i file direttamente,
esponendo il contenuto di `dist/server/`. Usa una cartella separata, per esempio
`domains/sarapinna.it/app`, e lascia `public_html` vuota: ci pensa Passenger a
inoltrare le richieste al processo Node.

### 2. hPanel → Avanzate → GIT
- Repository: `https://github.com/leopinn/sarapinna.git`
- Branch: `main`
- Cartella di destinazione: `domains/sarapinna.it/app` (dev'essere vuota)

### 3. hPanel → Avanzate → Node.js
| Campo | Valore |
|---|---|
| Versione Node.js | 20 o 22 |
| Application root | `domains/sarapinna.it/app` |
| Application URL | `sarapinna.it` |
| Startup file | `dist/server/entry.mjs` |
| Application mode | Production |

### 4. Variabili d'ambiente
Nella schermata dell'app Node, sezione "Environment variables". In produzione il
file `.env` non viene letto: senza queste variabili l'endpoint del form risponde
500 "SMTP non configurato".

    SMTP_HOST=smtp.hostinger.com
    SMTP_PORT=465            # 587 se la 465 risulta bloccata (passa da solo a STARTTLS)
    SMTP_USER=info@sarapinna.it
    SMTP_PASS=<password della casella di posta>
    MAIL_FROM=info@sarapinna.it
    MAIL_FROM_NOME=Sito sarapinna.it
    MAIL_TO=info@sarapinna.it

## Ogni aggiornamento del sito

1. In locale: `git push`
2. hPanel → GIT → **Deploy** (oppure attiva il webhook per farlo da solo)
3. hPanel → Node.js → **Run NPM Install**, solo se sono cambiate le dipendenze
4. hPanel → Node.js → **Run JS script** → `build`
5. hPanel → Node.js → **Restart**

## Se qualcosa non va

- **503 o pagina bianca**: startup file sbagliato. Dev'essere esattamente
  `dist/server/entry.mjs`, relativo alla application root.
- **`npm install` fallisce su sharp**: usa il comando npm personalizzato
  `install --omit=optional`.
- **Il build va in "out of memory"**: l'hosting condiviso non regge Vite. In quel
  caso si compila in locale e si carica `dist/` via FTP, o si passa a un ramo
  `deploy` che contiene già il build.
- **Il form risponde 500**: mancano le variabili d'ambiente del punto 4.
- **Le mail finiscono in spam**: è questione di record SPF e DKIM nel DNS del
  dominio, non di codice.
