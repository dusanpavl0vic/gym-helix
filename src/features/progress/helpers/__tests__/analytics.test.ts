import type { Exercise, Session } from '@/types/domain';

import {
  bodyDelta, exerciseSeries, loggedExerciseIds, metricDelta, newRecordsIn, personalRecords,
  sessionDurationMin, setsPerMuscle, weeklyCardioMinutes, weeklySessionCount,
} from '../analytics';

const set = (weightKg: number, reps: number) => ({ setIndex: 0, weightKg, reps, completedAt: '' });
const session = (id: string, startedAt: string, sets: [number, number][], exerciseId = 'legPress'): Session => ({
  id, programId: 'p', workoutId: 'FB_A', workoutName: 'A', startedAt,
  finishedAt: new Date(new Date(startedAt).getTime() + 55 * 60000).toISOString(),
  exercises: [{ exerciseId, sets: sets.map(([w, r]) => set(w, r)) }],
});

const s1 = session('1', '2026-08-01T10:00:00.000Z', [[100, 10], [100, 9]]);
const s2 = session('2', '2026-09-08T10:00:00.000Z', [[110, 8], [110, 8]]);

describe('analytics', () => {
  it('builds an oldest-first series per exercise', () => {
    const series = exerciseSeries([s2, s1], 'legPress');
    expect(series.map((p) => p.topWeight)).toEqual([100, 110]);
    expect(series[0].volume).toBe(1900);
    expect(series[1].e1rm).toBeCloseTo(139.3, 1);
  });

  it('ranks logged exercises and finds records', () => {
    const bench = session('3', '2026-09-09T10:00:00.000Z', [[30, 10]], 'dumbbellBenchPress');
    expect(loggedExerciseIds([s1, s2, bench])[0]).toBe('legPress');
    expect(personalRecords([s1, s2]).find((r) => r.exerciseId === 'legPress')?.weightKg).toBe(110);
    expect(newRecordsIn(s2, [s1, s2])).toHaveLength(1);
    expect(newRecordsIn(s1, [s2])).toHaveLength(0);
  });

  it('computes metric deltas and durations', () => {
    const series = exerciseSeries([s1, s2], 'legPress');
    expect(metricDelta(series, 'topWeight', 30, new Date('2026-09-12'))).toBe(10);
    expect(sessionDurationMin(s1)).toBe(55);
  });

  it('buckets weekly counts and cardio minutes', () => {
    const now = new Date('2026-09-12T12:00:00');
    expect(weeklySessionCount([s1, s2], 2, now).map((b) => b.value)).toEqual([0, 1]);
    expect(weeklyCardioMinutes([{ id: 'c', type: 'swim', date: '2026-09-12T08:00:00', durationMin: 40 }], 1, now)[0].value).toBe(40);
  });

  it('counts sets per muscle with half credit for secondary', () => {
    const exercises = { legPress: { primaryMuscles: ['quads'], secondaryMuscles: ['glutes'] } as unknown as Exercise };
    const totals = setsPerMuscle([s2], exercises, new Date('2026-09-12T12:00:00'));
    expect(totals.quads).toBe(2);
    expect(totals.glutes).toBe(1);
  });

  it('compares body measurements over 4 weeks', () => {
    const now = new Date('2026-09-12');
    const result = bodyDelta(
      [{ id: 'a', date: '2026-08-10', waistCm: 98 }, { id: 'b', date: '2026-09-11', waistCm: 96.5 }],
      'waistCm', 28, now,
    );
    expect(result).toEqual({ latest: 96.5, previous: 98, delta: -1.5 });
  });
});
