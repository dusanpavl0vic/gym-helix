import { addWeeks } from 'date-fns';

import type { Session } from '@/types/domain';
import { weekStart } from '@/utils/date';

export function sessionVolumeKg(session: Session): number {
  return session.exercises.reduce(
    (sum, e) => sum + e.sets.reduce((s, set) => s + set.weightKg * set.reps, 0),
    0,
  );
}

export const sessionSetCount = (session: Session): number =>
  session.exercises.reduce((sum, e) => sum + e.sets.length, 0);

export interface WeekVolume {
  weekStart: Date;
  volumeKg: number;
}

export function weeklyVolume(sessions: Session[], weeks: number, now: Date = new Date()): WeekVolume[] {
  const firstWeek = addWeeks(weekStart(now), -(weeks - 1));
  const buckets: WeekVolume[] = Array.from({ length: weeks }, (_, i) => ({ weekStart: addWeeks(firstWeek, i), volumeKg: 0 }));
  for (const session of sessions) {
    const start = weekStart(new Date(session.startedAt)).getTime();
    const bucket = buckets.find((b) => b.weekStart.getTime() === start);
    if (bucket) bucket.volumeKg += sessionVolumeKg(session);
  }
  return buckets;
}
