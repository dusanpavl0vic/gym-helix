export interface NextWorkoutCardProps {
  eyebrow: string;
  title: string;
  focus?: string;
  meta: string;
  footnote: string;
  tags: string[];
  badge?: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}
