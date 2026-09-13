import { Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { ProgressBar } from '@/components/ui/ProgressBar';

import { styles } from './WorkoutHeader.styles';
import type { WorkoutHeaderProps } from './WorkoutHeader.types';

const TIMER_ICON = 16;

export function WorkoutHeader({ title, subtitle, elapsed, progress, closeLabel, onClose }: WorkoutHeaderProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <IconButton icon="close" onPress={onClose} accessibilityLabel={closeLabel} />
        <View style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
        </View>
        <View style={styles.elapsed} accessibilityLabel={elapsed}>
          <Icon name="timer" size={TIMER_ICON} color="forest" />
          <Text style={styles.elapsedText}>{elapsed}</Text>
        </View>
      </View>
      <ProgressBar progress={progress} />
    </View>
  );
}
