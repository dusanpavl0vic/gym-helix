import { DELOAD } from '@/constants/training';
import type { PlannedExercise, Workout } from '@/types/domain';

/** Every 7th training week (rotation cycle) is a deload week. */
export const isDeloadWeek = (cycleNumber: number): boolean => cycleNumber > 0 && cycleNumber % DELOAD.everyWeeks === 0;

export const deloadSetCount = (sets: number): number =>
  Math.min(sets, Math.max(DELOAD.minSets, Math.floor(sets * DELOAD.setsFactor)));

export function applyDeloadToExercise(planned: PlannedExercise): PlannedExercise {
  return { ...planned, sets: deloadSetCount(planned.sets), targetRir: DELOAD.targetRir, targetRirMax: undefined };
}

export function applyDeload(workout: Workout): Workout {
  return { ...workout, exercises: workout.exercises.map(applyDeloadToExercise) };
}
