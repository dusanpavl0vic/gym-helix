import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { appReset, backupRestored } from '@/store/appActions';
import type { RotationSliceState } from '@/types/backup';
import type { Program } from '@/types/domain';

import { dismissDeload, startDeload } from '../logic/deload';
import { completeSession, createRotationState, jumpToWorkout } from '../logic/rotation';

const initialState: RotationSliceState = { byProgram: {} };

const current = (state: RotationSliceState, programId: string) =>
  state.byProgram[programId] ?? createRotationState(programId);

const rotationSlice = createSlice({
  name: 'rotation',
  initialState,
  reducers: {
    rotationSessionCompleted(state, action: PayloadAction<{ programId: string; rotationLength: number; completedAt: string }>) {
      const { programId, rotationLength, completedAt } = action.payload;
      state.byProgram[programId] = completeSession(current(state, programId), rotationLength, completedAt);
    },
    rotationJumped(state, action: PayloadAction<{ program: Program; workoutId: string }>) {
      const { program, workoutId } = action.payload;
      state.byProgram[program.id] = jumpToWorkout(program, current(state, program.id), workoutId);
    },
    deloadStarted(state, action: PayloadAction<{ programId: string; rotationLength: number }>) {
      const { programId, rotationLength } = action.payload;
      state.byProgram[programId] = startDeload(current(state, programId), rotationLength);
    },
    deloadDismissed(state, action: PayloadAction<string>) {
      state.byProgram[action.payload] = dismissDeload(current(state, action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appReset, () => initialState)
      .addCase(backupRestored, (_, action) => action.payload.rotation);
  },
});

export const { rotationSessionCompleted, rotationJumped, deloadStarted, deloadDismissed } = rotationSlice.actions;
export default rotationSlice.reducer;
