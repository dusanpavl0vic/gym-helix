import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

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
        prevLabel={t('progress:history.prevMonth')}
        nextLabel={t('progress:history.nextMonth')}
        legend={{ strength: t('progress:history.legendStrength'), cardio: t('progress:history.legendCardio') }}
      />
      <View style={styles.list}>
        {calendar.items.length === 0 ? <EmptyState message={t('progress:history.empty')} /> : null}
        {calendar.items.map((item) => (
          <ListItem key={item.key} icon={item.icon} title={item.title} subtitle={`${item.dateLabel} · ${item.meta}`} onPress={item.onPress} />
        ))}
      </View>
    </View>
  );
}
