import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sarapinna.it',
  // Sito interamente statico: l'hosting condiviso Hostinger serve HTML e PHP,
  // non esegue Node. Il form passa da public/api/contatti.php, che finisce
  // nel build cosi' com'e' e invia via SMTP con PHPMailer.
  output: 'static',
});
