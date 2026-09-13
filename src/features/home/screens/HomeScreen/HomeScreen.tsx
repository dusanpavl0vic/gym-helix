import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/components/common/EmptyState';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StatTile } from '@/components/ui/StatTile';
import { WeightDialog } from '@/features/body/components/WeightDialog';

import { DeloadBanner } from '../../components/DeloadBanner';
import { HistoryItem } from '../../components/HistoryItem';
import { NextWorkoutCard } from '../../components/NextWorkoutCard';
import { QuickActionCard } from '../../components/QuickActionCard';
import { WeekStrip } from '../../components/WeekStrip';
import { WeightCard } from '../../components/WeightCard';
import { WorkoutChooserSheet } from '../../components/WorkoutChooserSheet';
import { useHomeData } from '../../hooks/useHomeData';
import { styles } from './HomeScreen.styles';

export function HomeScreen() {
  const { t } = useTranslation(['home', 'common', 'workout']);
  const data = useHomeData();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.headerTexts}>
          <Text style={styles.date}>{data.dateLabel}</Text>
          <Text style={styles.greeting}>{data.greeting}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{data.initial}</Text>
        </View>
      </View>

      {data.isDeloadWeek ? <DeloadBanner title={t('home:deload.title')} body={t('home:deload.body', { week: data.trainingWeek })} /> : null}

      {data.card ? (
        <NextWorkoutCard
          eyebrow={data.hasActive ? t('home:activeWorkout') : t('home:nextWorkout')}
          badge={data.weekBadge}
          title={data.card.title}
          focus={data.card.focus}
          meta={data.card.meta}
          footnote={data.lastWorkoutLabel}
          tags={data.card.tags}
          primaryLabel={data.hasActive ? t('home:resume') : t('home:start')}
          onPrimary={() => data.actions.start()}
          secondaryLabel={data.hasActive ? undefined : t('home:chooseOther')}
          onSecondary={() => data.chooser.setOpen(true)}
        />
      ) : (
        <EmptyState message={t('home:emptyProgram')} actionLabel={t('common:tabs.plan')} onAction={data.actions.openPlan} />
      )}

      <WeekStrip days={data.weekDays} />

      <View style={styles.stats}>
        {data.stats.map((s) => (
          <StatTile key={s.key} value={s.value} label={s.label} />
        ))}
      </View>

      <View style={styles.quick}>
        <QuickActionCard title={t('home:quick.cardio')} hint={t('home:quick.cardioHint')} icon="run" onPress={data.actions.openCardio} />
        <WeightCard
          title={t('home:weight.title')}
          value={data.weight.value}
          unitLabel={t('common:units.kg')}
          caption={data.weight.caption}
          delta={data.weight.delta}
          addLabel={t('home:weight.empty')}
          onPress={() => data.weightDialog.setOpen(true)}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader title={t('home:pastWorkouts')} actionLabel={t('home:progressLink')} onAction={data.actions.openProgress} />
        {data.history.length === 0 ? <EmptyState message={t('home:noHistory')} /> : null}
        {data.history.map((h) => (
          <HistoryItem key={h.id} badge={h.badge} title={h.title} meta={h.meta} value={h.volume} onPress={() => data.actions.openSession(h.id)} />
        ))}
      </View>

      <WorkoutChooserSheet
        visible={data.chooser.open}
        title={t('home:chooser.title')}
        nextLabel={t('home:chooser.next')}
        closeLabel={t('common:close')}
        options={data.chooser.options}
        onSelect={(id) => data.actions.start(id)}
        onClose={() => data.chooser.setOpen(false)}
      />
      <WeightDialog
        visible={data.weightDialog.open}
        initialValue={data.weight.initialValue}
        onSave={data.actions.saveWeight}
        onClose={() => data.weightDialog.setOpen(false)}
      />
    </ScreenContainer>
  );
}
