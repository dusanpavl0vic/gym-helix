import { View } from 'react-native';

import { clamp } from '@/utils/number';

import { styles } from './ProgressBar.styles';
import type { ProgressBarProps } from './ProgressBar.types';

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.track} accessibilityRole="progressbar">
      <View style={[styles.fill, { width: `${clamp(progress, 0, 1) * 100}%` }]} />
    </View>
  );
}
