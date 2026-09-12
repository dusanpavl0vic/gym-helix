import { calculatePlates } from '../plates';

const plates = [25, 20, 15, 10, 5, 2.5, 1.25];

describe('calculatePlates', () => {
  it('splits load evenly per side', () => {
    expect(calculatePlates(100, 20, plates)).toMatchObject({ perSide: [25, 15], achievedKg: 100, remainderKg: 0 });
    expect(calculatePlates(62.5, 20, plates).perSide).toEqual([20, 1.25]);
  });

  it('reports remainder when target is not loadable', () => {
    const r = calculatePlates(61, 20, plates);
    expect(r.achievedKg).toBe(60);
    expect(r.remainderKg).toBe(1);
  });

  it('handles weights at or below the bar', () => {
    expect(calculatePlates(20, 20, plates).perSide).toEqual([]);
    expect(calculatePlates(15, 20, plates).belowBar).toBe(true);
  });
});
