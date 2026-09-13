import { effectiveRestSound, restRemainingSec, restSecondsFor } from '../rest';

const planned = { id: 'x', exerciseId: 'facePull', sets: 2, repsMin: 15, repsMax: 20, targetRir: 1, restSec: 45 };

describe('rest helpers', () => {
  it('uses a longer minimum rest before a new exercise', () => {
    expect(restSecondsFor(planned, 'set')).toBe(45);
    expect(restSecondsFor(planned, 'exercise')).toBe(60);
  });

  it('rounds remaining time up and never goes negative', () => {
    expect(restRemainingSec(10_500, 10_000)).toBe(1);
    expect(restRemainingSec(9_000, 10_000)).toBe(0);
  });

  it('falls back to the app sound when notifications are unavailable', () => {
    expect(effectiveRestSound('system', false)).toBe('app');
    expect(effectiveRestSound('system', true)).toBe('system');
    expect(effectiveRestSound('off', false)).toBe('off');
  });
});
