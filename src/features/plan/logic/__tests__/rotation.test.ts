import type { Program } from '@/types/domain';

import { completeSession, createRotationState, getNextWorkoutId, jumpToWorkout } from '../rotation';
import { applyDeloadToExercise, dismissDeload, isDeloadDue, startDeload } from '../deload';

const program: Program = {
  id: 'p',
  workouts: [],
  rotation: ['FB_A', 'FB_B', 'FB_C'],
  createdAt: '',
  updatedAt: '',
};

describe('rotation', () => {
  it('cycles A → B → C → A regardless of dates', () => {
    let state = createRotationState('p');
    const seen: (string | undefined)[] = [];
    for (let i = 0; i < 4; i += 1) {
      seen.push(getNextWorkoutId(program, state));
      state = completeSession(state, 3, `2026-09-${10 + i * 5}T10:00:00Z`);
    }
    expect(seen).toEqual(['FB_A', 'FB_B', 'FB_C', 'FB_A']);
    expect(state.cycleNumber).toBe(2);
    expect(state.completedSessions).toBe(4);
  });

  it('jumps to a chosen workout without resetting', () => {
    let state = createRotationState('p');
    state = completeSession(state, 3, 'x');
    state = completeSession(state, 3, 'x');
    state = completeSession(state, 3, 'x');
    state = completeSession(state, 3, 'x'); // next B
    const jumped = jumpToWorkout(program, state, 'FB_C');
    expect(getNextWorkoutId(program, jumped)).toBe('FB_C');
    expect(jumped.completedSessions).toBe(4);
    expect(jumped.cycleNumber).toBe(state.cycleNumber);
  });

  it('ignores unknown workout ids', () => {
    const state = createRotationState('p');
    expect(jumpToWorkout(program, state, 'nope')).toBe(state);
  });
});

describe('deload', () => {
  it('is due after 6 full cycles and runs for one cycle', () => {
    let state = createRotationState('p');
    for (let i = 0; i < 17; i += 1) state = completeSession(state, 3, 'x');
    expect(isDeloadDue(state, 3)).toBe(false);
    state = completeSession(state, 3, 'x');
    expect(isDeloadDue(state, 3)).toBe(true);

    state = startDeload(state, 3);
    expect(isDeloadDue(state, 3)).toBe(false);
    for (let i = 0; i < 3; i += 1) state = completeSession(state, 3, 'x');
    expect(state.deloadActive).toBe(false);
    expect(state.sessionsSinceDeload).toBe(0);
  });

  it('dismiss resets the counter', () => {
    const state = { ...createRotationState('p'), sessionsSinceDeload: 20 };
    expect(isDeloadDue(dismissDeload(state), 3)).toBe(false);
  });

  it('caps sets at 2 and raises RIR', () => {
    const planned = applyDeloadToExercise({
      id: 'x', exerciseId: 'legPress', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 150,
    });
    expect(planned.sets).toBe(2);
    expect(planned.targetRir).toBe(4);
    expect(planned.targetRirMax).toBe(5);
  });
});
