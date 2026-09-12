import { Text } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';

import { labelStyles, styles, variantStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

export function Button({ label, onPress, variant = 'primary', size = 'md', disabled, flex, style, accessibilityLabel }: ButtonProps) {
  return (
    <PressableScale
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled}
      onPress={onPress}
      style={[styles.base, variantStyles[variant], size === 'lg' && styles.lg, flex !== undefined && { flex }, style]}
      pressedStyle={styles.pressed}>
      <Text style={labelStyles[variant]} numberOfLines={1}>
        {label}
      </Text>
    </PressableScale>
  );
}
