import { DELOAD } from '@/constants/training';
import type { PlannedExercise, RotationState, Workout } from '@/types/domain';

export function isDeloadDue(state: RotationState, rotationLength: number): boolean {
  if (state.deloadActive || rotationLength <= 0) return false;
  return state.sessionsSinceDeload >= DELOAD.afterCycles * rotationLength;
}

export function startDeload(state: RotationState, rotationLength: number): RotationState {
  return { ...state, deloadActive: true, deloadRemaining: Math.max(1, rotationLength) };
}

export function dismissDeload(state: RotationState): RotationState {
  return { ...state, deloadActive: false, deloadRemaining: 0, sessionsSinceDeload: 0 };
}

export function applyDeloadToExercise(planned: PlannedExercise): PlannedExercise {
  return {
    ...planned,
    sets: Math.min(planned.sets, DELOAD.maxSets),
    targetRir: DELOAD.targetRir,
    targetRirMax: DELOAD.targetRir + 1,
  };
}

export function applyDeload(workout: Workout): Workout {
  return { ...workout, exercises: workout.exercises.map(applyDeloadToExercise) };
}
