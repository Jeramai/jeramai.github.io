/* Stamps a banner into every exported page, so View Source still rewards a look. */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BANNER = `<!--

     ██╗███████╗██████╗  █████╗ ███╗   ███╗    █████╗ ██╗
     ██║██╔════╝██╔══██╗██╔══██╗████╗ ████║   ██╔══██╗██║
     ██║█████╗  ██████╔╝███████║██╔████╔██║   ███████║██║
██   ██║██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║   ██╔══██║██║
╚█████╔╝███████╗██║  ██║██║  ██║██║ ╚═╝ ██║██╗██║  ██║██║
 ╚════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝

  Hello, person who reads the source. You are my kind of visitor.

  Yes, this is Next.js under a 1997 costume. 1997 is not a typo, and
  neither is the Netscape line on the page. The 99 themes are not
  hand-written: tools/make-themes.mjs crosses 11 moods with 14 layout
  archetypes and refuses to build if any colour pair misses its
  contrast target. Worst case in the whole set is 4.6:1.

  The jukebox plays no .mid file either. Every theme composes its own
  tune from its seed, in WebAudio, at runtime.

  Source: https://github.com/Jeramai/jeramai.github.io

-->
`;

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...htmlFiles(path));
    else if (name.endsWith('.html')) out.push(path);
  }
  return out;
}

const files = htmlFiles('out');
let stamped = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  if (html.startsWith('<!--')) continue;
  writeFileSync(file, BANNER + html);
  stamped++;
}

console.log(`Stamped ${stamped} of ${files.length} exported pages.`);
