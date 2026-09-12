import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChartCard } from '@/components/common/ChartCard';
import { LineChart } from '@/components/common/LineChart';
import { PillTabs } from '@/components/ui/PillTabs';

import { useExerciseProgress } from '../../hooks/useExerciseProgress';
import type { ExerciseMetric } from '../../helpers/analytics';
import { styles } from './ExerciseProgressChart.styles';
import type { ExerciseProgressChartProps } from './ExerciseProgressChart.types';

const TABLE_ROWS = 8;

export function ExerciseProgressChart({ exerciseId, exerciseName, showTable = false }: ExerciseProgressChartProps) {
  const { t } = useTranslation('progress');
  const progress = useExerciseProgress(exerciseId, exerciseName);

  return (
    <View style={styles.wrap}>
      <PillTabs items={progress.metrics} selectedKey={progress.metric} onSelect={(key) => progress.setMetric(key as ExerciseMetric)} size="sm" />
      <ChartCard title={progress.title} value={progress.deltaLabel}>
        <LineChart
          points={progress.points}
          formatY={progress.formatY}
          formatX={progress.formatX}
          emptyLabel={progress.emptyLabel}
          accessibilityLabel={progress.title}
          zeroBased={progress.metric === 'volume' || progress.metric === 'reps'}
        />
        {showTable && progress.rows.length > 0 ? (
          <View style={styles.table}>
            <Text style={styles.tableTitle}>{t('exerciseTable').toUpperCase()}</Text>
            {progress.rows.slice(0, TABLE_ROWS).map((row) => (
              <View key={row.id} style={styles.row}>
                <Text style={styles.date}>{row.date}</Text>
                <Text style={styles.detail} numberOfLines={1}>{row.detail}</Text>
                <Text style={styles.value}>{row.value}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </ChartCard>
    </View>
  );
}
