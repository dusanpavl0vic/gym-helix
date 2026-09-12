import { Text, View } from 'react-native';

import { styles } from './RecordCard.styles';
import type { RecordCardProps } from './RecordCard.types';

export function RecordCard({ title, heaviest, heaviestLabel, e1rm, e1rmLabel }: RecordCardProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.value} adjustsFontSizeToFit numberOfLines={1}>{heaviest}</Text>
          <Text style={styles.label}>{heaviestLabel}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.value} adjustsFontSizeToFit numberOfLines={1}>{e1rm}</Text>
          <Text style={styles.label}>{e1rmLabel}</Text>
        </View>
      </View>
    </View>
  );
}
