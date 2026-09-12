import type { ActiveExercise, SetPosition } from '../types';

export const firstOpenSetIndex = (exercise: ActiveExercise): number => exercise.sets.findIndex((s) => !s.done);

export const isExerciseComplete = (exercise: ActiveExercise): boolean =>
  exercise.skipped || exercise.sets.every((s) => s.done);

/** Next open set starting at the given exercise, wrapping around to earlier unfinished exercises. */
export function findNextOpenPosition(exercises: ActiveExercise[], fromExerciseIndex: number): SetPosition | null {
  const count = exercises.length;
  for (let offset = 0; offset < count; offset += 1) {
    const exerciseIndex = (fromExerciseIndex + offset) % count;
    const exercise = exercises[exerciseIndex];
    if (exercise.skipped) continue;
    const setIndex = firstOpenSetIndex(exercise);
    if (setIndex >= 0) return { exerciseIndex, setIndex };
  }
  return null;
}

export const isSessionComplete = (exercises: ActiveExercise[]): boolean => exercises.every(isExerciseComplete);
