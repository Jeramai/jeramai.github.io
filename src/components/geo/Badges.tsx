'use client';

import { AD_GAME_END, AD_GAME_START } from '@/components/geo/AdPopups';
import { JUKEBOX_PLAY } from '@/components/geo/MidiJukebox';
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
  {
    key: 'blink',
    title: 'Blink tag enabled',
    top: '<BLINK>',
    bottom: 'ENABLED',
    ink: '#fff3a0',
    bg: '#2a1500',
    accent: '#ffaa00'
  },
  { key: 'html', title: 'Valid HTML 4.0', top: 'VALID', bottom: 'HTML 4.0', ink: '#ffffff', bg: '#003366', accent: '#ffcc00' },
  { key: 'y2k', title: 'Y2K compliant', top: 'Y2K', bottom: 'COMPLIANT', ink: '#d9f7ff', bg: '#001b2e', accent: '#00e0a0' },
  {
    key: 'comic',
    title: 'Comic Sans approved',
    top: 'COMIC SANS',
    bottom: 'APPROVED',
    ink: '#3a1030',
    bg: '#ffd9f2',
    accent: '#c4009c'
  },
  { key: 'midi', title: 'MIDI powered', top: 'MIDI', bottom: 'POWERED', ink: '#ffffff', bg: '#3a0d4d', accent: '#ff7be5' },
  {
    key: 'adfree',
    title: '100 percent ad free',
    top: '100% AD',
    bottom: 'FREE!',
    ink: '#ffffff',
    bg: '#0b2a12',
    accent: '#3dff7a'
  },
  {
    key: 'browser',
    title: 'Your browser is wrong',
    top: 'YOUR BROWSER',
    bottom: 'IS WRONG',
    ink: '#ffd0d0',
    bg: '#3a0b0b',
    accent: '#ff5555'
  }
];

const DIALOGS: Record<string, { title: string; lines: () => string[] }> = {
  netscape: {
    title: 'Downloading Netscape Navigator 4.0',
    lines: () => [
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
    lines: () => [
      '<!-- Written entirely in Notepad. -->',
      '<!-- Any resemblance to a build step -->',
      '<!-- is purely coincidental.        -->',
      '',
      '(File > Save As > All Files, or it',
      'becomes index.html.txt again.)'
    ]
  },
  browser: {
    title: 'Browser Compatibility Check',
    lines: browserLines
  },
  y2k: {
    title: 'Y2K Compliance Certificate',
    lines: y2kLines
  },
  html: {
    title: 'W3C Markup Validation Service',
    lines: () => [
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

const AD_FREE_BROKEN: Badge = {
  key: 'adfree',
  title: 'Ad free, allegedly',
  top: 'AD FREE',
  bottom: '???',
  ink: '#ffd4d4',
  bg: '#2b0000',
  accent: '#ff3b3b'
};

const pad = (n: number) => String(n).padStart(2, '0');

const MODES = new Set(['res', 'comic', 'blink']);
const ACTIONS: Record<string, () => void> = {
  midi: () => window.dispatchEvent(new Event(JUKEBOX_PLAY)),
  adfree: () => window.dispatchEvent(new Event(AD_GAME_START))
};

function y2kLines() {
  const seconds = Math.floor((Date.now() - new Date('2000-01-01T00:00:00').getTime()) / 1000);
  const days = Math.floor(seconds / 86400);
  const years = Math.floor(days / 365.25);
  const spare = days - Math.floor(years * 365.25);
  const clock = `${pad(Math.floor((seconds % 86400) / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;
  return [
    'Status: COMPLIANT',
    '',
    'Millennium bug due 1 Jan 2000, 00:00:00.',
    `Time since: ${years} years, ${spare} days, ${clock}`,
    '',
    'Subsystems checked:',
    '',
    '  [OK] Date fields ....... no failures',
    '  [OK] Screen blanker .... idle 60s',
    '  [OK] Cheat code ........ 10 keys, ends B A',
    '  [OK] Advert filter ..... 0 blocked',
    '',
    'Two-digit years remain unsupported.'
  ];
}

function browserLines() {
  const ua = navigator.userAgent;
  const found =
    /Edg\/([\d.]+)/.exec(ua) ??
    /Chrome\/([\d.]+)/.exec(ua) ??
    /Version\/([\d.]+).*Safari/.exec(ua) ??
    /Firefox\/([\d.]+)/.exec(ua);
  const name = /Edg\//.test(ua)
    ? 'Edge'
    : /Chrome\//.test(ua)
      ? 'Chrome'
      : /Safari/.test(ua)
        ? 'Safari'
        : /Firefox\//.test(ua)
          ? 'Firefox'
          : 'something';
  const version = found?.[1]?.split('.')[0] ?? '?';
  return [
    `Detected: ${name} ${version}`,
    '',
    `${name} did not exist in 1997.`,
    'This page was tested against',
    'Netscape Navigator 4.0 and',
    'Internet Explorer 4.',
    '',
    'Proceed at your own risk.'
  ];
}

function Button88({ badge, active, onPick }: Readonly<{ badge: Badge; active: boolean; onPick: () => void }>) {
  return (
    <button
      type='button'
      onClick={onPick}
      aria-label={badge.title}
      aria-pressed={MODES.has(badge.key) ? active : undefined}
      className='shrink-0 leading-none transition-transform hover:-translate-y-0.5'
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

export default function Badges() {
  const [modes, setModes] = useState<Record<string, boolean>>({});
  const [dialog, setDialog] = useState<string | null>(null);
  const [ads, setAds] = useState(false);
  const [, retick] = useState(0);

  useEffect(() => {
    if (dialog !== 'y2k') return;
    const id = window.setInterval(() => retick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, [dialog]);

  useEffect(() => {
    const onEnd = () => setAds(false);
    window.addEventListener(AD_GAME_END, onEnd);
    return () => window.removeEventListener(AD_GAME_END, onEnd);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute('data-letterbox', !!modes.res);
    root.toggleAttribute('data-comic', !!modes.comic);
    root.toggleAttribute('data-blink', !!modes.blink);
  }, [modes.res, modes.comic, modes.blink]);

  const pick = (key: string) => {
    if (key === 'adfree') setAds(true);
    if (MODES.has(key)) setModes((m) => ({ ...m, [key]: !m[key] }));
    else if (ACTIONS[key]) ACTIONS[key]();
    else setDialog(key);
  };

  const open = dialog ? DIALOGS[dialog] : null;

  return (
    <>
      <div className='flex flex-wrap justify-center gap-2'>
        {BADGES.map((b) => (
          <Button88
            key={b.key}
            badge={b.key === 'adfree' && ads ? AD_FREE_BROKEN : b}
            active={!!modes[b.key]}
            onPick={() => pick(b.key)}
          />
        ))}
      </div>

      {open ? (
        <div className='fixed inset-0 z-[85] flex items-center justify-center bg-black/60 p-4'>
          <div className='edge theme-shadow w-full max-w-[440px] bg-panel'>
            <p className='head-gradient m-0 flex items-center justify-between px-3 py-1.5 font-display text-sm font-bold'>
              {open.title}
              <button type='button' onClick={() => setDialog(null)} className='edge-thin px-2 leading-none' aria-label='Close'>
                x
              </button>
            </p>
            <pre className='m-0 overflow-x-auto p-4 font-mono text-[0.78rem] whitespace-pre-wrap text-ink'>
              {open.lines().join('\n')}
            </pre>
          </div>
        </div>
      ) : null}
    </>
  );
}
