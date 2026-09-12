import { createSelector } from '@reduxjs/toolkit';

import { selectActiveProgram } from '@/features/programs/store/programsSelectors';
import type { RootState } from '@/store';

import { isDeloadDue } from '../logic/deload';
import { createRotationState, getNextWorkoutId } from '../logic/rotation';

const selectRotationMap = (state: RootState) => state.rotation.byProgram;

export const selectActiveRotation = createSelector([selectActiveProgram, selectRotationMap], (program, map) =>
  program ? map[program.id] ?? createRotationState(program.id) : undefined,
);

export const selectNextWorkout = createSelector([selectActiveProgram, selectActiveRotation], (program, rotation) => {
  if (!program || !rotation) return undefined;
  const id = getNextWorkoutId(program, rotation);
  return program.workouts.find((w) => w.id === id);
});

export const selectIsDeloadDue = createSelector([selectActiveProgram, selectActiveRotation], (program, rotation) =>
  Boolean(program && rotation && isDeloadDue(rotation, program.rotation.length)),
);
