import type { Exercise } from '@/types/domain';

export interface ExerciseImageProps {
  exercise: Exercise | undefined;
  size: number;
  placeholderLabel: string;
}
