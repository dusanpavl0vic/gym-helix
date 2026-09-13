import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';
import { Icon } from '@/components/ui/Icon';
import { metrics } from '@/constants/metrics';
import { ExerciseImage } from '@/features/exercises/components/ExerciseImage';

import { styles } from './PlanExerciseItem.styles';
import type { PlanExerciseItemProps } from './PlanExerciseItem.types';

const REST_ICON = 14;

export function PlanExerciseItem({ exercise, name, scheme, rest, note, placeholderLabel, onPress }: PlanExerciseItemProps) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={name} style={styles.row} pressedStyle={styles.pressed}>
      <ExerciseImage exercise={exercise} size={metrics.thumb} placeholderLabel={placeholderLabel} />
      <View style={styles.texts}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.scheme}>{scheme}</Text>
        <View style={styles.restRow}>
          <Icon name="timer" size={REST_ICON} color="forest" />
          <Text style={styles.rest}>{rest}</Text>
        </View>
        {note ? <Text style={styles.note}>{note}</Text> : null}
      </View>
      <Icon name="chevron-right" size={20} color="mutedLight" />
    </PressableScale>
  );
}
