export interface RpePickerProps {
  label: string;
  hint: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}
