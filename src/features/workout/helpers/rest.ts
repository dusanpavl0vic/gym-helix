import { NEW_EXERCISE_MIN_REST_SEC } from '@/constants/timer';
import type { PlannedExercise } from '@/types/domain';

import type { RestKind } from '../types';

export const restSecondsFor = (planned: PlannedExercise, kind: RestKind): number =>
  kind === 'exercise' ? Math.max(NEW_EXERCISE_MIN_REST_SEC, planned.restSec) : planned.restSec;

export const restRemainingSec = (endsAt: number, now: number): number => Math.max(0, Math.ceil((endsAt - now) / 1000));
