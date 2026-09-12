import type { PlannedExercise } from '@/types/domain';

import type { SuggestionReason } from './logic/progression';

export interface ActiveSet {
  weightKg: number;
  reps: number;
  rir?: number;
  done: boolean;
  completedAt?: string;
}

export interface ActiveExercise {
  plannedId: string;
  exerciseId: string;
  originalExerciseId: string;
  planned: PlannedExercise;
  sets: ActiveSet[];
  skipped: boolean;
  suggestion: SuggestionReason;
  suggestionIncrementKg: number;
}

export type RestKind = 'set' | 'exercise';

export interface RestState {
  endsAt: number;
  totalSec: number;
  kind: RestKind;
}

export interface ActiveSession {
  id: string;
  programId: string;
  workoutId: string;
  workoutName: string;
  startedAt: string;
  isDeload: boolean;
  exercises: ActiveExercise[];
  currentExerciseIndex: number;
  rest: RestState | null;
}

export interface SetPosition {
  exerciseIndex: number;
  setIndex: number;
}
