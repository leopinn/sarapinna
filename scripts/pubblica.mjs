/**
 * Pubblica il sito compilato sul ramo "deploy".
 *
 * Hostinger clona il repository ma non compila: il ramo "main" contiene i
 * sorgenti, il ramo "deploy" contiene il contenuto di dist/ pronto da servire.
 * Ogni pubblicazione riscrive la storia di "deploy": è un ramo usa e getta,
 * non ci si lavora sopra.
 *
 * Uso: npm run pubblica   (esegue prima il build)
 */

import { execFileSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';

const git = (argomenti, opzioni = {}) =>
  execFileSync('git', argomenti, { stdio: 'pipe', encoding: 'utf8', ...opzioni }).trim();

if (!existsSync('dist/index.html')) {
  console.error('dist/ non contiene il sito: esegui prima "npm run build".');
  process.exit(1);
}

const origine = git(['remote', 'get-url', 'origin']);
const commit = git(['rev-parse', '--short', 'HEAD']);
const ramoAttuale = git(['rev-parse', '--abbrev-ref', 'HEAD']);

// Il build parte da un repository usa e getta dentro dist/: così il ramo
// "deploy" contiene i file del sito in radice, senza il prefisso dist/.
rmSync('dist/.git', { recursive: true, force: true });

const inDist = { cwd: 'dist' };
git(['init', '-q', '-b', 'deploy'], inDist);
git(['remote', 'add', 'origin', origine], inDist);
git(['add', '-A'], inDist);
git(['commit', '-q', '-m', `Sito compilato da ${ramoAttuale} ${commit}`], inDist);
git(['push', '-q', '--force', 'origin', 'deploy'], inDist);

rmSync('dist/.git', { recursive: true, force: true });

console.log(`Ramo "deploy" aggiornato con il build di ${ramoAttuale} ${commit}.`);
console.log('Ora in hPanel: GIT -> Deploy, e il sito è aggiornato.');
