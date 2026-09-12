import type { Exercise, PlannedExercise } from '@/types/domain';

export interface PlannedExerciseEditorProps {
  planned: PlannedExercise;
  exercise: Exercise | undefined;
  name: string;
  note: string;
  alternatives: { id: string; name: string }[];
  isFirst: boolean;
  isLast: boolean;
  onChange: (patch: Partial<Omit<PlannedExercise, 'id'>>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onAddAlternative: () => void;
  onRemoveAlternative: (id: string) => void;
}
