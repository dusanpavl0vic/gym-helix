import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { appReset, backupRestored } from '@/store/appActions';
import type { CustomExercisesState } from '@/types/backup';
import type { Exercise } from '@/types/domain';

const initialState: CustomExercisesState = { custom: {} };

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    customExerciseSaved(state, action: PayloadAction<Exercise>) {
      state.custom[action.payload.id] = { ...action.payload, isCustom: true };
    },
    exercisePhotoSet(state, action: PayloadAction<{ exerciseId: string; uri: string }>) {
      const exercise = state.custom[action.payload.exerciseId];
      if (exercise) exercise.images = [action.payload.uri];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appReset, () => initialState)
      .addCase(backupRestored, (_, action) => action.payload.exercises);
  },
});

export const { customExerciseSaved, exercisePhotoSet } = exercisesSlice.actions;
export default exercisesSlice.reducer;
