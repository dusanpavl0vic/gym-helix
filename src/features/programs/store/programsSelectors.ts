import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

export const selectProgramsState = (state: RootState) => state.programs;
export const selectActiveProgramId = (state: RootState) => state.programs.activeProgramId;

export const selectProgramList = createSelector(selectProgramsState, (s) =>
  s.order.map((id) => s.programs[id]).filter(Boolean),
);

export const selectActiveProgram = createSelector(selectProgramsState, (s) => s.programs[s.activeProgramId]);

export const selectProgramById = (state: RootState, programId: string) => state.programs.programs[programId];

export const selectWorkoutById = (state: RootState, programId: string, workoutId: string) =>
  state.programs.programs[programId]?.workouts.find((w) => w.id === workoutId);
