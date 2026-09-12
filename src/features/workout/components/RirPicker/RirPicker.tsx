import { Pressable, Text, View } from 'react-native';

import { RIR_OPTIONS } from '@/constants/training';

import { styles } from './RirPicker.styles';
import type { RirPickerProps } from './RirPicker.types';

export function RirPicker({ label, value, onChange }: RirPickerProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <View style={styles.row}>
        {RIR_OPTIONS.map((option) => {
          const selected = value === option;
          return (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`${label} ${option}`}
              onPress={() => onChange(selected ? undefined : option)}
              style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
