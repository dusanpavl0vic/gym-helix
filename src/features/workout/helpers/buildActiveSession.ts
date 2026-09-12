import { applyDeloadToExercise } from '@/features/plan/logic/deload';
import type { Exercise, Program, Session, Workout } from '@/types/domain';
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
  exercises: Record<string, Exercise>;
  startedAt: string;
}

export function buildActiveExercise(
  plannedInput: Workout['exercises'][number],
  exerciseId: string,
  isDeload: boolean,
  sessions: Session[],
  exercises: Record<string, Exercise>,
): ActiveExercise {
  const planned = isDeload ? applyDeloadToExercise(plannedInput) : plannedInput;
  const history = getExerciseHistory(sessions, exerciseId, 3);
  const muscles = exercises[exerciseId]?.primaryMuscles ?? [];
  const suggestion = suggestProgression(planned, history, muscles);
  return {
    plannedId: planned.id,
    exerciseId,
    originalExerciseId: plannedInput.exerciseId,
    planned,
    skipped: false,
    suggestion: isDeload ? 'hold' : suggestion.reason,
    suggestionIncrementKg: suggestion.incrementKg,
    sets: Array.from({ length: planned.sets }, (_, i) => ({
      weightKg: isDeload ? history[0]?.sets[0]?.weightKg ?? 0 : suggestion.weightKg ?? 0,
      reps: suggestion.reps[i] ?? planned.repsMin,
      done: false,
    })),
  };
}

export function buildActiveSession({ program, workout, workoutName, isDeload, sessions, exercises, startedAt }: BuildParams): ActiveSession {
  return {
    id: createId('s_'),
    programId: program.id,
    workoutId: workout.id,
    workoutName,
    startedAt,
    isDeload,
    currentExerciseIndex: 0,
    rest: null,
    exercises: workout.exercises.map((planned) =>
      buildActiveExercise(planned, planned.exerciseId, isDeload, sessions, exercises),
    ),
  };
}
