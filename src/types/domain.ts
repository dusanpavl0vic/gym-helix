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
  /** Weight added when every set reaches repsMax (default DEFAULT_INCREMENT_KG). */
  incrementKg?: number;
  progression?: ProgressionType;
}

export type ProgressionType = 'double' | 'none';

export type WeekPlanKind = 'strength' | 'rest' | 'cardio';

/** Suggested weekly schedule, shown for information only (workouts still rotate in order). */
export interface WeekPlanDay {
  /** 1 = Monday … 7 = Sunday */
  weekday: number;
  kind: WeekPlanKind;
  workoutId?: string;
  noteKey?: string;
  note?: string;
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
  goalKey?: string;
  workouts: Workout[];
  rotation: string[];
  weekPlan?: WeekPlanDay[];
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RotationState {
  programId: string;
  nextIndex: number;
  lastCompletedAt?: string;
  /** Training week = completed rotation cycles + 1. */
  cycleNumber: number;
  completedSessions: number;
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

export type CardioType = 'run' | 'swim' | 'zone2' | 'walk' | 'hiit';

export interface CardioSession {
  id: string;
  type: CardioType;
  date: string;
  durationMin: number;
  distanceKm?: number;
  avgHeartRate?: number;
  /** Perceived exertion 1–10. */
  rpe?: number;
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
