import { Pressable, Text, View } from 'react-native';

import { styles } from './SectionHeader.styles';
import type { SectionHeaderProps } from './SectionHeader.types';

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title} accessibilityRole="header">{title}</Text>
      {actionLabel && onAction ? (
        <Pressable accessibilityRole="link" onPress={onAction} hitSlop={8} style={styles.action}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
