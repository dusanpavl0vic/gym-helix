import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';
import { Chip } from '@/components/ui/Chip';

import { ExerciseImage } from '../ExerciseImage';
import { styles } from './ExerciseListItem.styles';
import type { ExerciseListItemProps } from './ExerciseListItem.types';

const THUMB = 48;

export function ExerciseListItem({ exercise, name, subtitle, badge, placeholderLabel, onPress }: ExerciseListItemProps) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={name} style={styles.row} pressedStyle={styles.pressed}>
      <ExerciseImage exercise={exercise} size={THUMB} placeholderLabel={placeholderLabel} />
      <View style={styles.texts}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
      </View>
      {badge ? <Chip label={badge} variant="lime" /> : null}
    </PressableScale>
  );
}
