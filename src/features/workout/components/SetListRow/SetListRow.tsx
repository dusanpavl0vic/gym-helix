import { Pressable, Text } from 'react-native';

import { Icon } from '@/components/ui/Icon';

import { styles } from './SetListRow.styles';
import type { SetListRowProps } from './SetListRow.types';

const STATUS_ICON = 22;

export function SetListRow({ label, value, done, selected, isNext, onPress }: SetListRowProps) {
  const icon = done ? 'status-done' : isNext ? 'status-partial' : 'status-todo';
  const color = done ? 'forest' : isNext ? 'lime' : 'mutedLight';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${label}, ${value}`}
      onPress={onPress}
      style={[styles.row, selected && styles.selected]}>
      <Icon name={icon} size={STATUS_ICON} color={color} />
      <Text style={[styles.label, done && !selected && styles.labelDone]}>{label}</Text>
      <Text style={[styles.value, done && !selected && styles.valueDone]}>{value}</Text>
    </Pressable>
  );
}
