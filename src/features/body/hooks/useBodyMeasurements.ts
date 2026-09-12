import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BODY_FIELDS, bodyDelta, type BodyField } from '@/features/progress/helpers/analytics';
import { BODY_COMPARE_DAYS } from '@/constants/training';
import { useConfirm } from '@/hooks/useConfirm';
import { useFormatters } from '@/hooks/useFormatters';
import { successFeedback } from '@/lib/feedback/haptics';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { BodyMeasurement } from '@/types/domain';
import { createId } from '@/utils/id';
import { formatWeight } from '@/utils/number';

import { measurementAdded, measurementRemoved } from '../store/bodySlice';
import { selectMeasurements } from '../store/bodySelectors';

export type BodyDraft = Partial<Record<BodyField, number>>;

export function useBodyMeasurements() {
  const { t } = useTranslation(['body', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const fmt = useFormatters();
  const measurements = useAppSelector(selectMeasurements);
  const [draft, setDraft] = useState<BodyDraft>({});
  const [error, setError] = useState(false);

  return {
    draft,
    error,
    fields: BODY_FIELDS,
    setField: (field: BodyField, value: number | undefined) => {
      setError(false);
      setDraft((d) => ({ ...d, [field]: value }));
    },
    save: async () => {
      if (!BODY_FIELDS.some((f) => draft[f] !== undefined)) {
        setError(true);
        return;
      }
      const entry: BodyMeasurement = { id: createId('m_'), date: new Date().toISOString(), ...draft };
      await dispatch(measurementAdded(entry));
      successFeedback();
      setDraft({});
    },
    compare: BODY_FIELDS.map((field) => {
      const delta = bodyDelta(measurements, field, BODY_COMPARE_DAYS);
      return {
        field,
        label: t(`body:short.${field}`),
        value: delta ? formatWeight(delta.latest) : t('common:none'),
        delta: delta?.delta !== undefined ? `${delta.delta > 0 ? '+' : ''}${formatWeight(delta.delta)}` : undefined,
      };
    }),
    rows: measurements.map((m) => ({
      id: m.id,
      date: fmt.dayMonth(m.date),
      values: BODY_FIELDS.filter((f) => m[f] !== undefined).map((f) => `${t(`body:short.${f}`)} ${formatWeight(m[f] as number)}`).join(' · '),
    })),
    remove: async (id: string) => {
      const ok = await confirm({ title: t('body:deleteTitle'), confirmLabel: t('common:delete'), destructive: true });
      if (ok) dispatch(measurementRemoved(id));
    },
    back: () => router.back(),
  };
}
