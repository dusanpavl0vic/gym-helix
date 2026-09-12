import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import type { Exercise } from '@/types/domain';

import { CATALOG_EXERCISES } from '../data/exerciseCatalog';

const selectCustom = (state: RootState) => state.exercises.custom;

export const selectAllExercises = createSelector(selectCustom, (custom): Record<string, Exercise> => ({
  ...CATALOG_EXERCISES,
  ...custom,
}));

export const selectExerciseById = (state: RootState, id: string): Exercise | undefined =>
  state.exercises.custom[id] ?? CATALOG_EXERCISES[id];
