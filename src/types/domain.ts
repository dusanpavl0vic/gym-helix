import type { ImageSourcePropType } from 'react-native';

import type { ExerciseKind } from '@/constants/training';

export type MuscleGroup =
  | 'chest' | 'back' | 'quads' | 'hamstrings' | 'glutes'
  | 'shoulders' | 'biceps' | 'triceps' | 'calves' | 'core';

export type ExerciseImage = ImageSourcePropType | string;

export interface Exercise {
  id: string;
  /** Plain name for user-created exercises; catalog exercises are translated via i18n. */
  name?: string;
  nameEn: string;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  equipment: string;
  kind: ExerciseKind;
  images: ExerciseImage[];
  instructions?: string[];
  defaultRestSec: number;
  isCustom?: boolean;
}

export interface PlannedExercise {
  id: string;
  exerciseId: string;
  sets: number;
  repsMin: number;
  repsMax: number;
  targetRir: number;
  targetRirMax?: number;
  restSec: number;
  restSecMax?: number;
  perSide?: boolean;
  note?: string;
  noteKey?: string;
  alternativeIds?: string[];
}

export interface Workout {
  id: string;
  name?: string;
  nameKey?: string;
  focus?: string;
  focusKey?: string;
  exercises: PlannedExercise[];
}

export interface Program {
  id: string;
  name?: string;
  nameKey?: string;
  workouts: Workout[];
  rotation: string[];
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RotationState {
  programId: string;
  nextIndex: number;
  lastCompletedAt?: string;
  cycleNumber: number;
  completedSessions: number;
  sessionsSinceDeload: number;
  deloadActive: boolean;
  deloadRemaining: number;
}

export interface LoggedSet {
  setIndex: number;
  weightKg: number;
  reps: number;
  rir?: number;
  completedAt: string;
}

export interface LoggedExercise {
  exerciseId: string;
  sets: LoggedSet[];
  skipped?: boolean;
  substitutedFor?: string;
}

export interface Session {
  id: string;
  programId: string;
  workoutId: string;
  workoutName: string;
  startedAt: string;
  finishedAt?: string;
  exercises: LoggedExercise[];
  bodyweightKg?: number;
  notes?: string;
  isDeload?: boolean;
}

export type CardioType = 'swim' | 'zone2' | 'walk' | 'hiit';

export interface CardioSession {
  id: string;
  type: CardioType;
  date: string;
  durationMin: number;
  notes?: string;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weightKg?: number;
  waistCm?: number;
  armCm?: number;
  chestCm?: number;
  thighCm?: number;
}

export interface PerformedSet {
  weightKg: number;
  reps: number;
  rir?: number;
}

export interface ExercisePerformance {
  sessionId: string;
  date: string;
  sets: PerformedSet[];
}
