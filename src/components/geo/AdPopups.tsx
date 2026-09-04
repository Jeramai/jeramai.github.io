'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const AD_GAME_START = 'jf:ads-start';
export const AD_GAME_END = 'jf:ads-end';

const LOSE_AT = 10;
const FIRST_MS = 1500;
const FLOOR_MS = 400;
const STEP_MS = 60;
const SPLIT_ODDS = 0.25;
const POPUP_W = 264;
const POPUP_H = 152;
const EDGE = 8;

type Ad = { title: string; head: string; sub: string; bg: string; ink: string; hot: string };
type Popup = { id: number; ad: Ad; x: number; y: number };

const ADS: Ad[] = [
  {
    title: 'Congratulations!!!',
    head: 'You are visitor 1,000,000',
    sub: 'Claim your prize before it expires',
    bg: '#1b0033',
    ink: '#ffd9ff',
    hot: '#ff2bd1'
  },
  {
    title: 'ram-download.exe',
    head: 'Download more RAM',
    sub: 'Free upgrade, no hardware required',
    bg: '#00281a',
    ink: '#c9ffe6',
    hot: '#00ff88'
  },
  {
    title: 'punch-the-monkey.cgi',
    head: 'Punch the monkey',
    sub: 'Hit him and win $20 instantly',
    bg: '#2a1400',
    ink: '#ffe2b8',
    hot: '#ff9500'
  },
  {
    title: 'System Warning',
    head: 'Your PC may be infected',
    sub: '17 threats found. Scan now.',
    bg: '#2b0000',
    ink: '#ffd4d4',
    hot: '#ff3b3b'
  },
  {
    title: 'Y2K Readiness Check',
    head: 'Is your PC ready for 2000?',
    sub: 'Only 1 day remaining',
    bg: '#001d3d',
    ink: '#cfe6ff',
    hot: '#4dc3ff'
  },
  {
    title: 'FREE iMAC',
    head: 'Win a Bondi Blue iMac',
    sub: 'Complete 47 offers to qualify',
    bg: '#003a3a',
    ink: '#d6ffff',
    hot: '#3df0ff'
  },
  {
    title: 'Smiley Central',
    head: '1000 free smileys',
    sub: 'Toolbar included at no extra cost',
    bg: '#3a3000',
    ink: '#fff7c2',
    hot: '#ffe600'
  },
  {
    title: 'webring.cgi',
    head: 'Join the webring',
    sub: '412 sites and growing',
    bg: '#180033',
    ink: '#e2d4ff',
    hot: '#a970ff'
  }
];

let nextId = 0;

function makePopup(): Popup {
  const maxX = Math.max(EDGE, window.innerWidth - POPUP_W - EDGE);
  const maxY = Math.max(EDGE, window.innerHeight - POPUP_H - EDGE);
  return {
    id: nextId++,
    ad: ADS[Math.floor(Math.random() * ADS.length)],
    x: EDGE + Math.random() * (maxX - EDGE),
    y: EDGE + Math.random() * (maxY - EDGE)
  };
}

function splitPopups(): Popup[] {
  return Math.random() < SPLIT_ODDS ? [makePopup(), makePopup()] : [];
}

function verdict(score: number) {
  if (score === 0) return 'You closed nothing. The badge lied and you believed it.';
  if (score < 12) return 'The badge said AD FREE. It did not say pop-up free.';
  if (score < 25) return 'Respectable. A 56k modem would have given up sooner.';
  return 'You have the reflexes of somebody who grew up on this web.';
}

