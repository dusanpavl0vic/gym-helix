import { addMonths, endOfMonth, isSameMonth, startOfMonth } from 'date-fns';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { selectCardioEntries } from '@/features/cardio/store/cardioSelectors';
import { useFormatters } from '@/hooks/useFormatters';
import { useAppSelector } from '@/store/hooks';
import { isSameDayIso } from '@/utils/date';

import { sessionDurationMin } from '../helpers/analytics';
import { sessionSetCount, sessionVolumeKg } from '../logic/volume';
import { selectSessions } from '../store/historySelectors';

export function useHistoryCalendar() {
  const { t } = useTranslation(['progress', 'common']);
  const router = useRouter();
  const fmt = useFormatters();
  const sessions = useAppSelector(selectSessions);
  const cardio = useAppSelector(selectCardioEntries);
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  return useMemo(() => {
    const inMonth = (iso: string) => isSameMonth(new Date(iso), month);
    const monthSessions = sessions.filter((s) => inMonth(s.startedAt));
    const monthCardio = cardio.filter((c) => inMonth(c.date));
    const dayFilter = (iso: string) => !selectedDay || isSameDayIso(iso, selectedDay);

    const days = Array.from({ length: endOfMonth(month).getDate() }, (_, i) => {
      const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
      return {
        date,
        strength: monthSessions.some((s) => isSameDayIso(s.startedAt, date)),
        cardio: monthCardio.some((c) => isSameDayIso(c.date, date)),
      };
    });

    const items = [
      ...monthSessions.filter((s) => dayFilter(s.startedAt)).map((s) => ({
        key: s.id,
        date: s.startedAt,
        title: s.workoutName,
        meta: t('progress:history.sessionMeta', {
          sets: sessionSetCount(s),
          minutes: sessionDurationMin(s),
          volume: (sessionVolumeKg(s) / 1000).toFixed(1),
        }),
        onPress: () => router.push(routes.session(s.id)),
      })),
      ...monthCardio.filter((c) => dayFilter(c.date)).map((c) => ({
        key: c.id,
        date: c.date,
        title: t(`common:cardioTypes.${c.type}`),
        meta: t('progress:history.cardioMeta', { minutes: c.durationMin }),
        onPress: undefined,
      })),
    ]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((item) => ({ ...item, dateLabel: fmt.shortDate(item.date) }));

    return {
      monthLabel: fmt.monthTitle(month),
      days,
      firstWeekday: (month.getDay() + 6) % 7,
      weekdayLabels: Array.from({ length: 7 }, (_, i) => fmt.weekdayShort(new Date(2024, 0, 1 + i))),
      selectedDay,
      selectDay: (day: Date) => setSelectedDay((current) => (current && current.getTime() === day.getTime() ? null : day)),
      prevMonth: () => { setMonth((m) => addMonths(m, -1)); setSelectedDay(null); },
      nextMonth: () => { setMonth((m) => addMonths(m, 1)); setSelectedDay(null); },
      items,
    };
  }, [sessions, cardio, month, selectedDay, fmt, router, t]);
}
