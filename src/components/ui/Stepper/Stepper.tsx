import { Pressable, Text, View } from 'react-native';

import { clamp } from '@/utils/number';

import { Icon } from '../Icon';
import { NumberInput } from '../NumberInput';
import { styles } from './Stepper.styles';
import type { StepperProps } from './Stepper.types';

export function Stepper({ value, onChange, step, min = 0, max = Infinity, decimal, label, compact }: StepperProps) {
  const change = (delta: number) => onChange(clamp(Math.round((value + delta) * 100) / 100, min, max));

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label} numberOfLines={1}>{label.toUpperCase()}</Text> : null}
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`− ${step}`}
          onPress={() => change(-step)}
          style={({ pressed }) => [styles.button, compact && styles.buttonCompact, pressed && styles.buttonPressed]}>
          <Icon name="minus" size={20} color="forest" />
        </Pressable>
        <NumberInput value={value} decimal={decimal} min={min} max={max} accessibilityLabel={label} onChange={(v) => onChange(v ?? min)} style={styles.input} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`+ ${step}`}
          onPress={() => change(step)}
          style={({ pressed }) => [styles.button, compact && styles.buttonCompact, pressed && styles.buttonPressed]}>
          <Icon name="plus" size={20} color="forest" />
        </Pressable>
      </View>
    </View>
  );
}
