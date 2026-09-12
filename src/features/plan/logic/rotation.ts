import type { Program, RotationState } from '@/types/domain';

export function createRotationState(programId: string): RotationState {
  return {
    programId,
    nextIndex: 0,
    cycleNumber: 1,
    completedSessions: 0,
    sessionsSinceDeload: 0,
    deloadActive: false,
    deloadRemaining: 0,
  };
}

export function getNextWorkoutId(program: Program, state: RotationState): string | undefined {
  const { rotation } = program;
  if (rotation.length === 0) return undefined;
  return rotation[state.nextIndex % rotation.length];
}

export function getRotationPosition(program: Program, state: RotationState): number {
  return program.rotation.length === 0 ? 0 : state.nextIndex % program.rotation.length;
}

export function completeSession(state: RotationState, rotationLength: number, completedAt: string): RotationState {
  const length = Math.max(1, rotationLength);
  const nextIndex = state.nextIndex + 1;
  const base: RotationState = {
    ...state,
    nextIndex,
    lastCompletedAt: completedAt,
    cycleNumber: Math.floor(nextIndex / length) + 1,
    completedSessions: state.completedSessions + 1,
  };

  if (state.deloadActive) {
    const deloadRemaining = Math.max(0, state.deloadRemaining - 1);
    return {
      ...base,
      deloadRemaining,
      deloadActive: deloadRemaining > 0,
      sessionsSinceDeload: 0,
    };
  }
  return { ...base, sessionsSinceDeload: state.sessionsSinceDeload + 1 };
}

/** Moves the pointer to the chosen workout without resetting progress. */
export function jumpToWorkout(program: Program, state: RotationState, workoutId: string): RotationState {
  const length = program.rotation.length;
  const target = program.rotation.indexOf(workoutId);
  if (length === 0 || target < 0) return state;
  const cycleStart = state.nextIndex - (state.nextIndex % length);
  return { ...state, nextIndex: cycleStart + target };
}
