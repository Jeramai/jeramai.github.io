/* Inlines the stylesheet into each exported page, removing one render-blocking round trip. */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...htmlFiles(path));
    else if (name.endsWith('.html')) out.push(path);
  }
  return out;
}

const LINK = /<link rel="stylesheet" href="([^"]+\.css)"[^>]*\/?>/g;

let inlined = 0;
let bytes = 0;

for (const file of htmlFiles('out')) {
  const html = readFileSync(file, 'utf8');
  let changed = false;

  const next = html.replace(LINK, (tag, href) => {
    const cssPath = join('out', href.split('?')[0].replace(/^\//, ''));
    let css;
    try {
      css = readFileSync(cssPath, 'utf8');
    } catch {
      return tag;
    }
    changed = true;
    inlined++;
    bytes += css.length;
    return `<style>${css}</style>`;
  });

  if (changed) writeFileSync(file, next);
}

console.log(`Inlined ${inlined} stylesheet(s), ${bytes} bytes of CSS.`);
