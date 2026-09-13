export interface SetEditorProps {
  title: string;
  weightText: string;
  repsText: string;
  unitLabel: string;
  weightLabel: string;
  repsLabel: string;
  weightPlaceholder: string;
  decreaseLabel: string;
  increaseLabel: string;
  primaryLabel: string;
  isDone: boolean;
  onWeightStep: (direction: -1 | 1) => void;
  onRepsStep: (direction: -1 | 1) => void;
  onOpenWeight: () => void;
  onOpenReps: () => void;
  onPrimary: () => void;
}
