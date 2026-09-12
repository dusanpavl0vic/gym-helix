export interface LinePoint {
  x: number;
  y: number;
}

export interface LineChartProps {
  points: LinePoint[];
  height?: number;
  formatY: (value: number) => string;
  formatX: (x: number) => string;
  emptyLabel: string;
  accessibilityLabel: string;
  zeroBased?: boolean;
}
