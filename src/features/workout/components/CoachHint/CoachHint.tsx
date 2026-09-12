import { Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { animation } from '@/constants/animation';

import { styles } from './CoachHint.styles';
import type { CoachHintProps } from './CoachHint.types';

export function CoachHint({ lastTime, suggestion, tone }: CoachHintProps) {
  const toneStyle = tone === 'increase' ? styles.increase : tone === 'recover' ? styles.recover : styles.neutral;
  return (
    <Animated.View entering={FadeIn.duration(animation.normal)} style={[styles.box, toneStyle]}>
      {lastTime ? <Text style={styles.lastTime}>{lastTime}</Text> : null}
      <Text style={styles.suggestion}>{suggestion}</Text>
    </Animated.View>
  );
}
