import { DEFAULT_SET_SEC, WARMUP_MIN } from '@/constants/training';
import type { PlannedExercise, Workout } from '@/types/domain';

export const countSets = (exercises: PlannedExercise[]): number => exercises.reduce((sum, e) => sum + e.sets, 0);

export function estimateWorkoutMin(workout: Workout): number {
  const seconds = workout.exercises.reduce((sum, e) => sum + e.sets * DEFAULT_SET_SEC + Math.max(0, e.sets - 1) * e.restSec + e.restSec, 0);
  return Math.round(seconds / 60) + WARMUP_MIN;
}
