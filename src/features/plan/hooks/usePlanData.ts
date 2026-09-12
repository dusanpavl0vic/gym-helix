import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { getPlannedNote, getProgramName, getWorkoutFocus, getWorkoutName } from '@/features/programs/helpers/programText';
import { selectActiveProgram } from '@/features/programs/store/programsSelectors';
import { countSets, estimateWorkoutMin } from '@/features/workout/logic/duration';
import { selectHasActiveSession } from '@/features/workout/store/activeSessionSelectors';
import { workoutStarted } from '@/features/workout/store/workoutThunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { formatRest, formatRir, formatRotation, formatScheme } from '../helpers/plannedFormat';
import { selectNextWorkout } from '../store/rotationSelectors';

export function usePlanData() {
  const { t } = useTranslation(['plan', 'programs', 'exercises', 'workout']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const program = useAppSelector(selectActiveProgram);
  const nextWorkout = useAppSelector(selectNextWorkout);
  const hasActive = useAppSelector(selectHasActiveSession);
  const { exercises, nameOf } = useExerciseLookup();
  const [selectedId, setSelectedId] = useState<string | undefined>(nextWorkout?.id);

  useEffect(() => {
    if (!program?.workouts.some((w) => w.id === selectedId)) setSelectedId(nextWorkout?.id ?? program?.workouts[0]?.id);
  }, [program, nextWorkout, selectedId]);

  const workout = program?.workouts.find((w) => w.id === selectedId);

  const rows = useMemo(
    () =>
      (workout?.exercises ?? []).map((planned) => ({
        id: planned.id,
        exerciseId: planned.exerciseId,
        exercise: exercises[planned.exerciseId],
        name: nameOf(planned.exerciseId),
        scheme: `${formatScheme(planned, t)} · ${formatRir(planned, t)}`,
        rest: formatRest(planned, t),
        note: getPlannedNote(planned, t),
      })),
    [workout, exercises, nameOf, t],
  );

  return {
    title: t('plan:title'),
    subtitle: program ? t('plan:subtitle', { program: getProgramName(program, t), rotation: formatRotation(program, t) }) : '',
    tabs: (program?.workouts ?? []).map((w) => ({
      key: w.id,
      label: w.id === nextWorkout?.id ? `${getWorkoutName(w, t)} · ${t('plan:next')}` : getWorkoutName(w, t),
    })),
    selectedId,
    select: setSelectedId,
    workoutFocus: getWorkoutFocus(workout, t),
    workoutMeta: workout ? t('programs:workoutEdit.estimate', { minutes: estimateWorkoutMin(workout), sets: countSets(workout.exercises) }) : '',
    rows,
    hasWorkouts: (program?.workouts.length ?? 0) > 0,
    hasActive,
    actions: {
      start: () => {
        if (!workout) return;
        if (!hasActive) dispatch(workoutStarted({ workoutId: workout.id, workoutName: getWorkoutName(workout, t) }));
        router.push(routes.workout);
      },
      edit: () => program && router.push(workout ? routes.programWorkout(program.id, workout.id) : routes.program(program.id)),
      editProgram: () => program && router.push(routes.program(program.id)),
      openExercise: (id: string) => router.push(routes.exercise(id)),
    },
  };
}
