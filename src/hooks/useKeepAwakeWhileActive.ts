import { useKeepAwake } from 'expo-keep-awake';

const TAG = 'active-workout';

export function useKeepAwakeWhileActive(): void {
  useKeepAwake(TAG);
}
