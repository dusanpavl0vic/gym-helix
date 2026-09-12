export interface WorkoutHeaderProps {
  title: string;
  subtitle: string;
  elapsed: string;
  progress: number;
  closeLabel: string;
  onClose: () => void;
}
