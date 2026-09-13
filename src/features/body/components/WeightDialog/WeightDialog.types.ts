export interface WeightDialogProps {
  visible: boolean;
  initialValue: number | null;
  onSave: (kg: number) => void;
  onClose: () => void;
}
