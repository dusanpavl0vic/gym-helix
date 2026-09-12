import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MUSCLE_GROUPS } from '@/constants/muscles';
import { PROGRESS_DELTA_DAYS, VOLUME_WEEKS } from '@/constants/training';
import { selectCardioEntries } from '@/features/cardio/store/cardioSelectors';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { useFormatters } from '@/hooks/useFormatters';
import { useAppSelector } from '@/store/hooks';

import {
  personalRecords, sessionDurationMin, setsPerMuscle, totalSets, volumeInLastDays,
  weeklyCardioMinutes, weeklySessionCount, weeklyVolumeBuckets,
} from '../helpers/analytics';
import { selectSessions } from '../store/historySelectors';

const PR_LIMIT = 4;
const DURATION_POINTS = 20;
export const MUSCLE_TARGET = { min: 12, max: 16 };

export function useOverviewStats() {
  const { t } = useTranslation(['progress', 'common']);
  const fmt = useFormatters();
  const sessions = useAppSelector(selectSessions);
  const cardio = useAppSelector(selectCardioEntries);
  const { exercises, nameOf } = useExerciseLookup();

  return useMemo(() => {
    const weekLabel = (i: number) => t('progress:weekLabel', { n: i + 1 });
    const weekTooltip = (d: Date) => fmt.dayMonth(d.toISOString());
    const toBars = (buckets: { weekStart: Date; value: number }[]) =>
      buckets.map((b, i) => ({ key: b.weekStart.toISOString(), label: weekLabel(i), value: b.value, tooltipLabel: weekTooltip(b.weekStart) }));

    const records = personalRecords(sessions).slice(0, PR_LIMIT).map((r) => ({
      key: r.exerciseId,
      label: nameOf(r.exerciseId).toUpperCase(),
      value: fmt.weight(r.weightKg),
      note: `× ${r.reps} · ${fmt.dayMonth(r.date)}`,
    }));

    const muscles = setsPerMuscle(sessions, exercises);
    const durations = [...sessions]
      .filter((s) => s.finishedAt)
      .slice(0, DURATION_POINTS)
      .reverse()
      .map((s) => ({ x: new Date(s.startedAt).getTime(), y: sessionDurationMin(s) }));
    const avgDuration = durations.length ? Math.round(durations.reduce((sum, p) => sum + p.y, 0) / durations.length) : 0;

    return {
      hasData: sessions.length > 0,
      totals: [
        { key: 'sessions', value: String(sessions.length), label: t('progress:sessionsTotal') },
        { key: 'sets', value: String(totalSets(sessions)), label: t('progress:setsTotal') },
        { key: 'duration', value: avgDuration ? `${avgDuration}` : t('common:none'), label: `${t('common:units.min')} · ${t('progress:avgDuration')}` },
      ],
      records,
      volume30: fmt.tonnes(volumeInLastDays(sessions, PROGRESS_DELTA_DAYS)),
      weeklyVolume: toBars(weeklyVolumeBuckets(sessions, VOLUME_WEEKS)),
      weeklySessions: toBars(weeklySessionCount(sessions, VOLUME_WEEKS)),
      weeklyCardio: toBars(weeklyCardioMinutes(cardio, VOLUME_WEEKS)),
      muscles: MUSCLE_GROUPS.map((m) => ({ key: m, label: t(`common:muscles.${m}`), value: Math.round(muscles[m] * 10) / 10 })),
      durations,
    };
  }, [sessions, cardio, exercises, nameOf, fmt, t]);
}
