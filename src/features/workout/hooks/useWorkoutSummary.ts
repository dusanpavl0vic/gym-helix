import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { newRecordsIn } from '@/features/progress/helpers/analytics';
import { sessionSetCount, sessionVolumeKg } from '@/features/progress/logic/volume';
import { selectSessions } from '@/features/progress/store/historySelectors';
import { useFormatters } from '@/hooks/useFormatters';
import { successFeedback } from '@/lib/feedback/haptics';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { toSession } from '../helpers/toSession';
import { selectActiveSession } from '../store/activeSessionSelectors';
import { workoutFinished } from '../store/workoutThunks';

export function useWorkoutSummary() {
  const { t } = useTranslation(['workout', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fmt = useFormatters();
  const { nameOf } = useExerciseLookup();
  const active = useAppSelector(selectActiveSession);
  const history = useAppSelector(selectSessions);
  const [bodyweightKg, setBodyweightKg] = useState<number | undefined>();
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const preview = useMemo(() => (active ? toSession(active, new Date().toISOString(), {}) : undefined), [active]);

  const stats = preview
    ? [
        { key: 'duration', value: `${fmt.minutesBetween(preview.startedAt, preview.finishedAt)}`, label: `${t('common:units.min')} · ${t('workout:summary.duration')}` },
        { key: 'volume', value: fmt.tonnes(sessionVolumeKg(preview)), label: t('workout:summary.volume') },
        { key: 'sets', value: String(sessionSetCount(preview)), label: t('workout:summary.sets') },
      ]
    : [];

  const records = preview
    ? newRecordsIn(preview, history).map((r) => ({ key: r.exerciseId, name: nameOf(r.exerciseId), value: `${fmt.weight(r.weightKg)} × ${r.reps}` }))
    : [];

  return {
    hasSession: Boolean(active),
    title: active?.workoutName ?? '',
    stats,
    records,
    bodyweightKg,
    setBodyweightKg,
    notes,
    setNotes,
    saving,
    save: async () => {
      setSaving(true);
      await dispatch(workoutFinished({ bodyweightKg, notes }));
      successFeedback();
      router.dismissTo(routes.home);
    },
    back: () => router.back(),
  };
}
