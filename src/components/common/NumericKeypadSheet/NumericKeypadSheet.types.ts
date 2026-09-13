export interface NumericKeypadSheetProps {
  visible: boolean;
  title: string;
  unitLabel?: string;
  initialValue: number | null;
  decimal: boolean;
  /** Optional quick adjust buttons, e.g. [-2.5, 2.5]. */
  quickSteps?: number[];
  submitLabel: string;
  clearLabel: string;
  closeLabel: string;
  onSubmit: (value: number | null) => void;
  onClose: () => void;
}
