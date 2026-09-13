import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';
import { CARDIO_ICONS, CARDIO_TYPES } from '@/constants/cardio';

import { styles } from './CardioTypePicker.styles';
import type { CardioTypePickerProps } from './CardioTypePicker.types';

export function CardioTypePicker({ value, labels, onChange }: CardioTypePickerProps) {
  return (
    <View style={styles.grid} accessibilityRole="radiogroup">
      {CARDIO_TYPES.map((type) => {
        const selected = type === value;
        return (
          <Pressable key={type} accessibilityRole="radio" accessibilityState={{ selected }} accessibilityLabel={labels[type]} onPress={() => onChange(type)} style={[styles.option, selected && styles.selected]}>
            <Icon name={CARDIO_ICONS[type]} size={24} color={selected ? 'lime' : 'forest'} />
            <Text style={[styles.label, selected && styles.labelSelected]}>{labels[type]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
