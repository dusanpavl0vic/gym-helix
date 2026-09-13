import { Pressable, Text } from 'react-native';
import { View } from 'react-native';

import { Icon } from '@/components/ui/Icon';

import { styles } from './ValueControl.styles';
import type { ValueControlProps } from './ValueControl.types';

const STEP_ICON = 26;

export function ValueControl({ label, valueText, placeholder, unitLabel, decrementLabel, incrementLabel, onDecrement, onIncrement, onPressValue }: ValueControlProps) {
  const empty = valueText === '';
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`${decrementLabel} ${label}`} onPress={onDecrement} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Icon name="minus" size={STEP_ICON} color="forest" />
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={`${label} ${valueText || placeholder}`} onPress={onPressValue} style={({ pressed }) => [styles.value, pressed && styles.valuePressed]}>
        {empty ? <Text style={styles.placeholder}>{placeholder}</Text> : <Text style={styles.valueText}>{valueText}</Text>}
        {!empty && unitLabel ? <Text style={styles.unit}>{unitLabel}</Text> : null}
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={`${incrementLabel} ${label}`} onPress={onIncrement} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Icon name="plus" size={STEP_ICON} color="forest" />
      </Pressable>
    </View>
  );
}
