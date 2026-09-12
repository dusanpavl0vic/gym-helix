import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/components/common/EmptyState';
import { PillTabs } from '@/components/ui/PillTabs';

import { useStrengthProgress } from '../../hooks/useStrengthProgress';
import { ExerciseProgressChart } from '../ExerciseProgressChart';
import { styles } from './StrengthTab.styles';

export function StrengthTab() {
  const { t } = useTranslation('progress');
  const strength = useStrengthProgress();

  if (!strength.hasData || !strength.exerciseId) return <EmptyState message={t('noData')} />;

  return (
    <View style={styles.wrap}>
      <PillTabs items={strength.chips} selectedKey={strength.exerciseId} onSelect={strength.select} />
      <ExerciseProgressChart key={strength.exerciseId} exerciseId={strength.exerciseId} exerciseName={strength.exerciseName} showTable />
    </View>
  );
}
