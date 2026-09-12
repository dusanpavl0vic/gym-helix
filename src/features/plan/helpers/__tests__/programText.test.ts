import { getWorkoutBadge } from '@/features/programs/helpers/programText';

describe('getWorkoutBadge', () => {
  it('uses a trailing single letter', () => {
    expect(getWorkoutBadge('Full Body B', 5)).toBe('B');
  });
  it('falls back to a positional letter', () => {
    expect(getWorkoutBadge('Legs', 2)).toBe('C');
  });
});
