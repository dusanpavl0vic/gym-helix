import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { BODY_COMPARE_DAYS } from '@/constants/training';
import { selectMeasurements } from '@/features/body/store/bodySelectors';
import { useFormatters } from '@/hooks/useFormatters';
import { useAppSelector } from '@/store/hooks';
import { formatWeight } from '@/utils/number';

import { BODY_FIELDS, bodyDelta, bodySeries } from '../helpers/analytics';

export function useBodyProgress() {
  const { t } = useTranslation(['body', 'common']);
  const router = useRouter();
  const fmt = useFormatters();
  const measurements = useAppSelector(selectMeasurements);

  const charts = useMemo(
    () =>
      BODY_FIELDS.map((field) => {
        const delta = bodyDelta(measurements, field, BODY_COMPARE_DAYS);
        const unit = field === 'weightKg' ? t('common:units.kg') : t('common:units.cm');
        return {
          field,
          title: t(`body:fields.${field}`),
          points: bodySeries(measurements, field),
          valueLabel: delta
            ? delta.delta !== undefined
              ? `${formatWeight(delta.latest)} ${unit} · ${delta.delta > 0 ? '+' : ''}${formatWeight(delta.delta)}`
              : `${formatWeight(delta.latest)} ${unit}`
            : undefined,
          hint: delta && delta.delta === undefined ? t('body:noCompare') : undefined,
        };
      }).filter((c) => c.points.length > 0),
    [measurements, t],
  );

  return {
    charts,
    isEmpty: measurements.length === 0,
    formatX: (x: number) => fmt.dayMonth(new Date(x).toISOString()),
    openBody: () => router.push(routes.body),
  };
}
