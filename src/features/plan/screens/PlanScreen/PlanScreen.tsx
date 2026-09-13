import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/components/common/EmptyState';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { PillTabs } from '@/components/ui/PillTabs';

import { PlanExerciseItem } from '../../components/PlanExerciseItem';
import { WarmupCard } from '../../components/WarmupCard';
import { WeekPlanCard } from '../../components/WeekPlanCard';
import { usePlanData } from '../../hooks/usePlanData';
import { styles } from './PlanScreen.styles';

export function PlanScreen() {
  const { t } = useTranslation(['plan', 'exercises', 'home']);
  const plan = usePlanData();
  const warmupSteps = t('plan:warmup.steps', { returnObjects: true }) as string[];

  return (
    <ScreenContainer>
      <ScreenHeader title={plan.title} subtitle={plan.subtitle} />
      {plan.weekPlan ? <WeekPlanCard title={plan.weekPlan.title} hint={plan.weekPlan.hint} tempo={plan.weekPlan.tempo} days={plan.weekPlan.days} /> : null}
      {!plan.hasWorkouts ? (
        <EmptyState message={t('plan:noWorkouts')} actionLabel={t('plan:edit')} onAction={plan.actions.editProgram} />
      ) : (
        <>
          <PillTabs items={plan.tabs} selectedKey={plan.selectedId} onSelect={plan.select} />
          <View style={styles.meta}>
            {plan.isNextSelected ? <Chip label={t('plan:next')} variant="lime" /> : null}
            {plan.workoutFocus ? <Text style={styles.focus}>{plan.workoutFocus}</Text> : null}
            <Text style={styles.estimate}>{plan.workoutMeta}</Text>
          </View>
          <WarmupCard title={t('plan:warmup.title')} steps={Array.isArray(warmupSteps) ? warmupSteps : []} />
          <View style={styles.list}>
            {plan.rows.length === 0 ? <EmptyState message={t('plan:noExercises')} /> : null}
            {plan.rows.map((row) => (
              <PlanExerciseItem
                key={`${plan.selectedId}-${row.id}`}
                index={0}
                exercise={row.exercise}
                name={row.name}
                scheme={row.scheme}
                rest={row.rest}
                note={row.note}
                placeholderLabel={t('exercises:imagePlaceholder')}
                onPress={() => plan.actions.openExercise(row.exerciseId)}
              />
            ))}
          </View>
          <View style={styles.actions}>
            <Button label={plan.hasActive ? t('home:resume') : t('plan:startThis')} icon="start" onPress={plan.actions.start} disabled={plan.rows.length === 0} />
            <Button label={t('plan:edit')} icon="edit" onPress={plan.actions.edit} variant="outline" />
          </View>
        </>
      )}
    </ScreenContainer>
  );
}
