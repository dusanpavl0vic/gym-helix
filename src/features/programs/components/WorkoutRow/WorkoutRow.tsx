import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';
import { IconButton } from '@/components/ui/IconButton';

import { styles } from './WorkoutRow.styles';
import type { WorkoutRowProps } from './WorkoutRow.types';

export function WorkoutRow({ badge, name, meta, canMoveUp, canMoveDown, labels, onOpen, onMoveUp, onMoveDown, onDelete }: WorkoutRowProps) {
  return (
    <View style={styles.row}>
      <PressableScale onPress={onOpen} accessibilityLabel={name} style={styles.main}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
        <View style={styles.texts}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.meta}>{meta}</Text>
        </View>
      </PressableScale>
      <View style={styles.controls}>
        {canMoveUp ? <IconButton glyph="↑" onPress={onMoveUp} accessibilityLabel={labels.moveUp} variant="mint" /> : null}
        {canMoveDown ? <IconButton glyph="↓" onPress={onMoveDown} accessibilityLabel={labels.moveDown} variant="mint" /> : null}
        <IconButton glyph="✕" onPress={onDelete} accessibilityLabel={labels.delete} />
      </View>
    </View>
  );
}
