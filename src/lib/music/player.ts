'use client';

import { midiToHz, type Track } from '@/lib/music/compose';

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.12;

type Listener = (step: number, power: number) => void;

export class Jukebox {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private step = 0;
  private nextTime = 0;
  private track: Track | null = null;
  private listeners = new Set<Listener>();

  playing = false;
  volume = 0.35;

  onStep(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  setTrack(track: Track) {
    this.track = track;
    this.step = 0;
  }

  setVolume(v: number) {
    this.volume = v;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.02);
  }

  // The context can only be created inside a user gesture, so play() owns it.
  async start() {
    if (!this.track) return;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume;
      this.master.connect(this.ctx.destination);
    }
    await this.ctx.resume();
    this.playing = true;
    this.nextTime = this.ctx.currentTime + 0.06;
    this.timer = window.setInterval(() => this.schedule(), LOOKAHEAD_MS);
  }

  stop() {
    this.playing = false;
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    this.step = 0;
    void this.ctx?.suspend();
    this.listeners.forEach((l) => l(-1, 0));
  }

  private stepDuration() {
    return 60 / (this.track?.bpm ?? 120) / 4;
  }

  private schedule() {
    const ctx = this.ctx;
    const track = this.track;
    if (!ctx || !track) return;

    while (this.nextTime < ctx.currentTime + SCHEDULE_AHEAD) {
      this.emit(track, this.step, this.nextTime);
      this.nextTime += this.stepDuration();
      this.step = (this.step + 1) % track.steps;
    }
  }

  private emit(track: Track, step: number, at: number) {
    let power = 0;

    const lead = track.lead[step];
    if (lead !== null) {
      this.tone(midiToHz(lead), at, this.stepDuration() * 1.6, track.wave, 0.22);
      power += 0.5;
    }

    const bass = track.bass[step];
    if (bass !== null) {
      this.tone(midiToHz(bass), at, this.stepDuration() * 2.4, 'triangle', 0.3);
      power += 0.3;
    }

    if (track.kick[step]) {
      this.kick(at);
      power += 0.6;
    }
    if (track.snare[step]) {
      this.noise(at, 0.14, 0.18, 1200);
      power += 0.4;
    }
    if (track.hat[step]) {
      this.noise(at, 0.03, 0.06, 7000);
      power += 0.15;
    }

    const delay = Math.max(0, (at - (this.ctx?.currentTime ?? 0)) * 1000);
    window.setTimeout(() => this.listeners.forEach((l) => l(step, Math.min(1, power))), delay);
  }

  private tone(freq: number, at: number, dur: number, type: OscillatorType, level: number) {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, at);
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(level, at + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    osc.connect(gain).connect(this.master);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }

  private kick(at: number) {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, at);
    osc.frequency.exponentialRampToValueAtTime(45, at + 0.11);
    gain.gain.setValueAtTime(0.5, at);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.16);
    osc.connect(gain).connect(this.master);
    osc.start(at);
    osc.stop(at + 0.18);
  }

  private noise(at: number, dur: number, level: number, cutoff: number) {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    const frames = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = cutoff;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(level, at);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(filter).connect(gain).connect(this.master);
    src.start(at);
    src.stop(at + dur);
  }
}
