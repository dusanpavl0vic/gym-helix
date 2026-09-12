import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing, useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { animation } from '@/constants/animation';
import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { TIMER_TICK_MS } from '@/constants/timer';

import { styles } from './RestRing.styles';
import type { RestRingProps } from './RestRing.types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CIRCUMFERENCE = 2 * Math.PI * metrics.restRingRadius;
const VIEWBOX = 240;

export function RestRing({ progress, remainingLabel, totalLabel, urgent }: RestRingProps) {
  const ring = useSharedValue(progress);
  const pulse = useSharedValue(0);
  const bump = useSharedValue(1);

  useEffect(() => {
    ring.value = withTiming(progress, { duration: TIMER_TICK_MS, easing: Easing.linear });
  }, [progress, ring]);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: animation.pulseDuration, easing: Easing.out(Easing.quad) }), -1, false);
  }, [pulse]);

  useEffect(() => {
    if (urgent) bump.value = withSequence(withSpring(1.14, animation.spring), withSpring(1, animation.spring));
  }, [remainingLabel, urgent, bump]);

  const ringProps = useAnimatedProps(() => ({ strokeDashoffset: CIRCUMFERENCE * (1 - ring.value) }));
  const pulseStyle = useAnimatedStyle(() => ({
    opacity: 0.35 * (1 - Math.min(1, pulse.value / 0.7)),
    transform: [{ scale: 1 + 0.35 * Math.min(1, pulse.value / 0.7) }],
  }));
  const numberStyle = useAnimatedStyle(() => ({ transform: [{ scale: bump.value }] }));

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.pulse, pulseStyle]} />
      <Svg width={metrics.restRingSize} height={metrics.restRingSize} viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} style={styles.svg}>
        <Circle cx={120} cy={120} r={metrics.restRingRadius} fill="none" stroke={colors.restTrack} strokeWidth={metrics.restRingStroke} />
        <AnimatedCircle
          cx={120}
          cy={120}
          r={metrics.restRingRadius}
          fill="none"
          stroke={urgent ? colors.limeHover : colors.lime}
          strokeWidth={metrics.restRingStroke}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          animatedProps={ringProps}
        />
      </Svg>
      <View style={styles.center}>
        <Animated.Text style={[styles.remaining, numberStyle]}>{remainingLabel}</Animated.Text>
        <Text style={styles.total}>{totalLabel}</Text>
      </View>
    </View>
  );
}
