import type { PlannedExercise, Program, Workout } from '@/types/domain';
import { createId } from '@/utils/id';

export const ROTATION_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (index < 0 || target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function cloneProgram(program: Program, name: string, now: string): Program {
  const workoutIdMap = new Map<string, string>();
  const workouts: Workout[] = program.workouts.map((w) => {
    const id = createId('w_');
    workoutIdMap.set(w.id, id);
    return { ...w, id, exercises: w.exercises.map((e) => ({ ...e, id: createId('pe_') })) };
  });
  return {
    id: createId('p_'),
    name,
    workouts,
    rotation: program.rotation.map((id) => workoutIdMap.get(id)).filter((id): id is string => Boolean(id)),
    createdAt: now,
    updatedAt: now,
  };
}

export function createEmptyProgram(name: string, now: string): Program {
  return { id: createId('p_'), name, workouts: [], rotation: [], createdAt: now, updatedAt: now };
}

export function createPlannedExercise(exerciseId: string, restSec: number): PlannedExercise {
  return { id: createId('pe_'), exerciseId, sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec };
}
