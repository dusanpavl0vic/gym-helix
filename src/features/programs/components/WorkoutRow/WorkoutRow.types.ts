export interface WorkoutRowProps {
  badge: string;
  name: string;
  meta: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  labels: { moveUp: string; moveDown: string; delete: string };
  onOpen: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}
