import { Pressable, Text, View } from 'react-native';

import { Icon } from '../Icon';
import { styles } from './RadioList.styles';
import type { RadioListProps } from './RadioList.types';

export function RadioList({ items, selectedKey, onSelect }: RadioListProps) {
  return (
    <View style={styles.list} accessibilityRole="radiogroup">
      {items.map((item) => {
        const selected = item.key === selectedKey;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={item.label}
            onPress={() => onSelect(item.key)}
            style={[styles.row, selected && styles.rowSelected]}>
            {item.icon ? <Icon name={item.icon} size={22} color={selected ? 'forest' : 'muted'} /> : null}
            <View style={styles.texts}>
              <Text style={styles.label}>{item.label}</Text>
              {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
            </View>
            <View style={[styles.radio, selected && styles.radioSelected]}>{selected ? <View style={styles.dot} /> : null}</View>
          </Pressable>
        );
      })}
    </View>
  );
}
