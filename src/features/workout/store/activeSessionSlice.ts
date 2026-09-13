import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { appReset, backupRestored } from '@/store/appActions';

import { isSessionComplete } from '../helpers/position';
import { restSecondsFor } from '../helpers/rest';
import type { ActiveExercise, ActiveSession, ActiveSet, RestKind } from '../types';

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
      const weight = action.payload.patch.weightKg;
      if (typeof weight === 'number' && !set.done) {
        exercise.sets.slice(action.payload.setIndex + 1).forEach((next) => {
          if (!next.done) next.weightKg = weight;
        });
      }
    },
    /** Marks a set done and starts rest. Never switches to another exercise — the user chooses. */
    setCompleted(state, action: PayloadAction<SetRef & { now: number; completedAt: string }>) {
      const session = state.session;
      const exercise = session?.exercises[action.payload.exerciseIndex];
      const set = exercise?.sets[action.payload.setIndex];
      if (!session || !exercise || !set) return;
      set.done = true;
      set.completedAt = action.payload.completedAt;
      if (set.weightKg === null) set.weightKg = 0;

      if (isSessionComplete(session.exercises)) {
        session.rest = null;
        return;
      }
      const kind: RestKind = exercise.sets.some((s) => !s.done) ? 'set' : 'exercise';
      const totalSec = restSecondsFor(exercise.planned, kind);
      session.rest = { kind, totalSec, endsAt: action.payload.now + totalSec * 1000, exerciseIndex: action.payload.exerciseIndex };
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
      if (state.session?.exercises[action.payload]) state.session.currentExerciseIndex = action.payload;
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
      const exercise = state.session?.exercises[action.payload];
      if (exercise) exercise.skipped = !exercise.skipped;
    },
    setAdded(state, action: PayloadAction<number>) {
      const exercise = state.session?.exercises[action.payload];
      if (!exercise) return;
      const last = exercise.sets[exercise.sets.length - 1];
      exercise.sets.push({ weightKg: last?.weightKg ?? exercise.suggestedWeightKg, reps: last?.reps ?? exercise.planned.repsMin, done: false });
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
  sessionStarted, setValueChanged, setCompleted, restExtended, restCleared,
  exerciseSelected, exerciseReplaced, exerciseSkipToggled, setAdded, setRemoved, sessionClosed,
} = activeSessionSlice.actions;
export default activeSessionSlice.reducer;
