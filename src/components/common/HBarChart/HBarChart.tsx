import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { animation } from '@/constants/animation';
import { chart } from '@/constants/charts';

import { styles } from './HBarChart.styles';
import type { HBarChartProps, HBarRow } from './HBarChart.types';

function Bar({ row, max, index, inZone }: { row: HBarRow; max: number; index: number; inZone: boolean }) {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withDelay(index * animation.stagger, withTiming(1, { duration: animation.chartReveal, easing: Easing.out(Easing.cubic) }));
  }, [row.value, index, progress]);
  const style = useAnimatedStyle(() => ({ width: `${(row.value / max) * 100 * progress.value}%` }));
  return <Animated.View style={[styles.bar, { backgroundColor: inZone ? chart.colors.barStrong : chart.colors.barMuted }, style]} />;
}

export function HBarChart({ rows, target, formatValue, accessibilityLabel }: HBarChartProps) {
  const max = Math.max(target.max * 1.25, ...rows.map((r) => r.value), 1);
  return (
    <View style={styles.list} accessibilityLabel={accessibilityLabel}>
      {rows.map((row, index) => (
        <View key={row.key} style={styles.row} accessibilityLabel={`${row.label}: ${formatValue(row.value)}`}>
          <Text style={styles.label} numberOfLines={1}>{row.label}</Text>
          <View style={styles.track}>
            <View style={[styles.zone, { left: `${(target.min / max) * 100}%`, width: `${((target.max - target.min) / max) * 100}%` }]} />
            <View style={styles.baseline} />
            <Bar row={row} max={max} index={index} inZone={row.value >= target.min} />
          </View>
          <Text style={styles.value}>{formatValue(row.value)}</Text>
        </View>
      ))}
    </View>
  );
}
