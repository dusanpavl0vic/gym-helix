import { Pressable, ScrollView, Text } from 'react-native';

import { styles } from './PillTabs.styles';
import type { PillTabsProps } from './PillTabs.types';

export function PillTabs({ items, selectedKey, onSelect, size = 'md' }: PillTabsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {items.map((item) => {
        const selected = item.key === selectedKey;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onSelect(item.key)}
            style={[styles.pill, size === 'sm' && styles.pillSm, selected ? styles.selected : styles.idle]}>
            <Text style={[styles.label, size === 'sm' && styles.labelSm, selected ? styles.labelSelected : styles.labelIdle]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
