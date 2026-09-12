import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { formatSetsShort } from '@/features/workout/helpers/performance';
import { useConfirm } from '@/hooks/useConfirm';
import { useFormatters } from '@/hooks/useFormatters';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { sessionDurationMin } from '../helpers/analytics';
import { sessionSetCount, sessionVolumeKg } from '../logic/volume';
import { selectSessionById } from '../store/historySelectors';
import { historySessionDeleted } from '../store/historySlice';

export function useSessionDetail() {
  const { t } = useTranslation(['progress', 'common', 'workout']);
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const fmt = useFormatters();
  const { nameOf } = useExerciseLookup();
  const session = useAppSelector((s) => selectSessionById(s, id));

  const view = useMemo(() => {
    if (!session) return undefined;
    return {
      title: session.workoutName,
      eyebrow: `${fmt.dayHeader(new Date(session.startedAt))}${session.isDeload ? ` · ${t('progress:session.deload')}` : ''}`,
      stats: [
        { key: 'duration', value: String(sessionDurationMin(session)), label: `${t('common:units.min')} · ${t('workout:summary.duration')}` },
        { key: 'volume', value: fmt.tonnes(sessionVolumeKg(session)), label: t('workout:summary.volume') },
        { key: 'sets', value: String(sessionSetCount(session)), label: t('workout:summary.sets') },
      ],
      exercises: session.exercises.map((e, i) => ({
        key: `${e.exerciseId}-${i}`,
        exerciseId: e.exerciseId,
        name: nameOf(e.exerciseId),
        detail: e.skipped ? t('progress:session.skipped') : formatSetsShort(e.sets, fmt.unitLabel),
        substituted: e.substitutedFor ? t('workout:substituted', { name: nameOf(e.substitutedFor) }) : undefined,
      })),
      notes: session.notes,
      bodyweight: session.bodyweightKg ? fmt.weight(session.bodyweightKg) : undefined,
    };
  }, [session, fmt, nameOf, t]);

  return {
    view,
    back: () => router.back(),
    remove: async () => {
      const ok = await confirm({ title: t('progress:session.deleteTitle'), message: t('progress:session.deleteBody'), confirmLabel: t('common:delete'), destructive: true });
      if (!ok || !session) return;
      await dispatch(historySessionDeleted(session.id));
      router.back();
    },
  };
}
