/**
 * Writes the short WAV sound effects used by the rest timer into assets/sounds/.
 *
 * Run: npm run generate:sounds
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SOUND_AMPLITUDE, SOUND_FADE_SEC, SOUND_SAMPLE_RATE, SOUND_TONES } from '../src/constants/sound.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'assets', 'sounds');
const BYTES_PER_SAMPLE = 2;
const HEADER_SIZE = 44;

function render(tones: readonly (readonly [number, number])[]): number[] {
  const samples: number[] = [];
  const fade = Math.floor(SOUND_SAMPLE_RATE * SOUND_FADE_SEC);
  for (const [frequency, duration] of tones) {
    const count = Math.floor(SOUND_SAMPLE_RATE * duration);
    for (let i = 0; i < count; i += 1) {
      const envelope = Math.min(1, i / fade, (count - i) / fade);
      samples.push(frequency ? Math.sin((2 * Math.PI * frequency * i) / SOUND_SAMPLE_RATE) * SOUND_AMPLITUDE * envelope : 0);
    }
  }
  return samples;
}

function toWav(samples: number[]): Buffer {
  const dataSize = samples.length * BYTES_PER_SAMPLE;
  const buffer = Buffer.alloc(HEADER_SIZE + dataSize);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(HEADER_SIZE - 8 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SOUND_SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SOUND_SAMPLE_RATE * BYTES_PER_SAMPLE, 28);
  buffer.writeUInt16LE(BYTES_PER_SAMPLE, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  samples.forEach((sample, i) => buffer.writeInt16LE(Math.round(sample * 32767), HEADER_SIZE + i * BYTES_PER_SAMPLE));
  return buffer;
}

mkdirSync(outDir, { recursive: true });
for (const [name, tones] of Object.entries(SOUND_TONES)) {
  writeFileSync(join(outDir, `${name}.wav`), toWav(render(tones)));
  console.log(`✓ assets/sounds/${name}.wav`);
}
