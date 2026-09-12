import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { countSets, estimateWorkoutMin } from '@/features/workout/logic/duration';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { PlannedExercise } from '@/types/domain';

import { getPlannedNote, getWorkoutFocus, getWorkoutName } from '../helpers/programText';
import { plannedExerciseMoved, plannedExerciseRemoved, plannedExerciseUpdated, workoutUpdated } from '../store/programsSlice';
import { selectWorkoutById } from '../store/programsSelectors';

export function useWorkoutEditor() {
  const { t } = useTranslation(['programs', 'common']);
  const { pid, wid } = useLocalSearchParams<{ pid: string; wid: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { exercises, nameOf } = useExerciseLookup();
  const workout = useAppSelector((s) => selectWorkoutById(s, pid, wid));

  const ref = { programId: pid, workoutId: wid };

  return {
    exists: Boolean(workout),
    name: getWorkoutName(workout, t),
    focus: getWorkoutFocus(workout, t) ?? '',
    estimate: workout ? t('programs:workoutEdit.estimate', { minutes: estimateWorkoutMin(workout), sets: countSets(workout.exercises) }) : '',
    items: (workout?.exercises ?? []).map((planned, index) => ({
      planned,
      index,
      exercise: exercises[planned.exerciseId],
      name: nameOf(planned.exerciseId),
      note: getPlannedNote(planned, t) ?? '',
      alternatives: (planned.alternativeIds ?? []).map((id) => ({ id, name: nameOf(id) })),
      isFirst: index === 0,
      isLast: index === (workout?.exercises.length ?? 0) - 1,
    })),
    actions: {
      rename: (name: string) => name.trim() && dispatch(workoutUpdated({ ...ref, name: name.trim() })),
      setFocus: (focus: string) => dispatch(workoutUpdated({ ...ref, focus: focus.trim() })),
      update: (plannedId: string, patch: Partial<Omit<PlannedExercise, 'id'>>) => dispatch(plannedExerciseUpdated({ ...ref, plannedId, patch })),
      remove: (plannedId: string) => dispatch(plannedExerciseRemoved({ ...ref, plannedId })),
      move: (index: number, direction: -1 | 1) => dispatch(plannedExerciseMoved({ ...ref, index, direction })),
      removeAlternative: (planned: PlannedExercise, id: string) =>
        dispatch(plannedExerciseUpdated({ ...ref, plannedId: planned.id, patch: { alternativeIds: (planned.alternativeIds ?? []).filter((a) => a !== id) } })),
      addExercise: () => router.push({ pathname: routes.exercisePicker, params: { mode: 'add', programId: pid, workoutId: wid } }),
      addAlternative: (plannedId: string) =>
        router.push({ pathname: routes.exercisePicker, params: { mode: 'alternative', programId: pid, workoutId: wid, plannedId } }),
      back: () => router.back(),
    },
  };
}
