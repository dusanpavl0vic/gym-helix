import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CARDIO_ICONS, CARDIO_RECENT_LIMIT, DEFAULT_CARDIO_DURATION_MIN } from '@/constants/cardio';
import { useConfirm } from '@/hooks/useConfirm';
import { useFormatters } from '@/hooks/useFormatters';
import { successFeedback } from '@/lib/feedback/haptics';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { CardioType } from '@/types/domain';
import { createId } from '@/utils/id';
import { formatWeight } from '@/utils/number';

import { cardioAdded, cardioRemoved } from '../store/cardioSlice';
import { selectCardioEntries } from '../store/cardioSelectors';

const DEFAULT_TYPE: CardioType = 'run';

export function useCardio() {
  const { t } = useTranslation(['cardio', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const fmt = useFormatters();
  const entries = useAppSelector(selectCardioEntries);
  const [type, setType] = useState<CardioType>(DEFAULT_TYPE);
  const [durationMin, setDurationMin] = useState(DEFAULT_CARDIO_DURATION_MIN[DEFAULT_TYPE]);
  const [distanceKm, setDistanceKm] = useState<number | undefined>();
  const [avgHeartRate, setAvgHeartRate] = useState<number | undefined>();
  const [rpe, setRpe] = useState<number | undefined>();
  const [notes, setNotes] = useState('');

  return {
    type,
    setType: (next: CardioType) => {
      setType(next);
      setDurationMin(DEFAULT_CARDIO_DURATION_MIN[next]);
    },
    durationMin,
    setDurationMin,
    distanceKm,
    setDistanceKm,
    avgHeartRate,
    setAvgHeartRate,
    rpe,
    setRpe,
    notes,
    setNotes,
    hint: t(`cardio:hints.${type}`),
    save: async () => {
      if (durationMin <= 0) return;
      await dispatch(
        cardioAdded({
          id: createId('c_'),
          type,
          date: new Date().toISOString(),
          durationMin,
          distanceKm,
          avgHeartRate: avgHeartRate ? Math.round(avgHeartRate) : undefined,
          rpe,
          notes: notes.trim() || undefined,
        }),
      );
      successFeedback();
      router.back();
    },
    recent: entries.slice(0, CARDIO_RECENT_LIMIT).map((e) => ({
      id: e.id,
      icon: CARDIO_ICONS[e.type],
      title: `${t(`common:cardioTypes.${e.type}`)} · ${e.durationMin} ${t('common:units.min')}`,
      subtitle: [
        fmt.dayMonth(e.date),
        e.distanceKm ? `${formatWeight(e.distanceKm)} km` : undefined,
        e.avgHeartRate ? `${e.avgHeartRate} bpm` : undefined,
        e.rpe ? `RPE ${e.rpe}` : undefined,
        e.notes,
      ]
        .filter(Boolean)
        .join(' · '),
    })),
    remove: async (id: string) => {
      const ok = await confirm({ title: t('cardio:deleteTitle'), confirmLabel: t('common:delete'), destructive: true });
      if (ok) dispatch(cardioRemoved(id));
    },
    back: () => router.back(),
  };
}
