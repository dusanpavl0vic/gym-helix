import { bestE1RM, bestSet, epley1RM } from '../e1rm';

describe('e1rm', () => {
  it('uses the Epley formula', () => {
    expect(epley1RM(100, 10)).toBeCloseTo(133.33, 1);
    expect(epley1RM(100, 1)).toBe(100);
    expect(epley1RM(100, 0)).toBe(0);
  });

  it('finds the heaviest set and best estimate', () => {
    const sets = [{ weightKg: 60, reps: 10 }, { weightKg: 65, reps: 6 }, { weightKg: 65, reps: 7 }];
    expect(bestSet(sets)).toEqual({ weightKg: 65, reps: 7 });
    expect(bestE1RM(sets)).toBeCloseTo(80, 0);
  });
});
