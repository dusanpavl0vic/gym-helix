import type { Exercise } from '@/types/domain';

import type { ExerciseStatus } from '../../types';

export interface ExerciseStatusCardProps {
  exercise: Exercise | undefined;
  name: string;
  scheme: string;
  detail: string;
  status: ExerciseStatus;
  progressLabel: string;
  placeholderLabel: string;
  onPress: () => void;
}
