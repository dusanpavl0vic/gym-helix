import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { REST_SEC_BY_KIND, type ExerciseKind } from '@/constants/training';
import { selectProgramsState } from '@/features/programs/store/programsSelectors';
import { plannedExerciseAdded, plannedExerciseUpdated } from '@/features/programs/store/programsSlice';
import { exerciseSubstituted } from '@/features/workout/store/workoutThunks';
import { usePermissionPrompt } from '@/hooks/usePermissionPrompt';
import { pickExercisePhoto, type PhotoSource } from '@/lib/files/imagePicker';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { MuscleGroup } from '@/types/domain';
import { createId } from '@/utils/id';

import { getExerciseName } from '../helpers/exerciseText';
import { customExerciseSaved } from '../store/exercisesSlice';
import { selectAllExercises } from '../store/exercisesSelectors';

export type PickerMode = 'add' | 'alternative' | 'substitute';

export interface PickerParams {
  mode?: PickerMode;
  programId?: string;
  workoutId?: string;
  plannedId?: string;
  exerciseIndex?: string;
}

export function useExercisePicker() {
  const { t } = useTranslation(['exercises', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const promptPermission = usePermissionPrompt();
  const params = useLocalSearchParams<Record<keyof PickerParams, string>>();
  const exercises = useAppSelector(selectAllExercises);
  const programsState = useAppSelector(selectProgramsState);
  const restByKind = useAppSelector((state) => state.settings.restByKind);
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.values(exercises)
      .map((exercise) => ({ exercise, name: getExerciseName(exercise, t) }))
      .filter(({ exercise, name }) => !q || name.toLowerCase().includes(q) || exercise.nameEn.toLowerCase().includes(q))
      .sort((a, b) => Number(Boolean(b.exercise.isCustom)) - Number(Boolean(a.exercise.isCustom)) || a.name.localeCompare(b.name));
  }, [exercises, query, t]);

  const pick = (exerciseId: string) => {
    const { mode = 'add', programId, workoutId, plannedId, exerciseIndex } = params;
    const exercise = exercises[exerciseId];
    if (mode === 'add' && programId && workoutId) {
      dispatch(plannedExerciseAdded({ programId, workoutId, exerciseId, restSec: exercise ? restByKind[exercise.kind] : REST_SEC_BY_KIND.machine }));
    } else if (mode === 'alternative' && programId && workoutId && plannedId) {
      const planned = programsState.programs[programId]?.workouts.find((w) => w.id === workoutId)?.exercises.find((e) => e.id === plannedId);
      const alternativeIds = Array.from(new Set([...(planned?.alternativeIds ?? []), exerciseId]));
      dispatch(plannedExerciseUpdated({ programId, workoutId, plannedId, patch: { alternativeIds } }));
    } else if (mode === 'substitute' && exerciseIndex !== undefined) {
      dispatch(exerciseSubstituted({ exerciseIndex: Number(exerciseIndex), exerciseId }));
    }
    router.back();
  };

  const createCustom = async (input: { name: string; muscles: MuscleGroup[]; kind: ExerciseKind; photoSource?: PhotoSource }) => {
    const id = createId('ex_');
    const canPick = input.photoSource ? await promptPermission(input.photoSource === 'camera' ? 'camera' : 'photos') : false;
    const photo = input.photoSource && canPick ? await pickExercisePhoto(input.photoSource, id) : null;
    dispatch(
      customExerciseSaved({
        id,
        name: input.name.trim(),
        nameEn: input.name.trim(),
        primaryMuscles: input.muscles,
        secondaryMuscles: [],
        equipment: 'other',
        kind: input.kind,
        defaultRestSec: restByKind[input.kind],
        images: photo ? [photo] : [],
        isCustom: true,
      }),
    );
    setCreating(false);
    pick(id);
  };

  return { items, query, setQuery, creating, setCreating, pick, createCustom, back: () => router.back() };
}
