import type { ExercisePerformance, PlannedExercise } from '@/types/domain';

import { suggestProgression } from '../progression';
import { estimateWorkoutMin } from '../duration';

const legPress: PlannedExercise = {
  id: 'a1', exerciseId: 'legPress', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 150,
};
const perf = (weightKg: number, reps: number[], rir?: number): ExercisePerformance => ({
  sessionId: Math.random().toString(), date: '2026-09-01', sets: reps.map((r) => ({ weightKg, reps: r, rir })),
});

describe('suggestProgression', () => {
  it('suggests +5 kg for lower body when all sets hit the top of the range', () => {
    const s = suggestProgression(legPress, [perf(100, [12, 12, 12], 2)], ['quads']);
    expect(s.reason).toBe('increase');
    expect(s.weightKg).toBe(105);
    expect(s.reps).toEqual([8, 8, 8]);
  });

  it('suggests +2.5 kg for upper body', () => {
    const s = suggestProgression({ ...legPress, exerciseId: 'bench' }, [perf(30, [12, 12, 12])], ['chest']);
    expect(s.weightKg).toBe(32.5);
  });

  it('holds when RIR was lower than target is not met', () => {
    const s = suggestProgression(legPress, [perf(100, [12, 12, 12], 3)], ['quads']);
    expect(s.reason).toBe('hold');
    expect(s.weightKg).toBe(100);
  });

  it('holds with previous reps when range not reached', () => {
    const s = suggestProgression(legPress, [perf(100, [11, 10, 9])], ['quads']);
    expect(s.reason).toBe('hold');
    expect(s.reps).toEqual([11, 10, 9]);
  });

  it('flags recovery after two consecutive drops', () => {
    const s = suggestProgression(legPress, [perf(100, [9, 8, 8]), perf(100, [10, 9, 9]), perf(100, [11, 10, 10])], ['quads']);
    expect(s.reason).toBe('recover');
  });

  it('returns none without history', () => {
    expect(suggestProgression(legPress, [], ['quads']).reason).toBe('none');
  });
});

describe('estimateWorkoutMin', () => {
  it('includes warmup, sets and rests', () => {
    expect(estimateWorkoutMin({ id: 'w', exercises: [legPress] })).toBe(Math.round((3 * 45 + 3 * 150) / 60) + 8);
  });
});
