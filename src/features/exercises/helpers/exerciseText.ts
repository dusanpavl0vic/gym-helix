import type { TFunction } from 'i18next';

import type { Exercise } from '@/types/domain';

export function getExerciseName(exercise: Exercise | undefined, t: TFunction, fallbackId = ''): string {
  if (!exercise) return fallbackId;
  if (exercise.isCustom) return exercise.name ?? exercise.nameEn;
  return t(`exercises:items.${exercise.id}.name`, { defaultValue: exercise.nameEn });
}

export function getExerciseInstructions(exercise: Exercise | undefined, t: TFunction): string[] {
  if (!exercise) return [];
  if (exercise.isCustom) return exercise.instructions ?? [];
  const value = t(`exercises:items.${exercise.id}.instructions`, { returnObjects: true });
  return Array.isArray(value) ? (value as string[]) : [];
}

export function getMuscleLabels(exercise: Exercise | undefined, t: TFunction): string[] {
  if (!exercise) return [];
  return exercise.primaryMuscles.map((m) => t(`common:muscles.${m}`));
}
