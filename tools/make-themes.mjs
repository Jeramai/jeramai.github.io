/* Generates src/app/themes.css and src/lib/themes.generated.ts. Run: npm run themes */

import { writeFileSync } from 'node:fs';

const COUNT = 99;

/* ------------------------------- colour math ------------------------------ */

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const t =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return t.map((v) => Math.round((v + m) * 255));
}

function hex(h, s, l) {
  return (
    '#' +
    hslToRgb(h, s, l)
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
  );
}

const channel = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

const r1 = (n) => Math.round(n);

function luminance(h, s, l) {
  const [r, g, b] = hslToRgb(h, s, l);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a, b) {
  const la = luminance(...a);
  const lb = luminance(...b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/* Walks the foreground lightness away from the background until the ratio passes. */
function fit(fg, bg, target) {
  if (contrast(fg, bg) >= target) return fg;
  const up = luminance(...bg) < 0.18;
  let best = fg;
  for (let i = 1; i <= 100; i++) {
    const l = up ? Math.min(100, fg[2] + i) : Math.max(0, fg[2] - i);
    const cand = [fg[0], fg[1], l];
    best = cand;
    if (contrast(cand, bg) >= target) return cand;
    if (l === 0 || l === 100) break;
  }
  const bw = up ? [fg[0], 0, 100] : [fg[0], 0, 0];
  return contrast(bw, bg) > contrast(best, bg) ? bw : best;
}

/* Header text sits on a gradient, so it must pass against both ends at once. */
function fitHead(hA, hB, sat) {
  let best = null;
  for (const s of [sat, sat * 0.8, sat * 0.6, sat * 0.4]) {
    for (let base = 14; base <= 86; base += 2) {
      const A = [hA, s, Math.min(96, base + 8)];
      const B = [hB, s, Math.max(4, base - 8)];
      for (const ink of [
        [hA, 30, 7],
        [hA, 10, 97]
      ]) {
        const worst = Math.min(contrast(ink, A), contrast(ink, B));
        if (!best || worst > best.worst) best = { A, B, ink, worst };
        if (worst >= 5.2) return best;
      }
    }
  }
  return best;
}

/* --------------------------------- moods --------------------------------- */

const MOODS = {
  rave: {
    hue: [280, 330],
    sat: [90, 100],
    dark: true,
    spread: 140,
    names: ['NEON', 'LASER', 'STROBE', 'RAVE', 'PLASMA', 'VOLTAGE', 'BLACKLIGHT', 'AFTERPARTY', 'HYPERDRIVE']
  },
  cheer: {
    hue: [320, 40],
    sat: [70, 92],
    dark: false,
    spread: 90,
    names: ['COTTON CANDY', 'BUBBLEGUM', 'SUNNY DAY', 'PEPTO', 'SHERBET', 'LEMONADE', 'PARTY MIX', 'SPRINKLES', 'WET PAINT']
  },
  mech: {
    hue: [35, 55],
    sat: [85, 100],
    dark: true,
    spread: 20,
    names: [
      'HAZARD TAPE',
      'SAFETY ORANGE',
      'FIRE DRILL',
      'WET FLOOR',
      'ROAD WORK',
      'DETOUR AHEAD',
      'HARD HAT',
      'FORKLIFT',
      'SCAFFOLD'
    ]
  },
  eerie: {
    hue: [95, 290],
    sat: [55, 85],
    dark: true,
    spread: 40,
    names: [
      'HAUNTED MANSION',
      'CRYPT KEEPER',
      'SPOOKY SCARY',
      'WEREWOLF NIGHT',
      'GRAVEYARD SHIFT',
      'COLD SPOT',
      'SEANCE',
      'THE ATTIC',
      'MOTH HOUR'
    ]
  },
  tropic: {
    hue: [160, 200],
    sat: [75, 95],
    dark: false,
    spread: 120,
    names: [
      'TROPICAL PARADISE',
      'MIAMI SUNSET',
      'BEACH PARTY',
      'SURF SHACK',
      'TIKI LOUNGE',
      'PALM SPRINGS',
      'LAGOON',
      'SNORKEL',
      'MAI TAI'
    ]
  },
  dream: {
    hue: [230, 300],
    sat: [60, 88],
    dark: true,
    spread: 110,
    names: [
      'LAVA LAMP',
      'VAPOR TRAIL',
      'UNICORN DUST',
      'SLUMBER PARTY',
      'CLOUD NINE',
      'SOFT SERVE',
      'MOONBEAM',
      'DAYDREAM',
      'PILLOW FORT'
    ]
  },
  regal: {
    hue: [265, 290],
    sat: [55, 80],
    dark: true,
    spread: 60,
    names: [
      'ROYAL PURPLE',
      'JADE TEMPLE',
      'AMETHYST HALL',
      'VELVET ROPE',
      'OPERA HOUSE',
      'GILDED AGE',
      'GRAND BALLROOM',
      'THRONE ROOM',
      'COURT JESTER'
    ]
  },
  calm: {
    hue: [130, 200],
    sat: [28, 55],
    dark: false,
    spread: 70,
    names: [
      'NOTEPAD PLAIN',
      'MALACHITE',
      'FOREST FLOOR',
      'MOSS GARDEN',
      'FULL MOON',
      'STILL WATER',
      'LINEN',
      'DRIFTWOOD',
      'FOG BANK'
    ]
  },
  epic: {
    hue: [0, 30],
    sat: [88, 100],
    dark: true,
    spread: 30,
    names: [
      'INFERNO',
      'MOLTEN CORE',
      'SOLAR FLARE',
      'NUCLEAR SUNSET',
      'HOT SAUCE',
      'DRAGONFIRE',
      'SUPERNOVA',
      'MAGMA',
      'SCORCHED'
    ]
  },
  retro: {
    hue: [40, 130],
    sat: [80, 100],
    dark: true,
    spread: 90,
    names: [
      'RAW HTML',
      'DIAL-UP DAYS',
      'SPACE INVADERS',
      'GREEN SCREEN',
      'FLOPPY DISK',
      'CATHODE',
      'PHOSPHOR',
      'MAINFRAME',
      'PUNCH CARD'
    ]
  },
  funk: {
    hue: [15, 320],
    sat: [80, 95],
    dark: false,
    spread: 130,
    names: [
      'DISCO INFERNO',
      'ROLLER RINK',
      'TRAPPER KEEPER',
      'BOOGIE NIGHT',
      'SHAG CARPET',
      'LAVA GROOVE',
      'FUNKY TOWN',
      'MIRROR BALL',
      'PLATFORM SHOE'
    ]
  }
};

/* ------------------------------ archetypes ------------------------------- */

const ARCHS = {
  glow: {
    w: '1px',
    r: '0px',
    shadow: '0 0 14px -2px var(--accent), 0 0 0 1px #0006',
    spacing: '0.2em',
    display: "'Arial Black', Impact, sans-serif",
    body: 'Verdana, Geneva, sans-serif',
    pattern: 'grid'
  },
  cute: {
    w: '3px',
    r: '14px',
    shadow: '4px 4px 0 #0004',
    spacing: '0.06em',
    display: "'Comic Sans MS', 'Chalkboard SE', cursive",
    body: "'Comic Sans MS', 'Chalkboard SE', cursive",
    pattern: 'dots'
  },
  terminal: {
    w: '1px',
    r: '0px',
    shadow: 'none',
    spacing: '0.16em',
    display: "'Courier New', monospace",
    body: "'Courier New', monospace",
    pattern: 'scan'
  },
  ornate: {
    w: '4px',
    r: '2px',
    shadow: 'inset 0 0 0 2px #0005, 3px 3px 0 #0006',
    spacing: '0.22em',
    display: "Georgia, 'Times New Roman', serif",
    body: "Georgia, 'Times New Roman', serif",
    pattern: 'damask'
  },
  banner: {
    w: '2px',
    r: '0px',
    shadow: '0 4px 0 #0004',
    spacing: '0.14em',
    display: "Impact, 'Arial Black', sans-serif",
    body: 'Tahoma, Verdana, sans-serif',
    pattern: 'stripe'
  },
  sticker: {
    w: '3px',
    r: '20px',
    shadow: '5px 5px 0 #0005',
    spacing: '0.05em',
    display: "'Trebuchet MS', Verdana, sans-serif",
    body: "'Trebuchet MS', Verdana, sans-serif",
    pattern: 'confetti'
  },
  heavy: {
    w: '6px',
    r: '0px',
    shadow: '0 0 0 2px #000',
    spacing: '0.24em',
    display: "Impact, 'Arial Black', sans-serif",
    body: 'Tahoma, Verdana, sans-serif',
    pattern: 'diagonal'
  },
  paper: {
    w: '1px',
    r: '0px',
    shadow: '2px 2px 6px #0003',
    spacing: '0.1em',
    display: "Georgia, 'Times New Roman', serif",
    body: "'Times New Roman', Times, serif",
    pattern: 'none'
  },
  plain: {
    w: '1px',
    r: '0px',
    shadow: 'none',
    spacing: '0.04em',
    display: "'Times New Roman', Times, serif",
    body: "'Times New Roman', Times, serif",
    pattern: 'none'
  },
  starry: {
    w: '2px',
    r: '0px',
    shadow: '0 0 10px -3px var(--accent-2)',
    spacing: '0.18em',
    display: "'Arial Black', Impact, sans-serif",
    body: 'Verdana, Geneva, sans-serif',
    pattern: 'stars'
  },
  blocky: {
    w: '5px',
    r: '0px',
    shadow: '6px 6px 0 #0006',
    spacing: '0.1em',
    display: "'Arial Black', Impact, sans-serif",
    body: 'Arial, Helvetica, sans-serif',
    pattern: 'checker'
  },
  zine: {
    w: '2px',
    r: '0px',
    shadow: '3px 3px 0 var(--hot)',
    spacing: '0.02em',
    display: "'Courier New', monospace",
    body: 'Arial, Helvetica, sans-serif',
    pattern: 'noise'
  },
  frame: {
    w: '3px',
    r: '0px',
    shadow: 'inset 2px 2px 0 #fff3, inset -2px -2px 0 #0006',
    spacing: '0.12em',
    display: 'Tahoma, Verdana, sans-serif',
    body: 'Tahoma, Verdana, sans-serif',
    pattern: 'checker'
  },
  bare: {
    w: '0px',
    r: '0px',
    shadow: 'none',
    spacing: '0.08em',
    display: 'Verdana, Geneva, sans-serif',
    body: 'Verdana, Geneva, sans-serif',
    pattern: 'none'
  }
};

/* ------------------------------- patterns -------------------------------- */

function pattern(kind, a, b) {
  switch (kind) {
    case 'grid':
      return `linear-gradient(${a} 1px, transparent 1px), linear-gradient(90deg, ${a} 1px, transparent 1px)`;
    case 'dots':
      return `radial-gradient(${a} 1.5px, transparent 1.6px)`;
    case 'scan':
      return `repeating-linear-gradient(180deg, ${a} 0 1px, transparent 1px 3px)`;
    case 'damask':
      return `radial-gradient(circle at 50% 50%, ${a} 0 3px, transparent 4px), radial-gradient(circle at 0 0, ${b} 0 2px, transparent 3px)`;
    case 'stripe':
      return `repeating-linear-gradient(90deg, ${a} 0 3px, transparent 3px 22px)`;
    case 'confetti':
      return `radial-gradient(${a} 2px, transparent 2.5px), radial-gradient(${b} 1.5px, transparent 2px)`;
    case 'diagonal':
      return `repeating-linear-gradient(45deg, ${a} 0 6px, transparent 6px 18px)`;
    case 'stars':
      return `radial-gradient(1px 1px at 20% 30%, ${a}, transparent), radial-gradient(1px 1px at 70% 60%, ${b}, transparent), radial-gradient(1.5px 1.5px at 45% 85%, ${a}, transparent)`;
    case 'checker':
      return `repeating-conic-gradient(${a} 0% 25%, transparent 0% 50%)`;
    case 'noise':
      return `repeating-linear-gradient(45deg, ${a} 0 1px, transparent 1px 5px), repeating-linear-gradient(-45deg, ${b} 0 1px, transparent 1px 7px)`;
    default:
      return 'none';
  }
}

const PATTERN_SIZE = {
  grid: '40px 40px',
  dots: '18px 18px',
  scan: 'auto',
  damask: '60px 60px',
  stripe: '44px 44px',
  confetti: '52px 52px, 31px 31px',
  diagonal: '36px 36px',
  stars: '260px 260px, 190px 190px, 320px 320px',
  checker: '32px 32px',
  noise: '14px 14px, 18px 18px'
};

/* -------------------------------- builder -------------------------------- */

function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(r, lo, hi) {
  return lo + r() * (hi - lo);
}

function buildTheme(id, name, mood, archName, seed, crt) {
  const M = MOODS[mood];
  const A = ARCHS[archName];
  const r = rng(seed);

  const h = (pick(r, M.hue[0], M.hue[1]) + 360) % 360;
  const h2 = (h + M.spread * (r() < 0.5 ? 1 : -1) + 360) % 360;
  const h3 = (h + 180 + pick(r, -40, 40) + 360) % 360;
  const sat = pick(r, M.sat[0], M.sat[1]);

  const bgL = M.dark ? pick(r, 5, 12) : pick(r, 88, 95);
  const bg = [h, Math.min(sat, M.dark ? 45 : 28), bgL];
  const panel = [h, Math.min(sat, M.dark ? 38 : 22), M.dark ? bgL + 6 : bgL - 5];
  const panel2 = [h, Math.min(sat, M.dark ? 40 : 24), M.dark ? bgL + 3 : bgL - 2];

  const ink = fit([h, 14, M.dark ? 94 : 12], panel, 8);
  const inkDim = fit([h, 18, M.dark ? 72 : 34], panel, 4.6);
  const accent = fit([h2, sat, M.dark ? 62 : 40], panel, 4.6);
  const accent2 = fit([h3, sat, M.dark ? 66 : 38], panel, 4.6);
  const hot = fit([(h2 + 30) % 360, Math.min(100, sat + 10), M.dark ? 64 : 44], panel, 4.6);
  const link = fit([h2, sat, M.dark ? 70 : 34], panel, 4.6);
  const linkVisited = fit([(h2 + 45) % 360, sat - 15, M.dark ? 74 : 42], panel, 4.6);

  const head = fitHead(h2, (h2 + 22) % 360, Math.min(100, sat));
  const headA = head.A;
  const headB = head.B;
  const headInk = head.ink;

  const marqueeBg = [h, Math.min(sat, 55), M.dark ? 9 : 18];
  const marqueeInk = fit([h2, sat, 72], marqueeBg, 5);
  const marqueeSep = fit([h3, sat, 66], marqueeBg, 4.6);

  const border = fit([h2, Math.min(sat, 90), M.dark ? 52 : 42], panel, 3);

  const patA = M.dark ? `hsl(${r1(h2)} ${r1(sat)}% 62% / 0.14)` : `hsl(${r1(h2)} ${r1(sat)}% 34% / 0.13)`;
  const patB = M.dark ? `hsl(${r1(h3)} ${r1(sat)}% 66% / 0.11)` : `hsl(${r1(h3)} ${r1(sat)}% 38% / 0.1)`;

  return {
    id,
    name,
    mood,
    arch: archName,
    seed,
    crt,
    css: {
      '--bg': hex(...bg),
      '--bg-image': pattern(A.pattern, patA, patB),
      '--bg-size': PATTERN_SIZE[A.pattern] || 'auto',
      '--panel': hex(...panel),
      '--panel-2': hex(...panel2),
      '--ink': hex(...ink),
      '--ink-dim': hex(...inkDim),
      '--accent': hex(...accent),
      '--accent-2': hex(...accent2),
      '--hot': hex(...hot),
      '--link': hex(...link),
      '--link-visited': hex(...linkVisited),
      '--border': hex(...border),
      '--head-a': hex(...headA),
      '--head-b': hex(...headB),
      '--head-ink': hex(...headInk),
      '--marquee-bg': hex(...marqueeBg),
      '--marquee-ink': hex(...marqueeInk),
      '--marquee-sep': hex(...marqueeSep),
      '--border-w': A.w,
      '--radius': A.r,
      '--shadow': A.shadow,
      '--head-spacing': A.spacing,
      '--font-display': A.display,
      '--font-body': A.body
    },
    checks: {
      ink: contrast(ink, panel),
      inkDim: contrast(inkDim, panel),
      accent: contrast(accent, panel),
      link: contrast(link, panel),
      headInkA: contrast(headInk, headA),
      headInkB: contrast(headInk, headB),
      marquee: contrast(marqueeInk, marqueeBg),
      marqueeSep: contrast(marqueeSep, marqueeBg)
    }
  };
}

/* --------------------------------- build --------------------------------- */

const moodKeys = Object.keys(MOODS);
const archKeys = Object.keys(ARCHS);
const themes = [];
const used = new Set();

for (let i = 0; i < COUNT; i++) {
  const mood = moodKeys[i % moodKeys.length];
  const arch = archKeys[(i * 5 + Math.floor(i / archKeys.length)) % archKeys.length];
  const seed = 7000 + i * 137;

  const pool = MOODS[mood].names;
  let name = pool[Math.floor(i / moodKeys.length) % pool.length];
  let n = 2;
  while (used.has(name)) name = `${pool[Math.floor(i / moodKeys.length) % pool.length]} ${n++}`;
  used.add(name);

  themes.push(buildTheme(`t${i + 1}`, name, mood, arch, seed, ARCHS[arch].pattern === 'scan' || mood === 'rave'));
}

/* -------------------------------- validate ------------------------------- */

const MINIMUMS = { ink: 7, inkDim: 4.5, accent: 4.5, link: 4.5, headInkA: 4.5, headInkB: 4.5, marquee: 4.5, marqueeSep: 4.5 };
const failures = [];
for (const t of themes) {
  for (const [key, min] of Object.entries(MINIMUMS)) {
    if (t.checks[key] < min - 0.01) failures.push(`${t.id} ${t.name}: ${key} ${t.checks[key].toFixed(2)} < ${min}`);
  }
}

if (failures.length) {
  console.error(`Contrast check failed for ${failures.length} pair(s):`);
  failures.slice(0, 20).forEach((f) => console.error('  ' + f));
  process.exit(1);
}

/* --------------------------------- emit ---------------------------------- */

/* :root carries theme 1 so the page is never unstyled; data-theme has equal specificity, so order decides. */
const rootBlock = `:root {\n${Object.entries(themes[0].css)
  .map(([k, v]) => `  ${k}: ${v};`)
  .join('\n')}\n}\n`;

const css = [
  '/* Generated by tools/make-themes.mjs - do not edit by hand. */',
  '',
  rootBlock,
  ...themes.map((t) => {
    const body = Object.entries(t.css)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n');
    const scan = t.crt
      ? `\n[data-theme='${t.id}'] body::after {\n  content: '';\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  pointer-events: none;\n  background: repeating-linear-gradient(180deg, #0000 0 2px, #0000000f 2px 4px);\n}\n`
      : '';
    return `[data-theme='${t.id}'] {\n${body}\n}\n${scan}`;
  }),
  'body {',
  '  background-size: var(--bg-size, auto);',
  '}',
  ''
].join('\n');

const ts = [
  '/* Generated by tools/make-themes.mjs - do not edit by hand. */',
  '',
  'export type Theme = {',
  '  id: string;',
  '  name: string;',
  '  mood: string;',
  '  arch: string;',
  '  seed: number;',
  '  crt: boolean;',
  '};',
  '',
  'const themes: Theme[] = [',
  ...themes.map(
    (t) =>
      `  { id: '${t.id}', name: ${JSON.stringify(t.name)}, mood: '${t.mood}', arch: '${t.arch}', seed: ${t.seed}, crt: ${t.crt} },`
  ),
  '];',
  '',
  'export default themes;',
  ''
].join('\n');

writeFileSync('src/app/themes.css', css);
writeFileSync('src/lib/themes.generated.ts', ts);

const worst = Object.fromEntries(Object.keys(MINIMUMS).map((k) => [k, Math.min(...themes.map((t) => t.checks[k])).toFixed(2)]));
console.log(`Wrote ${themes.length} themes. Worst contrast per pair:`, worst);
