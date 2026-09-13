import { Text, View } from 'react-native';

import { dotColors, styles } from './WeekStrip.styles';
import type { WeekStripProps } from './WeekStrip.types';

export function WeekStrip({ days }: WeekStripProps) {
  return (
    <View style={styles.row}>
      {days.map((day) => (
        <View key={day.key} style={[styles.day, day.isToday && styles.today]} accessibilityLabel={`${day.label} ${day.activity}`}>
          <Text style={styles.label}>{day.label}</Text>
          <View style={[styles.dot, { backgroundColor: dotColors[day.activity] }]} />
        </View>
      ))}
    </View>
  );
}
