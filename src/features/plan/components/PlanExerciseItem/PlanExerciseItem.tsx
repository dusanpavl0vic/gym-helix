import { Text, View } from 'react-native';

import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { PressableScale } from '@/components/common/PressableScale';
import { metrics } from '@/constants/metrics';
import { ExerciseImage } from '@/features/exercises/components/ExerciseImage';

import { styles } from './PlanExerciseItem.styles';
import type { PlanExerciseItemProps } from './PlanExerciseItem.types';

export function PlanExerciseItem({ index, exercise, name, scheme, rest, note, placeholderLabel, onPress }: PlanExerciseItemProps) {
  return (
    <AnimatedEntry index={index}>
      <PressableScale onPress={onPress} accessibilityLabel={name} style={styles.row} pressedStyle={styles.pressed}>
        <ExerciseImage exercise={exercise} size={metrics.thumb} placeholderLabel={placeholderLabel} />
        <View style={styles.texts}>
          <Text style={styles.name} numberOfLines={2}>{name}</Text>
          <Text style={styles.scheme}>{scheme}</Text>
          <Text style={styles.rest}>{rest}</Text>
          {note ? <Text style={styles.note}>{note}</Text> : null}
        </View>
        <Text style={styles.chevron}>›</Text>
      </PressableScale>
    </AnimatedEntry>
  );
}
