/* Pure composition. No WebAudio here, so the musical logic stays testable. */

export type Track = {
  name: string;
  bpm: number;
  steps: number;
  lead: (number | null)[];
  bass: (number | null)[];
  kick: boolean[];
  snare: boolean[];
  hat: boolean[];
  wave: OscillatorType;
};

const SCALES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  pentatonic: [0, 2, 4, 7, 9],
  phrygian: [0, 1, 3, 5, 7, 8, 10]
};

const PROGRESSIONS = [
  [0, 5, 3, 4],
  [0, 3, 4, 4],
  [5, 3, 0, 4],
  [0, 4, 5, 3],
  [0, 6, 3, 4],
  [3, 4, 0, 5]
];

type MoodSpec = {
  scale: keyof typeof SCALES;
  bpm: [number, number];
  oct: number;
  density: number;
  wave: OscillatorType;
  drums: 'four' | 'rock' | 'break' | 'sparse' | 'none';
};

const MOODS: Record<string, MoodSpec> = {
  rave: { scale: 'minor', bpm: [140, 158], oct: 12, density: 0.8, wave: 'square', drums: 'four' },
  cheer: { scale: 'major', bpm: [118, 134], oct: 12, density: 0.7, wave: 'square', drums: 'rock' },
  mech: { scale: 'phrygian', bpm: [100, 120], oct: 0, density: 0.65, wave: 'sawtooth', drums: 'rock' },
  eerie: { scale: 'harmonicMinor', bpm: [70, 90], oct: 0, density: 0.4, wave: 'triangle', drums: 'sparse' },
  tropic: { scale: 'mixolydian', bpm: [100, 116], oct: 12, density: 0.7, wave: 'triangle', drums: 'break' },
  dream: { scale: 'lydian', bpm: [74, 94], oct: 12, density: 0.45, wave: 'sine', drums: 'sparse' },
  regal: { scale: 'dorian', bpm: [84, 100], oct: 0, density: 0.55, wave: 'triangle', drums: 'rock' },
  calm: { scale: 'pentatonic', bpm: [64, 84], oct: 12, density: 0.4, wave: 'sine', drums: 'none' },
  epic: { scale: 'minor', bpm: [94, 114], oct: 0, density: 0.7, wave: 'sawtooth', drums: 'rock' },
  retro: { scale: 'major', bpm: [128, 150], oct: 12, density: 0.85, wave: 'square', drums: 'four' },
  funk: { scale: 'dorian', bpm: [104, 122], oct: 0, density: 0.75, wave: 'square', drums: 'break' }
};

const DRUMS: Record<MoodSpec['drums'], { kick: number[]; snare: number[]; hat: number[] }> = {
  four: { kick: [0, 4, 8, 12], snare: [4, 12], hat: [0, 2, 4, 6, 8, 10, 12, 14] },
  rock: { kick: [0, 6, 8], snare: [4, 12], hat: [0, 2, 4, 6, 8, 10, 12, 14] },
  break: { kick: [0, 3, 8, 11], snare: [4, 12], hat: [2, 6, 10, 14] },
  sparse: { kick: [0, 8], snare: [12], hat: [] },
  none: { kick: [], snare: [], hat: [] }
};

function rng(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function degree(scale: number[], d: number) {
  const oct = Math.floor(d / scale.length);
  return scale[((d % scale.length) + scale.length) % scale.length] + 12 * oct;
}

export const STEPS_PER_CHORD = 8;
export const CHORDS = 4;

export function compose(seed: number, mood: string, name: string): Track {
  const spec = MOODS[mood] ?? MOODS.cheer;
  const scale = SCALES[spec.scale];
  const r = rng(seed);

  const root = 48 + spec.oct + Math.floor(r() * 5) - 2;
  const bpm = spec.bpm[0] + Math.floor(r() * (spec.bpm[1] - spec.bpm[0] + 1));
  const prog = PROGRESSIONS[Math.floor(r() * PROGRESSIONS.length)];
  const steps = STEPS_PER_CHORD * CHORDS;

  // One motif, reused on chords 1 and 3, so the tune has a shape instead of drifting.
  const motif: (number | null)[] = [];
  for (let i = 0; i < STEPS_PER_CHORD; i++) {
    const onBeat = i % 2 === 0;
    const hit = r() < (onBeat ? spec.density : spec.density * 0.45);
    motif.push(hit ? Math.floor(r() * 5) : null);
  }

  const lead: (number | null)[] = [];
  const bass: (number | null)[] = [];
  const kick: boolean[] = [];
  const snare: boolean[] = [];
  const hat: boolean[] = [];
  const pattern = DRUMS[spec.drums];

  for (let c = 0; c < CHORDS; c++) {
    const chordRoot = prog[c];
    const reuse = c === 0 || c === 2;

    for (let i = 0; i < STEPS_PER_CHORD; i++) {
      const cell = reuse ? motif[i] : r() < spec.density ? Math.floor(r() * 5) : null;
      lead.push(cell === null ? null : root + 12 + degree(scale, chordRoot + cell));

      const bassHit = i === 0 || (i === 4 && r() < 0.7) || r() < 0.12;
      bass.push(bassHit ? root - 12 + degree(scale, chordRoot) : null);

      kick.push(pattern.kick.includes(i));
      snare.push(pattern.snare.includes(i));
      hat.push(pattern.hat.includes(i));
    }
  }

  return { name, bpm, steps, lead, bass, kick, snare, hat, wave: spec.wave };
}

export function midiToHz(note: number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}
