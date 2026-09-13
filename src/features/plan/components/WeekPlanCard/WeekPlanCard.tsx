import { Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';

import { styles } from './WeekPlanCard.styles';
import type { WeekPlanCardProps } from './WeekPlanCard.types';

const DAY_ICON = 20;

export function WeekPlanCard({ title, hint, tempo, days }: WeekPlanCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.hint}>{hint}</Text>
      {days.map((day) => (
        <View key={day.key} style={[styles.row, day.highlight && styles.rowHighlight]}>
          <Text style={styles.day}>{day.dayLabel}</Text>
          <Icon name={day.icon} size={DAY_ICON} color={day.muted ? 'muted' : 'forest'} />
          <Text style={[styles.dayTitle, day.muted && styles.dayTitleMuted]}>{day.title}</Text>
        </View>
      ))}
      {tempo ? <Text style={styles.tempo}>{tempo}</Text> : null}
    </View>
  );
}
