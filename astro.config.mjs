import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://sarapinna.it',
  // 'static' + adapter: le pagine restano pre-generate in HTML, mentre le rotte
  // con `export const prerender = false` (src/pages/api/) girano su Node.
  // Serve per l'invio SMTP del form: /api/contatti.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
});
