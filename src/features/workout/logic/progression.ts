import { DEFAULT_INCREMENT_KG, PROGRESSION_DECREASE_FACTOR } from '@/constants/training';
import type { ExercisePerformance, PerformedSet, PlannedExercise } from '@/types/domain';

export type SuggestionReason = 'increase' | 'decrease' | 'hold' | 'none';

export interface ProgressionSuggestion {
  reason: SuggestionReason;
  /** null when there is nothing to suggest (first time) — the input stays empty. */
  weightKg: number | null;
  /** Prefilled reps per planned set. */
  reps: number[];
  incrementKg: number;
}

const workingWeight = (sets: PerformedSet[]): number => sets.reduce((max, s) => Math.max(max, s.weightKg), 0);
const floorToStep = (value: number, step: number): number => Math.max(0, Math.floor(value / step) * step);

/**
 * Double progression (ironlog spec §3). `history` must be ordered newest first.
 * - every set reached repsMax at the same weight → +incrementKg, back to repsMin
 * - no set reached repsMin → −10% (rounded down to the weight step)
 * - otherwise → same weight, +1 rep per set
 */
export function suggestProgression(planned: PlannedExercise, history: ExercisePerformance[], weightStepKg: number): ProgressionSuggestion {
  const incrementKg = planned.incrementKg ?? DEFAULT_INCREMENT_KG;
  const latest = history[0];
  const fill = (reps: number) => Array<number>(planned.sets).fill(reps);

  if (!latest || latest.sets.length === 0) {
    return { reason: 'none', weightKg: null, reps: fill(planned.repsMin), incrementKg };
  }

  const weight = workingWeight(latest.sets);
  const previousReps = (index: number) => (latest.sets[index] ?? latest.sets[latest.sets.length - 1]).reps;

  if (planned.progression === 'none') {
    return { reason: 'hold', weightKg: weight, reps: Array.from({ length: planned.sets }, (_, i) => previousReps(i)), incrementKg };
  }

  const sameWeight = latest.sets.every((s) => s.weightKg === latest.sets[0].weightKg);
  if (sameWeight && latest.sets.length >= planned.sets && latest.sets.every((s) => s.reps >= planned.repsMax)) {
    return { reason: 'increase', weightKg: weight + incrementKg, reps: fill(planned.repsMin), incrementKg };
  }

  if (latest.sets.every((s) => s.reps < planned.repsMin)) {
    return { reason: 'decrease', weightKg: floorToStep(weight * PROGRESSION_DECREASE_FACTOR, weightStepKg), reps: fill(planned.repsMin), incrementKg };
  }

  return {
    reason: 'hold',
    weightKg: weight,
    reps: Array.from({ length: planned.sets }, (_, i) => Math.min(planned.repsMax, Math.max(planned.repsMin, previousReps(i) + 1))),
    incrementKg,
  };
}
