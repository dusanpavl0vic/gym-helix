import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { BarChart } from '@/components/common/BarChart';
import { ChartCard } from '@/components/common/ChartCard';
import { EmptyState } from '@/components/common/EmptyState';
import { HBarChart } from '@/components/common/HBarChart';
import { LineChart } from '@/components/common/LineChart';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StatTile } from '@/components/ui/StatTile';
import { metrics } from '@/constants/metrics';
import { useFormatters } from '@/hooks/useFormatters';
import { compactNumber } from '@/helpers/charts/scale';
import { formatWeight } from '@/utils/number';

import { MUSCLE_TARGET, useOverviewStats } from '../../hooks/useOverviewStats';
import { PrGrid } from '../PrGrid';
import { styles } from './OverviewTab.styles';

export function OverviewTab() {
  const { t } = useTranslation(['progress', 'common']);
  const fmt = useFormatters();
  const stats = useOverviewStats();

  if (!stats.hasData) return <EmptyState message={t('progress:noData')} />;

  return (
    <View style={styles.wrap}>
      <AnimatedEntry index={0} style={styles.totals}>
        {stats.totals.map((s) => (
          <StatTile key={s.key} value={s.value} label={s.label} />
        ))}
      </AnimatedEntry>

      <AnimatedEntry index={1}>
        <SectionHeader title={t('progress:records')} />
        <PrGrid items={[...stats.records, { key: 'volume30', label: t('progress:totalVolume'), value: stats.volume30, note: t('progress:last30') }]} />
      </AnimatedEntry>

      <AnimatedEntry index={2}>
        <ChartCard title={t('progress:weeklyVolume')}>
          <BarChart
            bars={stats.weeklyVolume}
            height={metrics.volumeChartHeight + 44}
            formatValue={(v) => formatWeight(Math.round(v / 100) / 10)}
            emptyLabel={t('progress:chartEmpty')}
            accessibilityLabel={t('progress:weeklyVolume')}
          />
        </ChartCard>
      </AnimatedEntry>

      <AnimatedEntry index={3}>
        <ChartCard title={t('progress:setsPerMuscle')} hint={t('progress:setsPerMuscleHint')}>
          <HBarChart rows={stats.muscles} target={MUSCLE_TARGET} formatValue={(v) => formatWeight(v)} accessibilityLabel={t('progress:setsPerMuscle')} />
        </ChartCard>
      </AnimatedEntry>

      <AnimatedEntry index={4}>
        <ChartCard title={t('progress:sessionsPerWeek')}>
          <BarChart
            bars={stats.weeklySessions}
            height={metrics.volumeChartHeight + 44}
            formatValue={(v) => String(Math.round(v))}
            emptyLabel={t('progress:chartEmpty')}
            accessibilityLabel={t('progress:sessionsPerWeek')}
          />
        </ChartCard>
      </AnimatedEntry>

      <AnimatedEntry index={5}>
        <ChartCard title={t('progress:durationTrend')}>
          <LineChart
            points={stats.durations}
            formatY={(v) => compactNumber(Math.round(v))}
            formatX={(x) => fmt.dayMonth(new Date(x).toISOString())}
            emptyLabel={t('progress:chartEmpty')}
            accessibilityLabel={t('progress:durationTrend')}
          />
        </ChartCard>
      </AnimatedEntry>

      <AnimatedEntry index={6}>
        <ChartCard title={t('progress:cardioPerWeek')}>
          <BarChart
            bars={stats.weeklyCardio}
            height={metrics.volumeChartHeight + 44}
            formatValue={(v) => String(Math.round(v))}
            emptyLabel={t('progress:chartEmpty')}
            accessibilityLabel={t('progress:cardioPerWeek')}
          />
        </ChartCard>
      </AnimatedEntry>
    </View>
  );
}
