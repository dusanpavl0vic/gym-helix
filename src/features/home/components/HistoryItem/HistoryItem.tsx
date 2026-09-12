import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';

import { styles } from './HistoryItem.styles';
import type { HistoryItemProps } from './HistoryItem.types';

export function HistoryItem({ badge, title, meta, value, onPress }: HistoryItemProps) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={`${title}, ${meta}`} style={styles.row} pressedStyle={styles.pressed}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.meta} numberOfLines={1}>{meta}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </PressableScale>
  );
}
