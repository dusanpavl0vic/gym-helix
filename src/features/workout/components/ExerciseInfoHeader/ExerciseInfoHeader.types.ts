import type { Exercise } from '@/types/domain';

import type { SuggestionReason } from '../../logic/progression';

export interface ExerciseInfoHeaderProps {
  exercise: Exercise | undefined;
  name: string;
  scheme: string;
  note?: string;
  lastTime?: string;
  suggestion: string;
  tone: SuggestionReason;
  substitutedLabel?: string;
  deloadLabel?: string;
  skippedLabel?: string;
  placeholderLabel: string;
}
