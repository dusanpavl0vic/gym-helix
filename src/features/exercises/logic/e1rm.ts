import type { PerformedSet } from '@/types/domain';

/** Epley: w * (1 + reps / 30). */
export function epley1RM(weightKg: number, reps: number): number {
  if (reps <= 0 || weightKg <= 0) return 0;
  if (reps === 1) return weightKg;
  return weightKg * (1 + reps / 30);
}

export function bestSet<T extends PerformedSet>(sets: T[]): T | undefined {
  return sets.reduce<T | undefined>((best, s) => {
    if (!best) return s;
    if (s.weightKg > best.weightKg) return s;
    if (s.weightKg === best.weightKg && s.reps > best.reps) return s;
    return best;
  }, undefined);
}

export function bestE1RM(sets: PerformedSet[]): number {
  return sets.reduce((max, s) => Math.max(max, epley1RM(s.weightKg, s.reps)), 0);
}
