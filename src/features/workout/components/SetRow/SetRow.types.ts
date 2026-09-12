import type { ActiveSet } from '../../types';

export interface SetRowProps {
  index: number;
  set: ActiveSet;
  isCurrent: boolean;
  weightStep: number;
  unitLabel: string;
  repsLabel: string;
  rirLabel: string;
  bodyweightLabel: string;
  onChange: (patch: Partial<Pick<ActiveSet, 'weightKg' | 'reps' | 'rir'>>) => void;
  onReopen: () => void;
}
