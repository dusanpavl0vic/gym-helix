import { addMonths, endOfMonth, isSameMonth, startOfMonth } from 'date-fns';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CARDIO_ICONS } from '@/constants/cardio';
import type { IconName } from '@/constants/icons';
import { routes } from '@/constants/routes';
import { selectCardioEntries } from '@/features/cardio/store/cardioSelectors';
import { useFormatters } from '@/hooks/useFormatters';
import { useAppSelector } from '@/store/hooks';
import { dateForWeekday, isSameDayIso } from '@/utils/date';
import { formatWeight } from '@/utils/number';

import { sessionDurationMin } from '../helpers/analytics';
import { sessionSetCount, sessionVolumeKg } from '../logic/volume';
import { selectSessions } from '../store/historySelectors';

const DAYS_IN_WEEK = 7;

interface HistoryItemView {
  key: string;
  date: string;
  dateLabel: string;
  title: string;
  meta: string;
  icon: IconName;
  onPress?: () => void;
}

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

    const items: HistoryItemView[] = [
      ...monthSessions.filter((s) => dayFilter(s.startedAt)).map((s) => ({
        key: s.id,
        date: s.startedAt,
        dateLabel: fmt.shortDate(s.startedAt),
        title: s.workoutName,
        meta: t('progress:history.sessionMeta', { sets: sessionSetCount(s), minutes: sessionDurationMin(s), volume: (sessionVolumeKg(s) / 1000).toFixed(1) }),
        icon: 'workout' as IconName,
        onPress: () => router.push(routes.session(s.id)),
      })),
      ...monthCardio.filter((c) => dayFilter(c.date)).map((c) => ({
        key: c.id,
        date: c.date,
        dateLabel: fmt.shortDate(c.date),
        title: t(`common:cardioTypes.${c.type}`),
        meta: c.distanceKm
          ? t('progress:history.cardioMetaDistance', { minutes: c.durationMin, distance: formatWeight(c.distanceKm) })
          : t('progress:history.cardioMeta', { minutes: c.durationMin }),
        icon: CARDIO_ICONS[c.type],
      })),
    ].sort((a, b) => b.date.localeCompare(a.date));

    return {
      monthLabel: fmt.monthTitle(month),
      days,
      firstWeekday: (month.getDay() + DAYS_IN_WEEK - 1) % DAYS_IN_WEEK,
      weekdayLabels: Array.from({ length: DAYS_IN_WEEK }, (_, i) => fmt.weekdayShort(dateForWeekday(i + 1))),
      selectedDay,
      selectDay: (day: Date) => setSelectedDay((current) => (current && current.getTime() === day.getTime() ? null : day)),
      prevMonth: () => {
        setMonth((m) => addMonths(m, -1));
        setSelectedDay(null);
      },
      nextMonth: () => {
        setMonth((m) => addMonths(m, 1));
        setSelectedDay(null);
      },
      items,
    };
  }, [sessions, cardio, month, selectedDay, fmt, router, t]);
}
