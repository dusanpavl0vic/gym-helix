import { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { animation } from '@/constants/animation';

import { styles } from './PressableScale.styles';
import type { PressableScaleProps } from './PressableScale.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PressableScale({
  children, onPress, onLongPress, disabled, style, pressedStyle, accessibilityLabel, accessibilityRole = 'button', hitSlop,
}: PressableScaleProps) {
  const scale = useSharedValue(1);
  const [pressed, setPressed] = useState(false);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={hitSlop}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => {
        setPressed(true);
        scale.value = withSpring(animation.pressScale, animation.spring);
      }}
      onPressOut={() => {
        setPressed(false);
        scale.value = withSpring(1, animation.spring);
      }}
      style={[style, pressed && pressedStyle, disabled && styles.disabled, animatedStyle]}>
      {children}
    </AnimatedPressable>
  );
}
