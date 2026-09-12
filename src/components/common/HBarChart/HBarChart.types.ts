export interface HBarRow {
  key: string;
  label: string;
  value: number;
}

export interface HBarChartProps {
  rows: HBarRow[];
  target: { min: number; max: number };
  formatValue: (value: number) => string;
  accessibilityLabel: string;
}
