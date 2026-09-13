import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';
import { Icon } from '@/components/ui/Icon';

import { styles } from './WeightCard.styles';
import type { WeightCardProps } from './WeightCard.types';

export function WeightCard({ title, value, unitLabel, caption, delta, addLabel, onPress }: WeightCardProps) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={value ? `${title} ${value} ${unitLabel}` : title} style={styles.card} pressedStyle={styles.pressed}>
      <View style={styles.header}>
        <View style={styles.iconTile}>
          <Icon name="weight" size={20} color="forest" />
        </View>
        <Icon name="plus" size={20} color="forest" />
      </View>
      {value ? (
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.unit}>{unitLabel}</Text>
        </View>
      ) : (
        <Text style={styles.add}>{title}</Text>
      )}
      <Text style={styles.caption} numberOfLines={2}>{value ? caption : addLabel}</Text>
      {delta ? <Text style={styles.delta}>{delta}</Text> : null}
    </PressableScale>
  );
}
