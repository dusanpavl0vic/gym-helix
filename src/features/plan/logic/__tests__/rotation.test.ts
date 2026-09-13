import type { Program } from '@/types/domain';

import { applyDeloadToExercise, deloadSetCount, isDeloadWeek } from '../deload';
import { completeSession, createRotationState, getNextWorkoutId, jumpToWorkout } from '../rotation';

const program: Program = {
  id: 'p',
  workouts: [],
  rotation: ['UPPER_A', 'LOWER_A', 'UPPER_B', 'LOWER_B'],
  createdAt: '',
  updatedAt: '',
};

describe('rotation', () => {
  it('cycles the four strength days in order regardless of dates', () => {
    let state = createRotationState('p');
    const seen: (string | undefined)[] = [];
    for (let i = 0; i < 5; i += 1) {
      seen.push(getNextWorkoutId(program, state));
      state = completeSession(state, 4, `2026-09-${10 + i}T10:00:00Z`);
    }
    expect(seen).toEqual(['UPPER_A', 'LOWER_A', 'UPPER_B', 'LOWER_B', 'UPPER_A']);
    expect(state.cycleNumber).toBe(2);
    expect(state.completedSessions).toBe(5);
  });

  it('jumps to a chosen workout without resetting', () => {
    let state = createRotationState('p');
    for (let i = 0; i < 5; i += 1) state = completeSession(state, 4, 'x');
    const jumped = jumpToWorkout(program, state, 'LOWER_B');
    expect(getNextWorkoutId(program, jumped)).toBe('LOWER_B');
    expect(jumped.completedSessions).toBe(5);
    expect(jumped.cycleNumber).toBe(state.cycleNumber);
  });

  it('ignores unknown workout ids', () => {
    const state = createRotationState('p');
    expect(jumpToWorkout(program, state, 'nope')).toBe(state);
  });
});

describe('deload', () => {
  it('happens every 7th week', () => {
    expect([1, 6, 7, 8, 13, 14].map(isDeloadWeek)).toEqual([false, false, true, false, false, true]);
  });

  it('keeps 60% of sets (rounded down, at least 2) and raises RIR', () => {
    expect([4, 3, 5, 1].map(deloadSetCount)).toEqual([2, 2, 3, 1]);
    const planned = applyDeloadToExercise({ id: 'x', exerciseId: 'legPress', sets: 4, repsMin: 8, repsMax: 12, targetRir: 2, targetRirMax: 3, restSec: 150 });
    expect(planned).toMatchObject({ sets: 2, targetRir: 4, targetRirMax: undefined });
  });
});
