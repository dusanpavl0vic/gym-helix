import { format } from 'date-fns';
import { enUS, srLatn } from 'date-fns/locale';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/hooks';
import { daysSince } from '@/utils/date';
import { formatWeight, toTonnes } from '@/utils/number';
import { kgToUnit } from '@/utils/units';

export function useFormatters() {
  const { t, i18n } = useTranslation('common');
  const unit = useAppSelector((s) => s.settings.unit);
  const locale = i18n.language === 'en' ? enUS : srLatn;

  return useMemo(
    () => ({
      unit,
      unitLabel: t(`units.${unit}`),
      /** "SUBOTA · 12. SEP" */
      dayHeader: (date: Date) =>
        `${format(date, 'EEEE', { locale })} · ${format(date, i18n.language === 'en' ? 'MMM d' : 'd. MMM', { locale })}`
          .replace(/\.$/, '')
          .toUpperCase(),
      /** "05 SEP" */
      shortDate: (iso: string) => format(new Date(iso), 'dd MMM', { locale }).replace('.', '').toUpperCase(),
      dayMonth: (iso: string) => format(new Date(iso), i18n.language === 'en' ? 'MMM d' : 'd. MMM', { locale }),
      weekdayShort: (date: Date) => format(date, 'EEEEEE', { locale }).toUpperCase(),
      weekdayAbbr: (iso: string) => format(new Date(iso), 'EEE', { locale }).replace('.', ''),
      monthTitle: (date: Date) => format(date, 'LLLL yyyy', { locale }),
      monthShort: (date: Date) => format(date, 'LLL', { locale }).replace('.', '').toUpperCase(),
      relativeDays: (iso: string | undefined) => {
        const days = daysSince(iso);
        if (days === null) return undefined;
        if (days <= 0) return t('today');
        if (days === 1) return t('yesterday');
        return t('daysAgo', { count: days });
      },
      weight: (kg: number) => `${formatWeight(Math.round(kgToUnit(kg, unit) * 10) / 10)} ${t(`units.${unit}`)}`,
      weightValue: (kg: number) => formatWeight(Math.round(kgToUnit(kg, unit) * 10) / 10),
      tonnes: (kg: number) => `${toTonnes(kg)}${t('units.tonnes')}`,
      minutesBetween: (startIso: string, endIso?: string) =>
        endIso ? Math.max(1, Math.round((new Date(endIso).getTime() - new Date(startIso).getTime()) / 60000)) : 0,
    }),
    [t, i18n.language, locale, unit],
  );
}
