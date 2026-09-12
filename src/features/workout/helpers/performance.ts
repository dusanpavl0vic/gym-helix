import type { ExercisePerformance, PerformedSet, Session } from '@/types/domain';
import { formatWeight } from '@/utils/number';

/** Sessions must be ordered newest first. */
export function getExerciseHistory(sessions: Session[], exerciseId: string, limit = Infinity): ExercisePerformance[] {
  const result: ExercisePerformance[] = [];
  for (const session of sessions) {
    const sets = session.exercises
      .filter((e) => e.exerciseId === exerciseId && !e.skipped)
      .flatMap((e) => e.sets.map(({ weightKg, reps, rir }) => ({ weightKg, reps, rir })));
    if (sets.length > 0) {
      result.push({ sessionId: session.id, date: session.startedAt, sets });
      if (result.length >= limit) break;
    }
  }
  return result;
}

/** "60 kg × 10, 10, 9" or "60×10, 62.5×8" when weights differ. */
export function formatSetsShort(sets: PerformedSet[], unitLabel: string): string {
  if (sets.length === 0) return '';
  const sameWeight = sets.every((s) => s.weightKg === sets[0].weightKg);
  if (sameWeight) {
    const reps = sets.map((s) => s.reps).join(', ');
    return sets[0].weightKg > 0 ? `${formatWeight(sets[0].weightKg)} ${unitLabel} × ${reps}` : `× ${reps}`;
  }
  return sets.map((s) => `${formatWeight(s.weightKg)}×${s.reps}`).join(', ');
}
