import { linear, nearestIndex, niceTicks, roundedTopBarPath } from '../scale';

describe('chart scale helpers', () => {
  it('produces clean ticks covering the data', () => {
    const ticks = niceTicks([62.5, 70, 81], 3);
    expect(ticks[0]).toBeLessThanOrEqual(62.5);
    expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(81);
    expect(ticks.every((t) => Number.isInteger(t / 5))).toBe(true);
  });

  it('pads a flat series and supports a zero baseline', () => {
    expect(niceTicks([100, 100], 3).length).toBeGreaterThan(1);
    expect(niceTicks([3, 9], 3, true)[0]).toBe(0);
  });

  it('maps linearly and finds the nearest position', () => {
    expect(linear({ min: 0, max: 10 }, { min: 100, max: 0 })(5)).toBe(50);
    expect(nearestIndex([0, 50, 100], 70)).toBe(1);
  });

  it('builds an empty path for zero-height bars', () => {
    expect(roundedTopBarPath(0, 0, 10, 0, 4)).toBe('');
    expect(roundedTopBarPath(0, 0, 10, 20, 4)).toContain('Q');
  });
});
