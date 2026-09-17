import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sarapinna.it',
  // 'static' genera un sito statico: il form usa EmailJS lato client.
  // Se vuoi usare l'endpoint src/pages/api/contatti.js, passa a output: 'server'
  // e installa un adapter (es. @astrojs/vercel o @astrojs/node).
  output: 'static',
});
