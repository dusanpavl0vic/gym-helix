import type { ActiveSession } from '../../types';
import reducer, { setCompleted, setValueChanged } from '../activeSessionSlice';

const exercise = (sets: number) => ({
  plannedId: 'p', exerciseId: 'legPress', originalExerciseId: 'legPress', skipped: false,
  planned: { id: 'p', exerciseId: 'legPress', sets, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 45 },
  suggestion: 'none' as const, suggestedWeightKg: null, incrementKg: 2.5,
  sets: Array.from({ length: sets }, () => ({ weightKg: null, reps: 8, done: false })),
});

const session: ActiveSession = {
  id: 's', programId: 'p', workoutId: 'w', workoutName: 'Upper A', startedAt: '', isDeload: false,
  currentExerciseIndex: 0, rest: null, exercises: [exercise(2), exercise(1)],
};

const complete = (state: { session: ActiveSession | null }, exerciseIndex: number, setIndex: number) =>
  reducer(state, setCompleted({ exerciseIndex, setIndex, now: 1000, completedAt: 'x' }));

describe('activeSessionSlice', () => {
  it('propagates a typed weight to later open sets', () => {
    const state = reducer({ session }, setValueChanged({ exerciseIndex: 0, setIndex: 0, patch: { weightKg: 60 } }));
    expect(state.session?.exercises[0].sets.map((s) => s.weightKg)).toEqual([60, 60]);
  });

  it('starts a set rest and stays on the same exercise', () => {
    const state = complete({ session }, 0, 0);
    expect(state.session?.rest).toMatchObject({ kind: 'set', totalSec: 45, exerciseIndex: 0, endsAt: 46000 });
    expect(state.session?.currentExerciseIndex).toBe(0);
    expect(state.session?.exercises[0].sets[0]).toMatchObject({ done: true, weightKg: 0 });
  });

  it('uses the longer exercise rest after the last set and no rest when everything is done', () => {
    let state = complete({ session }, 0, 0);
    state = complete(state, 0, 1);
    expect(state.session?.rest).toMatchObject({ kind: 'exercise', totalSec: 60 });
    expect(state.session?.currentExerciseIndex).toBe(0);
    state = complete(state, 1, 0);
    expect(state.session?.rest).toBeNull();
  });
});
