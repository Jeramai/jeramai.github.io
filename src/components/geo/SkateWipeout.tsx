/* Inlined so the scene can read theme tokens. An external SVG cannot see page CSS variables. */

const SKIN = '#f2c39a';
const SHIRT = '#59b6ff';
const TROUSERS = '#3d4f5c';
const HAIR = '#2b2b2b';
const SHOE = '#e8e8e8';
const WHEELS = '#ffd400';

export default function SkateWipeout() {
  return (
    <svg viewBox='0 0 480 280' width='480' height='280' shapeRendering='crispEdges' className='edge theme-shadow h-auto w-full'>
      <title>A pixel-art skateboarder flat on their back, board rolling away</title>
      <rect width='480' height='280' fill='var(--panel)' />

      <g fill='var(--accent)'>
        <rect x='150' y='120' width='10' height='10' />
        <rect x='140' y='130' width='30' height='10' />
        <rect x='150' y='140' width='10' height='10' />
        <rect x='196' y='96' width='10' height='10' />
        <rect x='186' y='106' width='30' height='10' />
        <rect x='196' y='116' width='10' height='10' />
      </g>
      <g fill='var(--hot)'>
        <rect x='240' y='112' width='10' height='10' />
        <rect x='262' y='92' width='10' height='10' />
      </g>

      <g fill='var(--ink-dim)'>
        <rect x='286' y='70' width='40' height='7' />
        <rect x='272' y='92' width='30' height='7' />
        <rect x='298' y='114' width='34' height='7' />
      </g>

      <g fill='var(--accent-2)'>
        <rect x='352' y='66' width='104' height='14' />
        <rect x='340' y='52' width='16' height='16' />
        <rect x='452' y='52' width='16' height='16' />
      </g>
      <g fill={WHEELS}>
        <rect x='368' y='80' width='18' height='16' />
        <rect x='422' y='80' width='18' height='16' />
      </g>

      <rect x='0' y='216' width='480' height='64' fill='var(--panel-2)' />
      <rect x='0' y='210' width='480' height='6' fill='var(--border)' />

      <g fill={SKIN}>
        <rect x='96' y='182' width='30' height='28' />
        <rect x='80' y='196' width='18' height='14' />
        <rect x='150' y='160' width='16' height='24' />
      </g>
      <g fill={HAIR}>
        <rect x='92' y='172' width='38' height='12' />
        <rect x='82' y='176' width='14' height='8' />
      </g>
      <rect x='126' y='180' width='86' height='30' fill={SHIRT} />
      <g fill={TROUSERS}>
        <rect x='212' y='182' width='46' height='28' />
        <rect x='252' y='156' width='24' height='42' />
        <rect x='268' y='140' width='40' height='22' />
      </g>
      <rect x='302' y='128' width='28' height='20' fill={SHOE} />

      <text
        x='240'
        y='256'
        fontFamily="'Courier New', monospace"
        fontSize='20'
        fontWeight='700'
        fill='var(--ink-dim)'
        textAnchor='middle'
      >
        ROUTE NOT LANDED
      </text>
    </svg>
  );
}
