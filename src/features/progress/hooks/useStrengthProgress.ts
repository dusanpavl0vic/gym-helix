import { useMemo, useState } from 'react';

import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { useAppSelector } from '@/store/hooks';

import { loggedExerciseIds } from '../helpers/analytics';
import { selectSessions } from '../store/historySelectors';

export function useStrengthProgress() {
  const sessions = useAppSelector(selectSessions);
  const { nameOf } = useExerciseLookup();
  const ids = useMemo(() => loggedExerciseIds(sessions), [sessions]);
  const [selected, setSelected] = useState<string | undefined>();
  const exerciseId = selected && ids.includes(selected) ? selected : ids[0];

  return {
    hasData: ids.length > 0,
    exerciseId,
    exerciseName: exerciseId ? nameOf(exerciseId) : '',
    chips: ids.map((id) => ({ key: id, label: nameOf(id) })),
    select: setSelected,
  };
}
