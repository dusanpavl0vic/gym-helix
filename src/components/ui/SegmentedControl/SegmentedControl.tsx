import { Pressable, Text, View } from 'react-native';

import { styles } from './SegmentedControl.styles';
import type { SegmentedControlProps } from './SegmentedControl.types';

export function SegmentedControl({ items, selectedKey, onSelect }: SegmentedControlProps) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {items.map((item) => {
        const selected = item.key === selectedKey;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onSelect(item.key)}
            style={[styles.item, selected && styles.selected]}>
            <Text style={[styles.label, selected && styles.labelSelected]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
