/* The 88x31 button row every page had. Inline SVG so they follow the theme and cost no request. */

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
  { key: 'html', title: 'Valid HTML 4.0', top: 'VALID', bottom: 'HTML 4.0', ink: '#ffffff', bg: '#003366', accent: '#ffcc00' },
  { key: 'lynx', title: 'Lynx enhanced', top: 'LYNX', bottom: 'ENHANCED', ink: '#e0e0e0', bg: '#101010', accent: '#b0b0b0' }
];

function Button88({ badge }: Readonly<{ badge: Badge }>) {
  return (
    <svg
      viewBox='0 0 88 31'
      width='88'
      height='31'
      shapeRendering='crispEdges'
      className='h-[31px] w-[88px] shrink-0'
      style={{ imageRendering: 'pixelated' }}
    >
      <title>{badge.title}</title>
      <rect width='88' height='31' fill={badge.bg} />
      <rect width='88' height='31' fill='none' stroke={badge.accent} strokeWidth='2' />
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
  );
}

export default function Badges() {
  return (
    <div className='flex flex-wrap justify-center gap-2'>
      {BADGES.map((b) => (
        <Button88 key={b.key} badge={b} />
      ))}
    </div>
  );
}
