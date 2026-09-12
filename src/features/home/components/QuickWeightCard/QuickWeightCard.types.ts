export interface QuickWeightCardProps {
  title: string;
  hint: string;
  savedLabel?: string;
  unitLabel: string;
  onSave: (kg: number) => void;
}
