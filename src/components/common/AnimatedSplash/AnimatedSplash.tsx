import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing, FadeInUp, useAnimatedProps, useAnimatedStyle, useReducedMotion, useSharedValue, withSequence, withSpring, withTiming, ZoomIn,
} from 'react-native-reanimated';
import Svg, { Path, Rect } from 'react-native-svg';

import { animation } from '@/constants/animation';
import { LOGO_DUMBBELL, LOGO_RING, LOGO_VIEWBOX, SPLASH_LOGO_SIZE, SPLASH_TIMING } from '@/constants/brand';
import { colors } from '@/constants/colors';

import { styles } from './AnimatedSplash.styles';
import type { AnimatedSplashProps } from './AnimatedSplash.types';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const REDUCED_MOTION_HOLD_MS = 350;
const EXIT_SCALE = 1.12;

export function AnimatedSplash({ title, tagline, onFinish }: AnimatedSplashProps) {
  const reducedMotion = useReducedMotion();
  const draw = useSharedValue(reducedMotion ? 1 : 0);
  const exit = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (reducedMotion) {
      const done = setTimeout(onFinish, REDUCED_MOTION_HOLD_MS);
      return () => clearTimeout(done);
    }
    draw.value = withTiming(1, { duration: SPLASH_TIMING.ringDraw, easing: Easing.out(Easing.cubic) });
    pulse.value = withSequence(
      withTiming(1, { duration: SPLASH_TIMING.ringDraw }),
      withSpring(1.06, animation.spring),
      withSpring(1, animation.spring),
    );
    const fade = setTimeout(() => {
      exit.value = withTiming(1, { duration: SPLASH_TIMING.fadeOut, easing: Easing.in(Easing.quad) });
    }, SPLASH_TIMING.hold);
    const done = setTimeout(onFinish, SPLASH_TIMING.hold + SPLASH_TIMING.fadeOut);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ringProps = useAnimatedProps(() => ({ strokeDashoffset: LOGO_RING.length * (1 - draw.value) }));
  const overlayStyle = useAnimatedStyle(() => ({ opacity: 1 - exit.value }));
  const markStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value * (1 + (EXIT_SCALE - 1) * exit.value) }],
  }));

  return (
    <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="auto" accessibilityLabel={title}>
      <View style={styles.accent} />
      <Animated.View style={[styles.mark, markStyle]}>
        <Animated.View
          style={styles.layer}
          entering={reducedMotion ? undefined : ZoomIn.delay(SPLASH_TIMING.dumbbellDelay).springify().damping(animation.spring.damping)}>
          <Svg width={SPLASH_LOGO_SIZE} height={SPLASH_LOGO_SIZE} viewBox={LOGO_VIEWBOX}>
            {LOGO_DUMBBELL.map((r, i) => (
              <Rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} rx={r.rx} fill={colors.paperWarm} />
            ))}
          </Svg>
        </Animated.View>
        <Svg width={SPLASH_LOGO_SIZE} height={SPLASH_LOGO_SIZE} viewBox={LOGO_VIEWBOX} style={styles.layer}>
          <AnimatedPath
            d={LOGO_RING.path}
            fill="none"
            stroke={colors.lime}
            strokeWidth={LOGO_RING.stroke}
            strokeLinecap="round"
            strokeDasharray={LOGO_RING.length}
            animatedProps={ringProps}
          />
        </Svg>
      </Animated.View>
      <View style={styles.texts}>
        <Animated.Text entering={reducedMotion ? undefined : FadeInUp.delay(SPLASH_TIMING.textDelay).duration(animation.slow)} style={styles.title}>
          {title}
        </Animated.Text>
        <Animated.Text entering={reducedMotion ? undefined : FadeInUp.delay(SPLASH_TIMING.textDelay + animation.stagger * 2).duration(animation.slow)} style={styles.tagline}>
          {tagline.toUpperCase()}
        </Animated.Text>
      </View>
    </Animated.View>
  );
}
