import type { ActiveExercise, ActiveSet } from '../../types';

export interface SetTableProps {
  exercise: ActiveExercise;
  currentSetIndex: number;
  weightStep: number;
  unitLabel: string;
  labels: { set: string; reps: string; rir: string; bodyweight: string; addSet: string };
  onChange: (setIndex: number, patch: Partial<Pick<ActiveSet, 'weightKg' | 'reps' | 'rir'>>) => void;
  onReopen: (setIndex: number) => void;
  onAddSet: () => void;
}
