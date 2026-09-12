import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/hooks';

import { getExerciseInstructions, getExerciseName, getMuscleLabels } from '../helpers/exerciseText';
import { selectAllExercises, selectExerciseById } from '../store/exercisesSelectors';

export function useExercise(id: string | undefined) {
  const { t } = useTranslation(['exercises', 'common']);
  const exercise = useAppSelector((s) => (id ? selectExerciseById(s, id) : undefined));
  return {
    exercise,
    name: getExerciseName(exercise, t, id),
    instructions: getExerciseInstructions(exercise, t),
    muscles: getMuscleLabels(exercise, t),
  };
}

export function useExerciseLookup() {
  const { t } = useTranslation(['exercises', 'common']);
  const all = useAppSelector(selectAllExercises);
  const nameOf = useCallback((id: string) => getExerciseName(all[id], t, id), [all, t]);
  return { exercises: all, nameOf };
}
