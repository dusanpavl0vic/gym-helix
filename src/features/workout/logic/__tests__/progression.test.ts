import type { ExercisePerformance, PlannedExercise } from '@/types/domain';

import { estimateWorkoutMin } from '../duration';
import { suggestProgression } from '../progression';

const STEP = 2.5;
const planned: PlannedExercise = { id: 'a1', exerciseId: 'hackSquat', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 180 };
const perf = (weights: number | number[], reps: number[]): ExercisePerformance => ({
  sessionId: 's',
  date: '2026-09-01',
  sets: reps.map((r, i) => ({ weightKg: Array.isArray(weights) ? weights[i] : weights, reps: r })),
});

describe('suggestProgression', () => {
  it('suggests nothing the first time', () => {
    const s = suggestProgression(planned, [], STEP);
    expect(s).toMatchObject({ reason: 'none', weightKg: null, reps: [8, 8, 8] });
  });

  it('adds the increment when every set hits repsMax at the same weight', () => {
    const s = suggestProgression(planned, [perf(100, [12, 12, 12])], STEP);
    expect(s).toMatchObject({ reason: 'increase', weightKg: 102.5, reps: [8, 8, 8] });
    expect(suggestProgression({ ...planned, incrementKg: 5 }, [perf(100, [12, 12, 12])], STEP).weightKg).toBe(105);
  });

  it('does not increase when weights differ between sets', () => {
    expect(suggestProgression(planned, [perf([100, 100, 95], [12, 12, 12])], STEP).reason).toBe('hold');
  });

  it('drops 10% when no set reached repsMin', () => {
    const s = suggestProgression(planned, [perf(100, [7, 6, 5])], STEP);
    expect(s).toMatchObject({ reason: 'decrease', weightKg: 90, reps: [8, 8, 8] });
    expect(suggestProgression(planned, [perf(62.5, [7, 6, 6])], STEP).weightKg).toBe(55);
  });

  it('keeps the weight and targets one more rep per set', () => {
    const s = suggestProgression(planned, [perf(100, [12, 10, 7])], STEP);
    expect(s).toMatchObject({ reason: 'hold', weightKg: 100, reps: [12, 11, 8] });
  });

  it('repeats the last session when progression is off', () => {
    const s = suggestProgression({ ...planned, progression: 'none' }, [perf(0, [15, 12, 11])], STEP);
    expect(s).toMatchObject({ reason: 'hold', weightKg: 0, reps: [15, 12, 11] });
  });
});

describe('estimateWorkoutMin', () => {
  it('includes warmup, sets and rests', () => {
    expect(estimateWorkoutMin({ id: 'w', exercises: [planned] })).toBe(Math.round((3 * 45 + 3 * 180) / 60) + 8);
  });
});
