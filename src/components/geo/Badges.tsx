'use client';

import { useEffect, useState } from 'react';

type Badge = {
  key: string;
  title: string;
  top: string;
  bottom: string;
  ink: string;
  bg: string;
  accent: string;
};

const BADGES: Badge[] = [
  { key: 'netscape', title: 'Netscape Now!', top: 'NETSCAPE', bottom: 'NOW!', ink: '#ffffff', bg: '#1a1a2e', accent: '#5ab0ff' },
  {
    key: 'notepad',
    title: 'Made with Notepad',
    top: 'MADE WITH',
    bottom: 'NOTEPAD',
    ink: '#000000',
    bg: '#dcdcdc',
    accent: '#0000a0'
  },
  {
    key: 'res',
    title: 'Best viewed at 800x600',
    top: 'BEST VIEWED',
    bottom: '800 x 600',
    ink: '#ffff66',
    bg: '#202020',
    accent: '#ff6a00'
  },
  { key: 'y2k', title: 'Y2K compliant', top: 'Y2K', bottom: 'COMPLIANT', ink: '#00ff88', bg: '#04240f', accent: '#00ff88' },
  { key: 'html', title: 'Valid HTML 4.0', top: 'VALID', bottom: 'HTML 4.0', ink: '#ffffff', bg: '#003366', accent: '#ffcc00' }
];

const DIALOGS: Record<string, { title: string; lines: string[] }> = {
  netscape: {
    title: 'Downloading Netscape Navigator 4.0',
    lines: [
      'netscape32.exe — 11.4 MB',
      '',
      'Time remaining: 4 hours 12 minutes',
      'Transfer rate: 3.1 kB/sec',
      '',
      'Do not pick up the phone.'
    ]
  },
  notepad: {
    title: 'index.html — Notepad',
    lines: [
      '<!-- Written entirely in Notepad. -->',
      '<!-- Any resemblance to a build step -->',
      '<!-- is purely coincidental.        -->',
      '',
      '(File > Save As > All Files, or it',
      'becomes index.html.txt again.)'
    ]
  },
  html: {
    title: 'W3C Markup Validation Service',
    lines: [
      'Result: 0 Errors, 1 Warning',
      '',
      'Warning: document is not HTML 4.0.',
      'It is HTML5, rendered by a framework',
      'that did not exist in 1997.',
      '',
      'Badge retained anyway.'
    ]
  }
};

const MODES = new Set(['res', 'y2k']);

function Button88({ badge, active, onPick }: Readonly<{ badge: Badge; active: boolean; onPick: () => void }>) {
  return (
    <button
      type='button'
      onClick={onPick}
      aria-label={badge.title}
      aria-pressed={MODES.has(badge.key) ? active : undefined}
      className='shrink-0 cursor-pointer leading-none transition-transform hover:-translate-y-0.5'
    >
      <svg
        aria-hidden='true'
        viewBox='0 0 88 31'
        width='88'
        height='31'
        shapeRendering='crispEdges'
        className='h-[31px] w-[88px]'
      >
        <rect width='88' height='31' fill={badge.bg} />
        <rect width='88' height='31' fill='none' stroke={active ? '#ffffff' : badge.accent} strokeWidth='2' />
        <rect x='3' y='3' width='82' height='25' fill='none' stroke={badge.ink} strokeWidth='1' opacity='0.35' />
        <text
          x='44'
          y='13'
          fontFamily="'Courier New', monospace"
          fontSize='8'
          fontWeight='700'
          fill={badge.accent}
          textAnchor='middle'
        >
          {badge.top}
        </text>
        <text
          x='44'
          y='24'
          fontFamily="'Courier New', monospace"
          fontSize='9'
          fontWeight='700'
          fill={badge.ink}
          textAnchor='middle'
        >
          {badge.bottom}
        </text>
      </svg>
    </button>
  );
}

const originals = new WeakMap<Text, string>();

/* Y2K works on the live text, so any year on the page rolls over the way they feared it would. */
function breakYears(on: boolean) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const hits: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.parentElement?.closest('[data-y2k-safe]')) continue;
    if (on ? /\b(19|20)\d{2}\b/.test(node.data) : node.data.includes('19100')) hits.push(node);
  }
  hits.forEach((n) => {
    if (on) {
      originals.set(n, n.data);
      n.data = n.data.replace(/\b(19|20)\d{2}\b/g, '19100');
    } else {
      const original = originals.get(n);
      if (original) n.data = original;
    }
  });
}

export default function Badges() {
  const [modes, setModes] = useState<Record<string, boolean>>({});
  const [dialog, setDialog] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute('data-letterbox', !!modes.res);
  }, [modes.res]);

  useEffect(() => {
    breakYears(!!modes.y2k);
  }, [modes.y2k]);

  const pick = (key: string) => {
    if (MODES.has(key)) setModes((m) => ({ ...m, [key]: !m[key] }));
    else setDialog(key);
  };

  const open = dialog ? DIALOGS[dialog] : null;

  return (
    <>
      <div className='flex flex-wrap justify-center gap-2'>
        {BADGES.map((b) => (
          <Button88 key={b.key} badge={b} active={!!modes[b.key]} onPick={() => pick(b.key)} />
        ))}
      </div>

      {open ? (
        <div className='fixed inset-0 z-[85] flex items-center justify-center bg-black/60 p-4' data-y2k-safe>
          <div className='edge theme-shadow w-full max-w-[440px] bg-panel'>
            <p className='head-gradient m-0 flex items-center justify-between px-3 py-1.5 font-display text-sm font-bold'>
              {open.title}
              <button type='button' onClick={() => setDialog(null)} className='edge-thin px-2 leading-none' aria-label='Close'>
                x
              </button>
            </p>
            <pre className='m-0 overflow-x-auto p-4 font-mono text-[0.78rem] whitespace-pre-wrap text-ink'>
              {open.lines.join('\n')}
            </pre>
          </div>
        </div>
      ) : null}
    </>
  );
}
