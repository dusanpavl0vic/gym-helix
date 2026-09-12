import type { Exercise } from '@/types/domain';

export interface PlanExerciseItemProps {
  index: number;
  exercise: Exercise | undefined;
  name: string;
  scheme: string;
  rest: string;
  note?: string;
  placeholderLabel: string;
  onPress: () => void;
}
