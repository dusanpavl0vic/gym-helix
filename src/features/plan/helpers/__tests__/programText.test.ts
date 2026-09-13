import { getWorkoutBadge } from '@/features/programs/helpers/programText';

describe('getWorkoutBadge', () => {
  it('combines the first letter with a trailing single letter', () => {
    expect(getWorkoutBadge('Upper A', 0)).toBe('UA');
    expect(getWorkoutBadge('Lower B', 3)).toBe('LB');
  });
  it('uses the first two letters of a single word', () => {
    expect(getWorkoutBadge('Legs', 2)).toBe('LE');
  });
  it('falls back to a positional letter', () => {
    expect(getWorkoutBadge('', 2)).toBe('C');
    expect(getWorkoutBadge('Push day heavy', 1)).toBe('B');
  });
});
