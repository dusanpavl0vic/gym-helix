import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';

const REST_SOUND = require('../../../assets/sounds/rest-done.wav');
const TICK_SOUND = require('../../../assets/sounds/tick.wav');

let restPlayer: AudioPlayer | null = null;
let tickPlayer: AudioPlayer | null = null;

const replay = (player: AudioPlayer) => {
  player.seekTo(0).catch(() => undefined);
  player.play();
};

export async function prepareSound(): Promise<void> {
  await setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'mixWithOthers' }).catch(() => undefined);
  restPlayer ??= createAudioPlayer(REST_SOUND);
  tickPlayer ??= createAudioPlayer(TICK_SOUND);
}

export function playRestSound(): void {
  restPlayer ??= createAudioPlayer(REST_SOUND);
  replay(restPlayer);
}

export function playTickSound(): void {
  tickPlayer ??= createAudioPlayer(TICK_SOUND);
  replay(tickPlayer);
}
