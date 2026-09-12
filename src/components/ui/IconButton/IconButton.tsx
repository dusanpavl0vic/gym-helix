import { Pressable, Text } from 'react-native';

import { styles } from './IconButton.styles';
import type { IconButtonProps } from './IconButton.types';

export function IconButton({ glyph, onPress, accessibilityLabel, variant = 'paper', style }: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={4}
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}>
      <Text style={styles.glyph}>{glyph}</Text>
    </Pressable>
  );
}
