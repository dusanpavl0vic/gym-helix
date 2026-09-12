import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { appReset, backupRestored } from '@/store/appActions';

import { findNextOpenPosition, firstOpenSetIndex } from '../helpers/position';
import { restSecondsFor } from '../helpers/rest';
import type { ActiveExercise, ActiveSession, ActiveSet } from '../types';

interface ActiveSessionState {
  session: ActiveSession | null;
}

const initialState: ActiveSessionState = { session: null };

type SetRef = { exerciseIndex: number; setIndex: number };

const activeSessionSlice = createSlice({
  name: 'activeSession',
  initialState,
  reducers: {
    sessionStarted(state, action: PayloadAction<ActiveSession>) {
      state.session = action.payload;
    },
    setValueChanged(state, action: PayloadAction<SetRef & { patch: Partial<Pick<ActiveSet, 'weightKg' | 'reps' | 'rir'>> }>) {
      const exercise = state.session?.exercises[action.payload.exerciseIndex];
      const set = exercise?.sets[action.payload.setIndex];
      if (!exercise || !set) return;
      Object.assign(set, action.payload.patch);
      if (action.payload.patch.weightKg !== undefined && !set.done) {
        exercise.sets.slice(action.payload.setIndex + 1).forEach((next) => {
          if (!next.done) next.weightKg = action.payload.patch.weightKg as number;
        });
      }
    },
    setCompleted(state, action: PayloadAction<SetRef & { now: number; completedAt: string }>) {
      const session = state.session;
      const exercise = session?.exercises[action.payload.exerciseIndex];
      const set = exercise?.sets[action.payload.setIndex];
      if (!session || !exercise || !set) return;
      set.done = true;
      set.completedAt = action.payload.completedAt;

      const next = findNextOpenPosition(session.exercises, action.payload.exerciseIndex);
      if (!next) {
        session.rest = null;
        return;
      }
      const kind = next.exerciseIndex === action.payload.exerciseIndex ? 'set' : 'exercise';
      const totalSec = restSecondsFor(exercise.planned, kind);
      session.currentExerciseIndex = next.exerciseIndex;
      session.rest = { kind, totalSec, endsAt: action.payload.now + totalSec * 1000 };
    },
    setReopened(state, action: PayloadAction<SetRef>) {
      const exercise = state.session?.exercises[action.payload.exerciseIndex];
      const set = exercise?.sets[action.payload.setIndex];
      if (!state.session || !set) return;
      set.done = false;
      set.completedAt = undefined;
      state.session.currentExerciseIndex = action.payload.exerciseIndex;
    },
    restExtended(state, action: PayloadAction<number>) {
      const rest = state.session?.rest;
      if (!rest) return;
      rest.endsAt += action.payload * 1000;
      rest.totalSec += action.payload;
    },
    restCleared(state) {
      if (state.session) state.session.rest = null;
    },
    exerciseSelected(state, action: PayloadAction<number>) {
      if (state.session && state.session.exercises[action.payload]) state.session.currentExerciseIndex = action.payload;
    },
    exerciseReplaced(state, action: PayloadAction<{ exerciseIndex: number; exercise: ActiveExercise }>) {
      const session = state.session;
      const current = session?.exercises[action.payload.exerciseIndex];
      if (!session || !current) return;
      session.exercises[action.payload.exerciseIndex] = {
        ...action.payload.exercise,
        originalExerciseId: current.originalExerciseId,
        sets: action.payload.exercise.sets.map((s, i) => (current.sets[i]?.done ? current.sets[i] : s)),
      };
    },
    exerciseSkipToggled(state, action: PayloadAction<number>) {
      const session = state.session;
      const exercise = session?.exercises[action.payload];
      if (!session || !exercise) return;
      exercise.skipped = !exercise.skipped;
      if (exercise.skipped && session.currentExerciseIndex === action.payload) {
        const next = findNextOpenPosition(session.exercises, action.payload);
        if (next) session.currentExerciseIndex = next.exerciseIndex;
      }
    },
    setAdded(state, action: PayloadAction<number>) {
      const exercise = state.session?.exercises[action.payload];
      if (!exercise) return;
      const last = exercise.sets[exercise.sets.length - 1];
      exercise.sets.push({ weightKg: last?.weightKg ?? 0, reps: last?.reps ?? exercise.planned.repsMin, done: false });
    },
    setRemoved(state, action: PayloadAction<number>) {
      const exercise = state.session?.exercises[action.payload];
      if (!exercise || exercise.sets.length <= 1) return;
      const last = exercise.sets[exercise.sets.length - 1];
      if (!last.done) exercise.sets.pop();
    },
    sessionClosed(state) {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(appReset, () => initialState).addCase(backupRestored, () => initialState);
  },
});

export const {
  sessionStarted, setValueChanged, setCompleted, setReopened, restExtended, restCleared,
  exerciseSelected, exerciseReplaced, exerciseSkipToggled, setAdded, setRemoved, sessionClosed,
} = activeSessionSlice.actions;
export { firstOpenSetIndex };
export default activeSessionSlice.reducer;