export default function AdPopups() {
  const [popups, setPopups] = useState<Popup[] | null>(null);
  const [score, setScore] = useState(0);
  const scored = useRef(0);
  const drag = useRef<{ id: number; dx: number; dy: number } | null>(null);

  const idle = popups === null;
  const lost = popups !== null && popups.length >= LOSE_AT;
  const playing = popups !== null && !lost;

  const stop = useCallback(() => {
    setPopups(null);
    window.dispatchEvent(new Event(AD_GAME_END));
  }, []);

  useEffect(() => {
    const onStart = () => {
      scored.current = 0;
      setScore(0);
      setPopups([makePopup()]);
    };
    window.addEventListener(AD_GAME_START, onStart);
    return () => window.removeEventListener(AD_GAME_START, onStart);
  }, []);

  useEffect(() => {
    if (idle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') stop();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idle, stop]);

  const open = popups?.length ?? 0;

  // The loop reschedules itself and reads the score from a ref, so a spawn never restarts the clock.
  useEffect(() => {
    if (!playing) return;
    let timer = 0;

    const schedule = () => {
      timer = window.setTimeout(
        () => {
          const next = makePopup();
          setPopups((list) => (list ? [...list, next] : list));
          schedule();
        },
        Math.max(FLOOR_MS, FIRST_MS - scored.current * STEP_MS)
      );
    };

    schedule();
    return () => window.clearTimeout(timer);
  }, [playing]);

  const close = (id: number) => {
    const extra = splitPopups();
    setPopups((list) => (list ? [...list.filter((p) => p.id !== id), ...extra] : list));
    scored.current += 1;
    setScore(scored.current);
  };

  const onDragStart = (e: React.PointerEvent<HTMLDivElement>, p: Popup) => {
    if ((e.target as HTMLElement).closest('button')) return;
    drag.current = { id: p.id, dx: e.clientX - p.x, dy: e.clientY - p.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const held = drag.current;
    if (!held) return;
    const x = Math.min(Math.max(0, e.clientX - held.dx), window.innerWidth - 60);
    const y = Math.min(Math.max(0, e.clientY - held.dy), window.innerHeight - 30);
    setPopups((list) => list?.map((p) => (p.id === held.id ? { ...p, x, y } : p)) ?? null);
  };

  const onDragEnd = () => {
    drag.current = null;
  };

  if (idle) return null;

  return (
    <>
      <section className='pointer-events-none fixed inset-0 z-[75]' aria-label='Pop-up advertisements'>
        {popups.map((p) => (
          <div
            key={p.id}
            className='edge theme-shadow pointer-events-auto absolute w-[264px] bg-panel'
            style={{ left: p.x, top: p.y }}
          >
            <div
              onPointerDown={(e) => onDragStart(e, p)}
              onPointerMove={onDragMove}
              onPointerUp={onDragEnd}
              onPointerCancel={onDragEnd}
              className='head-gradient flex touch-none items-center justify-between gap-2 px-2 py-1 font-display text-[0.72rem] font-bold'
            >
              <span className='truncate'>{p.ad.title}</span>
              <button
                type='button'
                onClick={() => close(p.id)}
                aria-label={`Close advert: ${p.ad.head}`}
                className='edge-thin shrink-0 px-1.5 leading-none'
              >
                x
              </button>
            </div>

            <div className='px-3 py-4 text-center' style={{ background: p.ad.bg, color: p.ad.ink }}>
              <p className='m-0 font-display text-[0.95rem] leading-tight font-black uppercase' style={{ color: p.ad.hot }}>
                {p.ad.head}
              </p>
              <p className='m-0 mt-1.5 text-[0.72rem]'>{p.ad.sub}</p>
              <p className='m-0 mt-2 animate-blink text-[0.7rem] font-bold tracking-widest uppercase' style={{ color: p.ad.hot }}>
                Click here
              </p>
            </div>
          </div>
        ))}
      </section>

      {playing ? (
        <output className='fixed bottom-3 left-3 z-[76]'>
          <p className='edge theme-shadow m-0 bg-panel px-3 py-1.5 font-display text-[0.72rem] font-bold tracking-wider uppercase'>
            Closed: {score} &nbsp;|&nbsp; Open: {open}/{LOSE_AT} &nbsp;|&nbsp; Esc gives up
          </p>
        </output>
      ) : null}

      {lost ? (
        <div className='fixed inset-0 z-[86] flex items-center justify-center bg-black/60 p-4'>
          <div className='edge theme-shadow w-full max-w-[420px] bg-panel' role='alertdialog' aria-label='Pop-up game over'>
            <p className='head-gradient m-0 px-3 py-1.5 font-display text-sm font-bold'>Internet Explorer</p>
            <div className='p-4'>
              <p className='m-0 font-mono text-[0.8rem] whitespace-pre-wrap'>
                {LOSE_AT} adverts are open at once. Your computer has given up.{'\n\n'}
                Adverts closed: {score}
                {'\n\n'}
                {verdict(score)}
              </p>
              <p className='m-0 mt-4 text-right'>
                <button type='button' onClick={stop} className='geo-btn'>
                  OK
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
