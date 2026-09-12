export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  step: number;
  min?: number;
  max?: number;
  decimal?: boolean;
  label?: string;
  compact?: boolean;
}
