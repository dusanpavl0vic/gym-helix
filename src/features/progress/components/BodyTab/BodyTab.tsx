import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { ChartCard } from '@/components/common/ChartCard';
import { EmptyState } from '@/components/common/EmptyState';
import { LineChart } from '@/components/common/LineChart';
import { Button } from '@/components/ui/Button';
import { formatWeight } from '@/utils/number';

import { useBodyProgress } from '../../hooks/useBodyProgress';
import { styles } from './BodyTab.styles';

export function BodyTab() {
  const { t } = useTranslation(['body', 'progress']);
  const body = useBodyProgress();

  return (
    <View style={styles.wrap}>
      <Button label={t('body:add')} onPress={body.openBody} variant="outline" />
      {body.isEmpty ? <EmptyState message={t('body:empty')} /> : null}
      {body.charts.map((chart, i) => (
        <AnimatedEntry key={chart.field} index={i}>
          <ChartCard title={chart.title} value={chart.valueLabel} hint={chart.hint}>
            <LineChart
              points={chart.points}
              formatY={(v) => formatWeight(Math.round(v * 10) / 10)}
              formatX={body.formatX}
              emptyLabel={t('progress:chartEmpty')}
              accessibilityLabel={chart.title}
            />
          </ChartCard>
        </AnimatedEntry>
      ))}
    </View>
  );
}
