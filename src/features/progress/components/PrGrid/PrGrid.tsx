import { View } from 'react-native';

import { StatTile } from '@/components/ui/StatTile';

import { styles } from './PrGrid.styles';
import type { PrGridProps } from './PrGrid.types';

export function PrGrid({ items }: PrGridProps) {
  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <View key={item.key} style={styles.cell}>
          <StatTile variant="forest" label={item.label} value={item.value} note={item.note} />
        </View>
      ))}
    </View>
  );
}
