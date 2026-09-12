import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useConfirm } from '@/hooks/useConfirm';
import { useFormatters } from '@/hooks/useFormatters';
import { successFeedback } from '@/lib/feedback/haptics';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { CardioType } from '@/types/domain';
import { createId } from '@/utils/id';

import { cardioAdded, cardioRemoved } from '../store/cardioSlice';
import { selectCardioEntries } from '../store/cardioSelectors';

export const CARDIO_TYPES: CardioType[] = ['swim', 'zone2', 'walk', 'hiit'];
const DEFAULT_DURATION: Record<CardioType, number> = { swim: 40, zone2: 35, walk: 30, hiit: 20 };
const RECENT_LIMIT = 20;

export function useCardio() {
  const { t } = useTranslation(['cardio', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const fmt = useFormatters();
  const entries = useAppSelector(selectCardioEntries);
  const [type, setType] = useState<CardioType>('swim');
  const [durationMin, setDurationMin] = useState(DEFAULT_DURATION.swim);
  const [notes, setNotes] = useState('');

  return {
    type,
    setType: (next: CardioType) => {
      setType(next);
      setDurationMin(DEFAULT_DURATION[next]);
    },
    durationMin,
    setDurationMin,
    notes,
    setNotes,
    hint: t(`cardio:hints.${type}`),
    save: async () => {
      if (durationMin <= 0) return;
      await dispatch(cardioAdded({ id: createId('c_'), type, date: new Date().toISOString(), durationMin, notes: notes.trim() || undefined }));
      successFeedback();
      setNotes('');
      router.back();
    },
    recent: entries.slice(0, RECENT_LIMIT).map((e) => ({
      id: e.id,
      title: `${t(`common:cardioTypes.${e.type}`)} · ${e.durationMin} ${t('common:units.min')}`,
      subtitle: [fmt.dayMonth(e.date), e.notes].filter(Boolean).join(' · '),
    })),
    remove: async (id: string) => {
      const ok = await confirm({ title: t('common:delete'), confirmLabel: t('common:delete'), destructive: true });
      if (ok) dispatch(cardioRemoved(id));
    },
    back: () => router.back(),
  };
}
