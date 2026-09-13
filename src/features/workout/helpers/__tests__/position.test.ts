import type { ActiveExercise } from '../../types';
import { exerciseProgress, exerciseStatus, nextOpenSetAfter } from '../position';

const exercise = (done: boolean[], skipped = false): ActiveExercise => ({
  plannedId: 'p', exerciseId: 'legPress', originalExerciseId: 'legPress', skipped,
  planned: { id: 'p', exerciseId: 'legPress', sets: done.length, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120 },
  suggestion: 'none', suggestedWeightKg: null, incrementKg: 2.5,
  sets: done.map((d) => ({ weightKg: 60, reps: 10, done: d })),
});

describe('position helpers', () => {
  it('reports progress and status', () => {
    expect(exerciseProgress(exercise([true, false, false]))).toEqual({ done: 1, total: 3 });
    expect(exerciseStatus(exercise([false, false]))).toBe('todo');
    expect(exerciseStatus(exercise([true, false]))).toBe('partial');
    expect(exerciseStatus(exercise([true, true]))).toBe('done');
    expect(exerciseStatus(exercise([true, false], true))).toBe('skipped');
  });

  it('finds the next open set after a given one, wrapping around', () => {
    expect(nextOpenSetAfter(exercise([true, false, false]), 1)).toBe(2);
    expect(nextOpenSetAfter(exercise([false, true, true]), 2)).toBe(0);
    expect(nextOpenSetAfter(exercise([true, true]), 0)).toBe(-1);
  });
});
