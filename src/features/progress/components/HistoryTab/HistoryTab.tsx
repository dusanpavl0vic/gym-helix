import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { EmptyState } from '@/components/common/EmptyState';
import { ListItem } from '@/components/common/ListItem';

import { useHistoryCalendar } from '../../hooks/useHistoryCalendar';
import { CalendarMonth } from '../CalendarMonth';
import { styles } from './HistoryTab.styles';

export function HistoryTab() {
  const { t } = useTranslation(['progress', 'common']);
  const calendar = useHistoryCalendar();

  return (
    <View style={styles.wrap}>
      <CalendarMonth
        monthLabel={calendar.monthLabel}
        weekdayLabels={calendar.weekdayLabels}
        firstWeekday={calendar.firstWeekday}
        days={calendar.days}
        selectedDay={calendar.selectedDay}
        onSelectDay={calendar.selectDay}
        onPrev={calendar.prevMonth}
        onNext={calendar.nextMonth}
        prevLabel={t('common:back')}
        nextLabel={t('common:confirm')}
      />
      <View style={styles.list}>
        {calendar.items.length === 0 ? <EmptyState message={t('progress:history.empty')} /> : null}
        {calendar.items.map((item, i) => (
          <AnimatedEntry key={item.key} index={i}>
            <ListItem title={item.title} subtitle={`${item.dateLabel} · ${item.meta}`} onPress={item.onPress} />
          </AnimatedEntry>
        ))}
      </View>
    </View>
  );
}
