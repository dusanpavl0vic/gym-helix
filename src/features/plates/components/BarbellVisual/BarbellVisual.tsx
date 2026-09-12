import { Text, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { animation } from '@/constants/animation';
import { formatWeight } from '@/utils/number';

import { plateColor, styles } from './BarbellVisual.styles';
import type { BarbellVisualProps } from './BarbellVisual.types';

const MAX_PLATE_HEIGHT = 140;
const MIN_PLATE_HEIGHT = 44;

export function BarbellVisual({ plates }: BarbellVisualProps) {
  const heightFor = (kg: number) => MIN_PLATE_HEIGHT + (MAX_PLATE_HEIGHT - MIN_PLATE_HEIGHT) * Math.min(1, kg / 25);
  return (
    <View style={styles.wrap} accessibilityLabel={plates.map(formatWeight).join(', ')}>
      <View style={[styles.bar, { width: 40 }]} />
      <View style={styles.collar} />
      <View style={styles.plates}>
        {plates.map((kg, i) => (
          <Animated.View
            key={`${kg}-${i}`}
            entering={ZoomIn.delay(i * animation.stagger).springify()}
            style={[styles.plate, { height: heightFor(kg), backgroundColor: plateColor(kg) }]}>
            <Text style={styles.plateText} numberOfLines={1}>{formatWeight(kg)}</Text>
          </Animated.View>
        ))}
      </View>
      <View style={styles.sleeve} />
    </View>
  );
}
