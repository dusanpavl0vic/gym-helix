import { LOWER_BODY_MUSCLES } from '@/constants/muscles';
import { WEIGHT_INCREMENT_KG } from '@/constants/training';
import type { ExercisePerformance, MuscleGroup, PerformedSet, PlannedExercise } from '@/types/domain';

export type SuggestionReason = 'increase' | 'hold' | 'recover' | 'none';

export interface ProgressionSuggestion {
  reason: SuggestionReason;
  weightKg: number | null;
  /** Prefilled reps per planned set. */
  reps: number[];
  incrementKg: number;
}

export function isLowerBody(primaryMuscles: MuscleGroup[]): boolean {
  return primaryMuscles.some((m) => LOWER_BODY_MUSCLES.includes(m));
}

const workingWeight = (sets: PerformedSet[]): number => sets.reduce((max, s) => Math.max(max, s.weightKg), 0);
const totalReps = (sets: PerformedSet[]): number => sets.reduce((sum, s) => sum + s.reps, 0);

function hitTopOfRange(planned: PlannedExercise, sets: PerformedSet[]): boolean {
  if (sets.length < planned.sets) return false;
  const rirCeiling = planned.targetRirMax ?? planned.targetRir;
  return sets.every((s) => s.reps >= planned.repsMax && (s.rir === undefined || s.rir <= rirCeiling));
}

function repsDroppedTwiceInARow(history: ExercisePerformance[]): boolean {
  if (history.length < 3) return false;
  const [latest, previous, older] = history;
  const sameWeight =
    workingWeight(latest.sets) >= workingWeight(previous.sets) &&
    workingWeight(previous.sets) >= workingWeight(older.sets);
  return sameWeight && totalReps(latest.sets) < totalReps(previous.sets) && totalReps(previous.sets) < totalReps(older.sets);
}

/**
 * Double progression (spec 8.7). `history` must be ordered newest first.
 * The result is only a suggestion used to prefill inputs.
 */
export function suggestProgression(
  planned: PlannedExercise,
  history: ExercisePerformance[],
  primaryMuscles: MuscleGroup[],
): ProgressionSuggestion {
  const incrementKg = isLowerBody(primaryMuscles) ? WEIGHT_INCREMENT_KG.lower : WEIGHT_INCREMENT_KG.upper;
  const latest = history[0];

  if (!latest || latest.sets.length === 0) {
    return { reason: 'none', weightKg: null, reps: Array(planned.sets).fill(planned.repsMin), incrementKg };
  }

  const weight = workingWeight(latest.sets);

  if (hitTopOfRange(planned, latest.sets)) {
    return {
      reason: 'increase',
      weightKg: weight + incrementKg,
      reps: Array(planned.sets).fill(planned.repsMin),
      incrementKg,
    };
  }

  const reps = Array.from({ length: planned.sets }, (_, i) => {
    const previous = latest.sets[i] ?? latest.sets[latest.sets.length - 1];
    return Math.min(planned.repsMax, Math.max(planned.repsMin, previous.reps));
  });

  return {
    reason: repsDroppedTwiceInARow(history) ? 'recover' : 'hold',
    weightKg: weight,
    reps,
    incrementKg,
  };
}
