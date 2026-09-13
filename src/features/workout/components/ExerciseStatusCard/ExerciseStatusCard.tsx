import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';
import { Icon } from '@/components/ui/Icon';
import { metrics } from '@/constants/metrics';
import { ExerciseImage } from '@/features/exercises/components/ExerciseImage';

import { STATUS_APPEARANCE, styles } from './ExerciseStatusCard.styles';
import type { ExerciseStatusCardProps } from './ExerciseStatusCard.types';

const STATUS_ICON = 24;

export function ExerciseStatusCard({ exercise, name, scheme, detail, status, progressLabel, placeholderLabel, onPress }: ExerciseStatusCardProps) {
  const appearance = STATUS_APPEARANCE[status];
  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={`${name}, ${progressLabel}`}
      style={[styles.card, status === 'done' && styles.cardDone]}
      pressedStyle={styles.pressed}>
      <ExerciseImage exercise={exercise} size={metrics.thumb} placeholderLabel={placeholderLabel} />
      <View style={styles.texts}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.scheme} numberOfLines={1}>{scheme}</Text>
        <Text style={styles.detail} numberOfLines={2}>{detail}</Text>
      </View>
      <View style={styles.status}>
        <Icon name={appearance.icon} size={STATUS_ICON} color={appearance.color} />
        <Text style={styles.progress}>{progressLabel}</Text>
      </View>
    </PressableScale>
  );
}
