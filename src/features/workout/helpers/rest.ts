import { NEW_EXERCISE_MIN_REST_SEC } from '@/constants/timer';
import type { RestSoundMode } from '@/types/backup';
import type { PlannedExercise } from '@/types/domain';

import type { RestKind } from '../types';

export const restSecondsFor = (planned: PlannedExercise, kind: RestKind): number =>
  kind === 'exercise' ? Math.max(NEW_EXERCISE_MIN_REST_SEC, planned.restSec) : planned.restSec;

export const restRemainingSec = (endsAt: number, now: number): number => Math.max(0, Math.ceil((endsAt - now) / 1000));

/** System sound is delivered through a notification; without notifications (Expo Go) fall back to the app sound. */
export const effectiveRestSound = (mode: RestSoundMode, notificationsAvailable: boolean): RestSoundMode =>
  mode === 'system' && !notificationsAvailable ? 'app' : mode;
