import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PROGRESS_DELTA_DAYS } from '@/constants/training';
import { useFormatters } from '@/hooks/useFormatters';
import { useAppSelector } from '@/store/hooks';
import { formatWeight } from '@/utils/number';

import { exerciseSeries, metricDelta, type ExerciseMetric } from '../helpers/analytics';
import { selectSessions } from '../store/historySelectors';

export const EXERCISE_METRICS: ExerciseMetric[] = ['topWeight', 'e1rm', 'volume', 'reps'];

export function useExerciseProgress(exerciseId: string, exerciseName: string) {
  const { t } = useTranslation('progress');
  const fmt = useFormatters();
  const sessions = useAppSelector(selectSessions);
  const [metric, setMetric] = useState<ExerciseMetric>('topWeight');

  const series = useMemo(() => exerciseSeries(sessions, exerciseId), [sessions, exerciseId]);
  const isWeight = metric === 'topWeight' || metric === 'e1rm';
  const unit = metric === 'reps' ? '' : isWeight ? fmt.unitLabel : fmt.unitLabel;

  const delta = metricDelta(series, metric, PROGRESS_DELTA_DAYS);
  const deltaLabel =
    delta === undefined ? undefined : t('delta', { value: `${delta > 0 ? '+' : ''}${formatWeight(delta)}`, unit });

  return {
    metric,
    setMetric,
    metrics: EXERCISE_METRICS.map((m) => ({ key: m, label: t(`metrics.${m}`) })),
    title: t(`metricTitles.${metric}`, { name: exerciseName }),
    deltaLabel,
    points: series.map((p) => ({ x: new Date(p.date).getTime(), y: p[metric] })),
    formatY: (v: number) => (metric === 'volume' ? `${Math.round(v / 100) / 10}t` : formatWeight(Math.round(v * 10) / 10)),
    formatX: (x: number) => fmt.dayMonth(new Date(x).toISOString()),
    rows: [...series].reverse().map((p) => ({
      id: p.sessionId,
      date: fmt.shortDate(p.date),
      value: metric === 'volume' ? fmt.tonnes(p[metric]) : metric === 'reps' ? String(p.reps) : fmt.weight(p[metric]),
      detail: `${p.sets} × · ${fmt.weight(p.topWeight)} × ${p.topReps}`,
    })),
    emptyLabel: t('chartEmpty'),
  };
}
