import { Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';

import { styles } from './Celebration.styles';
import type { CelebrationProps } from './Celebration.types';

const CHECK_ICON = 52;

export function Celebration({ label }: CelebrationProps) {
  return (
    <View style={styles.wrap} accessibilityLabel={label}>
      <View style={styles.badge}>
        <Icon name="check" size={CHECK_ICON} color="lime" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
