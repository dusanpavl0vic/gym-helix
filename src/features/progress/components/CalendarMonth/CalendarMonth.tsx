import { isToday } from 'date-fns';
import { Pressable, Text, View } from 'react-native';

import { IconButton } from '@/components/ui/IconButton';

import { styles } from './CalendarMonth.styles';
import type { CalendarMonthProps } from './CalendarMonth.types';

export function CalendarMonth({ monthLabel, weekdayLabels, firstWeekday, days, selectedDay, onSelectDay, onPrev, onNext, prevLabel, nextLabel }: CalendarMonthProps) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <IconButton glyph="‹" onPress={onPrev} accessibilityLabel={prevLabel} />
        <Text style={styles.month}>{monthLabel}</Text>
        <IconButton glyph="›" onPress={onNext} accessibilityLabel={nextLabel} />
      </View>
      <View style={styles.grid}>
        {weekdayLabels.map((label) => (
          <View key={label} style={[styles.cell, { aspectRatio: 2 }]}>
            <Text style={styles.weekday}>{label}</Text>
          </View>
        ))}
        {Array.from({ length: firstWeekday }, (_, i) => (
          <View key={`pad-${i}`} style={styles.cell} />
        ))}
        {days.map((day) => {
          const selected = selectedDay?.getTime() === day.date.getTime();
          return (
            <Pressable
              key={day.date.toISOString()}
              style={styles.cell}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onSelectDay(day.date)}>
              <View style={[styles.dayBox, selected && styles.daySelected, isToday(day.date) && styles.today]}>
                <Text style={styles.dayText}>{day.date.getDate()}</Text>
                <View style={styles.dots}>
                  {day.strength ? <View style={[styles.dot, styles.strength]} /> : null}
                  {day.cardio ? <View style={[styles.dot, styles.cardio]} /> : null}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
