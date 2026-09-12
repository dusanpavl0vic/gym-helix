import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';

import { animation } from '@/constants/animation';

import type { AnimatedEntryProps } from './AnimatedEntry.types';

export function AnimatedEntry({ children, index = 0, style }: AnimatedEntryProps) {
  const delay = Math.min(index, animation.maxStaggerItems) * animation.stagger;
  return (
    <Animated.View
      entering={FadeInDown.duration(animation.slow).delay(delay).springify().damping(animation.spring.damping)}
      layout={LinearTransition.duration(animation.normal)}
      style={style}>
      {children}
    </Animated.View>
  );
}
