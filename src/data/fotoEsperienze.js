import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const cartellaFoto = join(process.cwd(), 'public', 'images', 'esperienze');
const percorsoWeb = '/images/esperienze';

let fileFoto = [];
try {
  fileFoto = readdirSync(cartellaFoto).filter((file) => /\.(jpe?g|png|webp|avif|gif)$/i.test(file));
} catch {
  // Se la cartella non esiste, i componenti usano la foto predefinita.
}

/** @param {string | number} numero @returns {string[]} */
export const fotoEsperienza = (numero) => {
  const prefisso = `esperienza_${Number(numero)}_foto_`;
  return fileFoto
    .filter((file) => file.startsWith(prefisso))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `${percorsoWeb}/${file}`);
};
