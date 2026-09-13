import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';

const SOURCES = {
  end: require('../../../assets/sounds/rest-done.wav'),
  warning: require('../../../assets/sounds/rest-warning.wav'),
  tick: require('../../../assets/sounds/tick.wav'),
} as const;

type SoundName = keyof typeof SOURCES;

const players: Partial<Record<SoundName, AudioPlayer>> = {};
let audioModeReady: Promise<void> | null = null;

/**
 * 'mixWithOthers' does not request audio focus on Android, so music apps (Spotify…) keep playing
 * underneath the short timer sounds instead of pausing.
 */
function ensureAudioMode(): Promise<void> {
  audioModeReady ??= setAudioModeAsync({
    playsInSilentMode: true,
    interruptionMode: 'mixWithOthers',
    shouldPlayInBackground: false,
  }).catch(() => undefined);
  return audioModeReady;
}

function player(name: SoundName): AudioPlayer {
  players[name] ??= createAudioPlayer(SOURCES[name]);
  return players[name];
}

async function play(name: SoundName): Promise<void> {
  await ensureAudioMode();
  const instance = player(name);
  await instance.seekTo(0).catch(() => undefined);
  instance.play();
}

export async function prepareSound(): Promise<void> {
  await ensureAudioMode();
  (Object.keys(SOURCES) as SoundName[]).forEach(player);
}

export const playRestEndSound = () => play('end').catch(() => undefined);
export const playRestWarningSound = () => play('warning').catch(() => undefined);
export const playTickSound = () => play('tick').catch(() => undefined);
