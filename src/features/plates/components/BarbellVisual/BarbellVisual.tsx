import { Text, View } from 'react-native';

import { formatWeight } from '@/utils/number';

import { plateColor, styles } from './BarbellVisual.styles';
import type { BarbellVisualProps } from './BarbellVisual.types';

const MAX_PLATE_HEIGHT = 140;
const MIN_PLATE_HEIGHT = 44;
const HEAVIEST_PLATE_KG = 25;
const BAR_STUB_WIDTH = 40;

export function BarbellVisual({ plates }: BarbellVisualProps) {
  const heightFor = (kg: number) => MIN_PLATE_HEIGHT + (MAX_PLATE_HEIGHT - MIN_PLATE_HEIGHT) * Math.min(1, kg / HEAVIEST_PLATE_KG);
  return (
    <View style={styles.wrap} accessibilityLabel={plates.map(formatWeight).join(', ')}>
      <View style={[styles.bar, { width: BAR_STUB_WIDTH }]} />
      <View style={styles.collar} />
      <View style={styles.plates}>
        {plates.map((kg, i) => (
          <View key={`${kg}-${i}`} style={[styles.plate, { height: heightFor(kg), backgroundColor: plateColor(kg) }]}>
            <Text style={styles.plateText} numberOfLines={1}>{formatWeight(kg)}</Text>
          </View>
        ))}
      </View>
      <View style={styles.sleeve} />
    </View>
  );
}
