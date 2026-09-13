export interface WorkoutOption {
  id: string;
  badge: string;
  name: string;
  focus?: string;
  meta: string;
  dayLabel?: string;
  isNext: boolean;
}

export interface WorkoutChooserSheetProps {
  visible: boolean;
  title: string;
  nextLabel: string;
  closeLabel: string;
  options: WorkoutOption[];
  onSelect: (id: string) => void;
  onClose: () => void;
}
