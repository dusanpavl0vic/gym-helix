import { Text, View } from 'react-native';

import { IconButton } from '@/components/ui/IconButton';
import { ProgressBar } from '@/components/ui/ProgressBar';

import { styles } from './WorkoutHeader.styles';
import type { WorkoutHeaderProps } from './WorkoutHeader.types';

export function WorkoutHeader({ title, subtitle, elapsed, progress, closeLabel, onClose }: WorkoutHeaderProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <IconButton glyph="✕" onPress={onClose} accessibilityLabel={closeLabel} />
        <View style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.elapsed} accessibilityLabel={elapsed}>{elapsed}</Text>
      </View>
      <ProgressBar progress={progress} />
    </View>
  );
}
