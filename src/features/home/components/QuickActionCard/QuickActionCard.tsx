import { Text } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';

import { styles } from './QuickActionCard.styles';
import type { QuickActionCardProps } from './QuickActionCard.types';

export function QuickActionCard({ title, hint, glyph, onPress }: QuickActionCardProps) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={title} style={styles.card} pressedStyle={styles.pressed}>
      <Text style={styles.glyph}>{glyph}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </PressableScale>
  );
}
