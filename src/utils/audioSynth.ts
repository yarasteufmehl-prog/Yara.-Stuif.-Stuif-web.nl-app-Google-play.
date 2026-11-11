/**
 * Web Audio API synthesizer for interactive music playback and podcasts
 */

class MusicAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrackId: string | null = null;
  private timer: number | null = null;
  private currentStep = 0;
  private bpm = 120;
  private onTimeUpdateCallback: ((time: number, duration: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;
  private duration = 180;
  private currentTime = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTrack(trackId: string, bpm: number = 124, duration: number = 180, onTimeUpdate?: (time: number, dur: number) => void, onEnd?: () => void) {
    this.initCtx();
    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;
    this.bpm = bpm;
    this.duration = duration;
    this.onTimeUpdateCallback = onTimeUpdate || null;
    this.onEndCallback = onEnd || null;
    this.currentTime = 0;
    this.currentStep = 0;

    const intervalMs = (60 / this.bpm / 2) * 1000; // 8th notes
    this.timer = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.currentTime += intervalMs / 1000;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.currentTime, this.duration);
      }
      if (this.currentTime >= this.duration) {
        this.stop();
        if (this.onEndCallback) this.onEndCallback();
        return;
      }
      this.playSynthNote(trackId, this.currentStep);
      this.currentStep = (this.currentStep + 1) % 32;
    }, intervalMs);
  }

  private playSynthNote(trackId: string, step: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Melody scale (Pentatonic/Pop uplifting scale in C/D/F)
    const chords = [
      [261.63, 329.63, 392.00], // C maj
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [196.00, 246.94, 293.66], // G
    ];

    const chordIndex = Math.floor(step / 8) % chords.length;
    const currentChord = chords[chordIndex];

    // Bass on beats 0, 4, 8, 12...
    if (step % 2 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const root = currentChord[0] / 2;
      osc.frequency.setValueAtTime(root, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    }

    // Lead arpeggio / synth pluck
    const noteIndices = [0, 1, 2, 1, 2, 0, 1, 2];
    const noteInChord = currentChord[noteIndices[step % 8]];
    const leadOsc = this.ctx.createOscillator();
    const leadGain = this.ctx.createGain();

    leadOsc.type = 'sine';
    const octaveMult = (trackId.includes('dansen') || trackId.includes('galaxy')) ? 2 : 1;
    leadOsc.frequency.setValueAtTime(noteInChord * octaveMult, now);

    leadGain.gain.setValueAtTime(0.05, now);
    leadGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    leadOsc.connect(leadGain);
    leadGain.connect(this.ctx.destination);

    leadOsc.start(now);
    leadOsc.stop(now + 0.22);

    // Soft hi-hat on every off-beat
    if (step % 2 === 1) {
      this.playHiHat(now);
    }
  }

  private playHiHat(time: number) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.02, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + 0.04);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrackId = null;
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public resume() {
    if (this.currentTrackId && !this.isPlaying) {
      this.playTrack(this.currentTrackId, this.bpm, this.duration, this.onTimeUpdateCallback || undefined, this.onEndCallback || undefined);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrackId(): string | null {
    return this.currentTrackId;
  }
}

export const musicPlayer = new MusicAudioPlayer();

// Text to Speech helper for reading blogs and podcast accessibility
export function speakText(text: string, onStart?: () => void, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) {
    alert('Spraaksynthese wordt niet ondersteund in deze browser.');
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'nl-NL';
  utterance.rate = 1.0;
  utterance.pitch = 1.05;

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
