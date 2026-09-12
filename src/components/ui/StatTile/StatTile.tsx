import { Text, View } from 'react-native';

import { styles } from './StatTile.styles';
import type { StatTileProps } from './StatTile.types';

export function StatTile({ value, label, variant = 'paper', note }: StatTileProps) {
  if (variant === 'forest') {
    return (
      <View style={styles.forest}>
        <Text style={styles.labelForest} numberOfLines={1}>{label}</Text>
        <Text style={styles.valueForest} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
        {note ? <Text style={styles.note} numberOfLines={1}>{note}</Text> : null}
      </View>
    );
  }
  return (
    <View style={styles.paper}>
      <Text style={styles.valuePaper} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
      <Text style={styles.labelPaper} numberOfLines={2}>{label}</Text>
    </View>
  );
}
