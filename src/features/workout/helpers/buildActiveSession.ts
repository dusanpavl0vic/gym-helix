import { applyDeloadToExercise } from '@/features/plan/logic/deload';
import type { PlannedExercise, Program, Session, Workout } from '@/types/domain';
import { createId } from '@/utils/id';

import { suggestProgression } from '../logic/progression';
import type { ActiveExercise, ActiveSession } from '../types';
import { getExerciseHistory } from './performance';

interface BuildParams {
  program: Program;
  workout: Workout;
  workoutName: string;
  isDeload: boolean;
  sessions: Session[];
  weightStepKg: number;
  startedAt: string;
}

export function buildActiveExercise(
  plannedInput: PlannedExercise,
  exerciseId: string,
  isDeload: boolean,
  sessions: Session[],
  weightStepKg: number,
): ActiveExercise {
  const planned = isDeload ? applyDeloadToExercise(plannedInput) : plannedInput;
  const history = getExerciseHistory(sessions, exerciseId, 1);
  const suggestion = suggestProgression({ ...planned, exerciseId }, history, weightStepKg);
  const lastWeight = history[0] ? Math.max(...history[0].sets.map((s) => s.weightKg)) : null;
  // Deload keeps the same weight with fewer sets.
  const weightKg = isDeload ? lastWeight : suggestion.weightKg;

  return {
    plannedId: planned.id,
    exerciseId,
    originalExerciseId: plannedInput.exerciseId,
    planned,
    skipped: false,
    suggestion: isDeload ? (lastWeight === null ? 'none' : 'hold') : suggestion.reason,
    suggestedWeightKg: weightKg,
    incrementKg: suggestion.incrementKg,
    sets: Array.from({ length: planned.sets }, (_, i) => ({ weightKg, reps: suggestion.reps[i] ?? planned.repsMin, done: false })),
  };
}

export function buildActiveSession({ program, workout, workoutName, isDeload, sessions, weightStepKg, startedAt }: BuildParams): ActiveSession {
  return {
    id: createId('s_'),
    programId: program.id,
    workoutId: workout.id,
    workoutName,
    startedAt,
    isDeload,
    currentExerciseIndex: 0,
    rest: null,
    exercises: workout.exercises.map((planned) => buildActiveExercise(planned, planned.exerciseId, isDeload, sessions, weightStepKg)),
  };
}
