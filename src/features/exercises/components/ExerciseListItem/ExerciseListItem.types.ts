import type { Exercise } from '@/types/domain';

export interface ExerciseListItemProps {
  exercise: Exercise;
  name: string;
  subtitle: string;
  badge?: string;
  placeholderLabel: string;
  onPress: () => void;
}
