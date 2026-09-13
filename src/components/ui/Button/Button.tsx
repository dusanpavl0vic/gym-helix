import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';

import { Icon } from '../Icon';
import { LABEL_COLORS, labelStyles, styles, variantStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

const ICON_SIZE = { md: 20, lg: 22 } as const;

export function Button({ label, onPress, variant = 'primary', size = 'md', icon, disabled, flex, style, accessibilityLabel }: ButtonProps) {
  return (
    <PressableScale
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled}
      onPress={onPress}
      style={[styles.base, variantStyles[variant], size === 'lg' && styles.lg, flex !== undefined && { flex }, style]}
      pressedStyle={styles.pressed}>
      <View style={styles.row}>
        {icon ? <Icon name={icon} size={ICON_SIZE[size]} color={LABEL_COLORS[variant]} /> : null}
        <Text style={labelStyles[variant]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>
          {label}
        </Text>
      </View>
    </PressableScale>
  );
}
