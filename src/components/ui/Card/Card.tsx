import { View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';

import { styles, variantStyles } from './Card.styles';
import type { CardProps } from './Card.types';

export function Card({ children, variant = 'paper', onPress, style, accessibilityLabel }: CardProps) {
  if (!onPress) {
    return <View style={[styles.base, variantStyles[variant], style]}>{children}</View>;
  }
  return (
    <PressableScale
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[styles.base, variantStyles[variant], style]}
      pressedStyle={styles.pressed}>
      {children}
    </PressableScale>
  );
}
