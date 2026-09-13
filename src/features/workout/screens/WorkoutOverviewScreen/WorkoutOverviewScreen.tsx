import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { spacing } from '@/constants/spacing';

import { ExerciseStatusCard } from '../../components/ExerciseStatusCard';
import { WorkoutHeader } from '../../components/WorkoutHeader';
import { useWorkoutOverview } from '../../hooks/useWorkoutOverview';
import { styles } from './WorkoutOverviewScreen.styles';

export function WorkoutOverviewScreen() {
  const { t } = useTranslation(['workout', 'common', 'exercises']);
  const insets = useSafeAreaInsets();
  const overview = useWorkoutOverview();

  if (!overview.session || !overview.header) return <View style={styles.root} />;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <WorkoutHeader
        title={overview.header.title}
        subtitle={overview.header.subtitle}
        elapsed={overview.header.elapsed}
        progress={overview.header.progress}
        closeLabel={t('common:close')}
        onClose={overview.actions.exit}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {overview.isDeload ? (
          <View style={styles.deload}>
            <Icon name="info" size={20} color="forest" />
            <Text style={styles.deloadText}>{t('workout:deloadHint')}</Text>
          </View>
        ) : null}
        <Text style={styles.hint}>{t('workout:chooseHint')}</Text>
        {overview.cards.map((card) => (
          <ExerciseStatusCard
            key={`${card.index}-${card.name}`}
            exercise={card.exercise}
            name={card.name}
            scheme={card.scheme}
            detail={card.detail}
            status={card.status}
            progressLabel={card.progressLabel}
            placeholderLabel={t('exercises:imagePlaceholder')}
            onPress={() => overview.actions.open(card.index)}
          />
        ))}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.lg }]}>
        <Button label={t('workout:finishWorkout')} icon="check" onPress={overview.actions.finish} variant={overview.isComplete ? 'primary' : 'dark'} size="lg" />
      </View>
    </View>
  );
}
