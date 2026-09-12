import { useMemo } from 'react';

import { WEEK_DAYS } from '@/constants/training';
import { selectCardioEntries } from '@/features/cardio/store/cardioSelectors';
import { selectSessions } from '@/features/progress/store/historySelectors';
import { useFormatters } from '@/hooks/useFormatters';
import { useAppSelector } from '@/store/hooks';
import { isSameDayIso, lastNDays } from '@/utils/date';

export type DayActivity = 'strength' | 'cardio' | 'none';

export interface WeekDay {
  key: string;
  label: string;
  activity: DayActivity;
  isToday: boolean;
}

export function useWeekActivity(): WeekDay[] {
  const sessions = useAppSelector(selectSessions);
  const cardio = useAppSelector(selectCardioEntries);
  const { weekdayShort } = useFormatters();

  return useMemo(() => {
    const days = lastNDays(WEEK_DAYS);
    return days.map((day, i) => {
      const strength = sessions.some((s) => isSameDayIso(s.startedAt, day));
      const didCardio = cardio.some((c) => isSameDayIso(c.date, day));
      return {
        key: day.toISOString(),
        label: weekdayShort(day),
        activity: strength ? 'strength' : didCardio ? 'cardio' : 'none',
        isToday: i === days.length - 1,
      };
    });
  }, [sessions, cardio, weekdayShort]);
}
