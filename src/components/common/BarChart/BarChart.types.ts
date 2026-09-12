export interface BarDatum {
  key: string;
  label: string;
  value: number;
  tooltipLabel?: string;
}

export interface BarChartProps {
  bars: BarDatum[];
  height?: number;
  formatValue: (value: number) => string;
  accessibilityLabel: string;
  emptyLabel: string;
  /** Emphasize the last bar (current period). */
  highlightLast?: boolean;
  target?: { min: number; max: number };
}
