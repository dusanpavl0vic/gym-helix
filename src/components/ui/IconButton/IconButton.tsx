import { PressableScale } from '@/components/common/PressableScale';

import { Icon } from '../Icon';
import { DEFAULT_ICON_COLOR, ICON_SIZE, styles } from './IconButton.styles';
import type { IconButtonProps } from './IconButton.types';

export function IconButton({ icon, onPress, accessibilityLabel, variant = 'paper', color, size = 'md', disabled, style }: IconButtonProps) {
  return (
    <PressableScale
      accessibilityLabel={accessibilityLabel}
      hitSlop={6}
      disabled={disabled}
      onPress={onPress}
      style={[styles[size], styles[variant], style]}
      pressedStyle={styles.pressed}>
      <Icon name={icon} size={ICON_SIZE[size]} color={color ?? DEFAULT_ICON_COLOR[variant]} />
    </PressableScale>
  );
}
