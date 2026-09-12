import { Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { animation } from '@/constants/animation';
import { clamp } from '@/utils/number';

import { styles, TOOLTIP_WIDTH } from './ChartTooltip.styles';
import type { ChartTooltipProps } from './ChartTooltip.types';

export function ChartTooltip({ value, label, x, containerWidth }: ChartTooltipProps) {
  const left = clamp(x - TOOLTIP_WIDTH / 2, 0, Math.max(0, containerWidth - TOOLTIP_WIDTH));
  return (
    <Animated.View
      pointerEvents="none"
      entering={FadeIn.duration(animation.fast)}
      exiting={FadeOut.duration(animation.fast)}
      style={[styles.box, { left }]}>
      <Text style={styles.value} numberOfLines={1}>{value}</Text>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
    </Animated.View>
  );
}
