import { Text, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { animation } from '@/constants/animation';

import { dotColors, styles } from './WeekStrip.styles';
import type { WeekStripProps } from './WeekStrip.types';

export function WeekStrip({ days }: WeekStripProps) {
  return (
    <View style={styles.row}>
      {days.map((day, i) => (
        <View key={day.key} style={[styles.day, day.isToday && styles.today]} accessibilityLabel={`${day.label} ${day.activity}`}>
          <Text style={styles.label}>{day.label}</Text>
          <Animated.View
            entering={ZoomIn.delay(i * animation.stagger).springify()}
            style={[styles.dot, { backgroundColor: dotColors[day.activity] }]}
          />
        </View>
      ))}
    </View>
  );
}
