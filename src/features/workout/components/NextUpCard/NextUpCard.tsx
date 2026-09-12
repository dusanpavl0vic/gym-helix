import { Text, View } from 'react-native';

import { styles } from './NextUpCard.styles';
import type { NextUpCardProps } from './NextUpCard.types';

export function NextUpCard({ label, text }: NextUpCardProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
