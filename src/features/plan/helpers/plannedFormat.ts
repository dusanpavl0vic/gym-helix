import type { TFunction } from 'i18next';

import type { PlannedExercise, Program } from '@/types/domain';

import { getWorkoutName } from '@/features/programs/helpers/programText';

export function formatScheme(planned: PlannedExercise, t: TFunction): string {
  const base =
    planned.repsMin === planned.repsMax
      ? t('plan:schemeFixed', { sets: planned.sets, reps: planned.repsMin })
      : t('plan:scheme', { sets: planned.sets, repsMin: planned.repsMin, repsMax: planned.repsMax });
  return planned.perSide ? `${base} ${t('plan:perSide')}` : base;
}

export const formatRir = (planned: PlannedExercise, t: TFunction): string =>
  planned.targetRirMax !== undefined && planned.targetRirMax !== planned.targetRir
    ? t('plan:rirRange', { min: planned.targetRir, max: planned.targetRirMax })
    : t('plan:rir', { value: planned.targetRir });

export const formatRest = (planned: PlannedExercise, t: TFunction): string =>
  planned.restSecMax !== undefined && planned.restSecMax !== planned.restSec
    ? t('plan:restRange', { min: planned.restSec, max: planned.restSecMax })
    : t('plan:rest', { value: planned.restSec });

export function formatRotation(program: Program, t: TFunction): string {
  return program.rotation.map((id) => getWorkoutName(program.workouts.find((w) => w.id === id), t)).join(' → ');
}
