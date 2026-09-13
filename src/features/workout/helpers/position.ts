import type { ActiveExercise, ExerciseStatus, SetPosition } from '../types';

export const firstOpenSetIndex = (exercise: ActiveExercise): number => exercise.sets.findIndex((s) => !s.done);

export const isExerciseComplete = (exercise: ActiveExercise): boolean => exercise.skipped || exercise.sets.every((s) => s.done);

export const isSessionComplete = (exercises: ActiveExercise[]): boolean => exercises.every(isExerciseComplete);

export function exerciseProgress(exercise: ActiveExercise): { done: number; total: number } {
  return { done: exercise.sets.filter((s) => s.done).length, total: exercise.sets.length };
}

export function exerciseStatus(exercise: ActiveExercise): ExerciseStatus {
  if (exercise.skipped) return 'skipped';
  const { done, total } = exerciseProgress(exercise);
  if (done === 0) return 'todo';
  return done === total ? 'done' : 'partial';
}

/** First open set after `index`, wrapping to earlier open sets; -1 when every set is done. */
export function nextOpenSetAfter(exercise: ActiveExercise, index: number): number {
  const count = exercise.sets.length;
  for (let offset = 1; offset <= count; offset += 1) {
    const candidate = (index + offset) % count;
    if (!exercise.sets[candidate].done) return candidate;
  }
  return -1;
}

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
