import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, ZoomIn, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { animation } from '@/constants/animation';

import { BADGE, SPARK_COLORS, styles } from './Celebration.styles';
import type { CelebrationProps } from './Celebration.types';

const SPARKS = 12;

function Spark({ index }: { index: number }) {
  const t = useSharedValue(0);
  const angle = (index / SPARKS) * Math.PI * 2;
  const distance = BADGE * 0.9 + (index % 3) * 10;

  useEffect(() => {
    t.value = withDelay(animation.normal, withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) }));
  }, [t]);

  const style = useAnimatedStyle(() => ({
    opacity: 1 - t.value,
    transform: [
      { translateX: Math.cos(angle) * distance * t.value },
      { translateY: Math.sin(angle) * distance * t.value },
      { scale: 1 - t.value * 0.4 },
    ],
  }));

  return <Animated.View style={[styles.spark, { backgroundColor: SPARK_COLORS[index % SPARK_COLORS.length] }, style]} />;
}

export function Celebration({ label }: CelebrationProps) {
  return (
    <View style={styles.wrap} accessibilityLabel={label}>
      {Array.from({ length: SPARKS }, (_, i) => (
        <Spark key={i} index={i} />
      ))}
      <Animated.View entering={ZoomIn.springify().damping(10)} style={styles.badge}>
        <Animated.Text style={styles.check}>✓</Animated.Text>
      </Animated.View>
      <Animated.Text entering={ZoomIn.delay(animation.slow)} style={styles.label}>{label}</Animated.Text>
    </View>
  );
}
