import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { TIMER_TICK_MS } from '@/constants/timer';

import { styles } from './RestRing.styles';
import type { RestRingProps } from './RestRing.types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CIRCUMFERENCE = 2 * Math.PI * metrics.restRingRadius;
const VIEWBOX = 240;
const CENTER = VIEWBOX / 2;

export function RestRing({ progress, remainingLabel, totalLabel, warning }: RestRingProps) {
  const ring = useSharedValue(progress);

  useEffect(() => {
    ring.value = withTiming(progress, { duration: TIMER_TICK_MS, easing: Easing.linear });
  }, [progress, ring]);

  const ringProps = useAnimatedProps(() => ({ strokeDashoffset: CIRCUMFERENCE * (1 - ring.value) }));

  return (
    <View style={styles.wrap}>
      <Svg width={metrics.restRingSize} height={metrics.restRingSize} viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} style={styles.svg}>
        <Circle cx={CENTER} cy={CENTER} r={metrics.restRingRadius} fill="none" stroke={colors.restTrack} strokeWidth={metrics.restRingStroke} />
        <AnimatedCircle
          cx={CENTER}
          cy={CENTER}
          r={metrics.restRingRadius}
          fill="none"
          stroke={warning ? colors.limeHover : colors.lime}
          strokeWidth={metrics.restRingStroke}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          animatedProps={ringProps}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={[styles.remaining, warning && styles.remainingWarning]}>{remainingLabel}</Text>
        <Text style={styles.total}>{totalLabel}</Text>
      </View>
    </View>
  );
}
