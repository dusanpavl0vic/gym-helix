export interface ValueControlProps {
  label: string;
  valueText: string;
  placeholder: string;
  unitLabel?: string;
  decrementLabel: string;
  incrementLabel: string;
  onDecrement: () => void;
  onIncrement: () => void;
  onPressValue: () => void;
}
