import { Text, View } from 'react-native';

import { styles } from './ChartCard.styles';
import type { ChartCardProps } from './ChartCard.types';

export function ChartCard({ title, value, hint, children }: ChartCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Text style={styles.title}>{title}</Text>
        {value ? <Text style={styles.value}>{value}</Text> : null}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      {children}
    </View>
  );
}
