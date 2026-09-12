import type { Session } from '@/types/domain';

import { sessionSetCount, sessionVolumeKg, weeklyVolume } from '../volume';

const session = (startedAt: string, weight: number): Session => ({
  id: startedAt, programId: 'p', workoutId: 'FB_A', workoutName: 'A', startedAt,
  exercises: [{ exerciseId: 'legPress', sets: [{ setIndex: 0, weightKg: weight, reps: 10, completedAt: startedAt }, { setIndex: 1, weightKg: weight, reps: 10, completedAt: startedAt }] }],
});

describe('volume', () => {
  it('sums weight × reps', () => {
    expect(sessionVolumeKg(session('2026-09-10T10:00:00Z', 100))).toBe(2000);
    expect(sessionSetCount(session('2026-09-10T10:00:00Z', 100))).toBe(2);
  });

  it('buckets sessions by week (Monday start)', () => {
    const now = new Date('2026-09-12T12:00:00');
    const result = weeklyVolume([session('2026-09-08T10:00:00', 100), session('2026-09-02T10:00:00', 50)], 3, now);
    expect(result.map((w) => w.volumeKg)).toEqual([0, 1000, 2000]);
  });
});
