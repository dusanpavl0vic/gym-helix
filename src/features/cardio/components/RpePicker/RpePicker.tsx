import { Pressable, Text, View } from 'react-native';

import { RPE_VALUES } from '@/constants/cardio';

import { styles } from './RpePicker.styles';
import type { RpePickerProps } from './RpePicker.types';

export function RpePicker({ label, hint, value, onChange }: RpePickerProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <View style={styles.grid} accessibilityRole="radiogroup">
        {RPE_VALUES.map((rpe) => {
          const selected = value === rpe;
          return (
            <Pressable key={rpe} accessibilityRole="radio" accessibilityState={{ selected }} accessibilityLabel={`${label} ${rpe}`} onPress={() => onChange(selected ? undefined : rpe)} style={[styles.value, selected && styles.selected]}>
              <Text style={[styles.text, selected && styles.textSelected]}>{rpe}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
}
