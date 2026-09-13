import { Text, View } from 'react-native';

import { Chip } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { ExerciseImage } from '@/features/exercises/components/ExerciseImage';

import { IMAGE_SIZE, styles } from './ExerciseInfoHeader.styles';
import type { ExerciseInfoHeaderProps } from './ExerciseInfoHeader.types';

const NOTE_ICON = 16;

export function ExerciseInfoHeader({
  exercise, name, scheme, note, lastTime, suggestion, tone, substitutedLabel, deloadLabel, skippedLabel, placeholderLabel,
}: ExerciseInfoHeaderProps) {
  const toneStyle = tone === 'increase' ? styles.increase : tone === 'decrease' ? styles.decrease : styles.neutral;
  return (
    <View style={styles.wrap}>
      <View style={styles.top}>
        <ExerciseImage exercise={exercise} size={IMAGE_SIZE} placeholderLabel={placeholderLabel} />
        <View style={styles.texts}>
          {deloadLabel ? <Chip label={deloadLabel} variant="lime" /> : null}
          <Text style={styles.name}>{name}</Text>
          {substitutedLabel ? <Text style={styles.substituted}>{substitutedLabel}</Text> : null}
          <Text style={styles.scheme}>{scheme}</Text>
        </View>
      </View>
      {note ? (
        <View style={styles.noteRow}>
          <Icon name="info" size={NOTE_ICON} color="muted" />
          <Text style={styles.note}>{note}</Text>
        </View>
      ) : null}
      <View style={[styles.hint, toneStyle]}>
        {lastTime ? <Text style={styles.lastTime}>{lastTime}</Text> : null}
        <Text style={styles.suggestion}>{suggestion}</Text>
      </View>
      {skippedLabel ? <Text style={styles.skipped}>{skippedLabel}</Text> : null}
    </View>
  );
}
