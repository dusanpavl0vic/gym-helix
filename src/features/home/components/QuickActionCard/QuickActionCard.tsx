import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';
import { Icon } from '@/components/ui/Icon';

import { styles } from './QuickActionCard.styles';
import type { QuickActionCardProps } from './QuickActionCard.types';

export function QuickActionCard({ title, hint, icon, onPress }: QuickActionCardProps) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={title} style={styles.card} pressedStyle={styles.pressed}>
      <View style={styles.iconTile}>
        <Icon name={icon} size={20} color="forest" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </PressableScale>
  );
}
