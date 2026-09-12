import type { SuggestionReason } from '../../logic/progression';

export interface CoachHintProps {
  lastTime?: string;
  suggestion: string;
  tone: SuggestionReason;
}
