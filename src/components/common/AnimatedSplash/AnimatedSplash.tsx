import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';

import { Logo } from '@/components/common/Logo';
import { SPLASH_LOGO_SIZE, SPLASH_TIMING } from '@/constants/brand';

import { styles } from './AnimatedSplash.styles';
import type { AnimatedSplashProps } from './AnimatedSplash.types';

const ENTER_SCALE = 0.9;

export function AnimatedSplash({ title, tagline, onFinish }: AnimatedSplashProps) {
  const reducedMotion = useReducedMotion();
  const enter = useSharedValue(reducedMotion ? 1 : 0);
  const exit = useSharedValue(0);

  useEffect(() => {
    enter.value = withTiming(1, { duration: SPLASH_TIMING.enter, easing: Easing.out(Easing.cubic) });
    const fade = setTimeout(() => {
      exit.value = withTiming(1, { duration: SPLASH_TIMING.fadeOut, easing: Easing.in(Easing.quad) });
    }, SPLASH_TIMING.hold);
    const done = setTimeout(onFinish, SPLASH_TIMING.hold + SPLASH_TIMING.fadeOut);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const overlayStyle = useAnimatedStyle(() => ({ opacity: 1 - exit.value }));
  const logoStyle = useAnimatedStyle(() => ({ transform: [{ scale: ENTER_SCALE + (1 - ENTER_SCALE) * enter.value }] }));
  const textStyle = useAnimatedStyle(() => ({ opacity: enter.value }));

  return (
    <Animated.View style={[styles.overlay, overlayStyle]} accessibilityLabel={title}>
      <View style={styles.accent} />
      <Animated.View style={[styles.logo, logoStyle]}>
        <Logo size={SPLASH_LOGO_SIZE} />
      </Animated.View>
      <Animated.View style={[styles.texts, textStyle]}>
        <Animated.Text style={styles.title}>{title}</Animated.Text>
        <Animated.Text style={styles.tagline}>{tagline.toUpperCase()}</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}
