import { Text, View } from 'react-native';

import { chart } from '@/constants/charts';

import { styles } from './HBarChart.styles';
import type { HBarChartProps } from './HBarChart.types';

const TARGET_HEADROOM = 1.25;

export function HBarChart({ rows, target, formatValue, accessibilityLabel }: HBarChartProps) {
  const max = Math.max(target.max * TARGET_HEADROOM, ...rows.map((r) => r.value), 1);
  return (
    <View style={styles.list} accessibilityLabel={accessibilityLabel}>
      {rows.map((row) => (
        <View key={row.key} style={styles.row} accessibilityLabel={`${row.label}: ${formatValue(row.value)}`}>
          <Text style={styles.label} numberOfLines={1}>{row.label}</Text>
          <View style={styles.track}>
            <View style={[styles.zone, { left: `${(target.min / max) * 100}%`, width: `${((target.max - target.min) / max) * 100}%` }]} />
            <View style={styles.baseline} />
            <View
              style={[
                styles.bar,
                { width: `${(row.value / max) * 100}%`, backgroundColor: row.value >= target.min ? chart.colors.barStrong : chart.colors.barMuted },
              ]}
            />
          </View>
          <Text style={styles.value}>{formatValue(row.value)}</Text>
        </View>
      ))}
    </View>
  );
}
