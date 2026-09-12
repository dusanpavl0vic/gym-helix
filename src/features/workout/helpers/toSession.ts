import type { Session } from '@/types/domain';

import type { ActiveSession } from '../types';

export function toSession(active: ActiveSession, finishedAt: string, extra: { bodyweightKg?: number; notes?: string }): Session {
  return {
    id: active.id,
    programId: active.programId,
    workoutId: active.workoutId,
    workoutName: active.workoutName,
    startedAt: active.startedAt,
    finishedAt,
    isDeload: active.isDeload,
    bodyweightKg: extra.bodyweightKg,
    notes: extra.notes?.trim() || undefined,
    exercises: active.exercises.map((exercise) => ({
      exerciseId: exercise.exerciseId,
      skipped: exercise.skipped || undefined,
      substitutedFor: exercise.exerciseId !== exercise.originalExerciseId ? exercise.originalExerciseId : undefined,
      sets: exercise.skipped
        ? []
        : exercise.sets
            .map((set, setIndex) => ({ set, setIndex }))
            .filter(({ set }) => set.done)
            .map(({ set, setIndex }) => ({
              setIndex,
              weightKg: set.weightKg,
              reps: set.reps,
              rir: set.rir,
              completedAt: set.completedAt ?? finishedAt,
            })),
    })),
  };
}
