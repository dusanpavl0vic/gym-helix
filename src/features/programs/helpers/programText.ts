import type { TFunction } from 'i18next';

import type { PlannedExercise, Program, Workout } from '@/types/domain';

export const getProgramName = (program: Program | undefined, t: TFunction): string =>
  program ? (program.nameKey ? t(program.nameKey) : program.name ?? t('programs:untitled')) : '';

export const getWorkoutName = (workout: Workout | undefined, t: TFunction): string =>
  workout ? (workout.nameKey ? t(workout.nameKey) : workout.name ?? '') : '';

export const getWorkoutFocus = (workout: Workout | undefined, t: TFunction): string | undefined =>
  workout ? (workout.focusKey ? t(workout.focusKey) : workout.focus) : undefined;

export const getPlannedNote = (planned: PlannedExercise, t: TFunction): string | undefined =>
  planned.noteKey ? t(planned.noteKey) : planned.note;

/** Short badge for a workout: "Upper A" → "UA", "Legs" → "LE", otherwise a letter by position. */
export function getWorkoutBadge(name: string, index: number): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const last = words[words.length - 1] ?? '';
  if (words.length > 1 && last.length === 1) return `${words[0][0]}${last}`.toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return String.fromCharCode(65 + (index % 26));
}
