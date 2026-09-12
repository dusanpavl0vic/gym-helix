import { View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { StatTile } from '@/components/ui/StatTile';
import { animation } from '@/constants/animation';

import { styles } from './PrGrid.styles';
import type { PrGridProps } from './PrGrid.types';

export function PrGrid({ items }: PrGridProps) {
  return (
    <View style={styles.grid}>
      {items.map((item, i) => (
        <Animated.View key={item.key} entering={ZoomIn.delay(i * animation.stagger).springify()} style={styles.cell}>
          <StatTile variant="forest" label={item.label} value={item.value} note={item.note} />
        </Animated.View>
      ))}
    </View>
  );
}
