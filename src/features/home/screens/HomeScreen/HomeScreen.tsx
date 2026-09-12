import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ActionSheet } from '@/components/common/ActionSheet';
import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { EmptyState } from '@/components/common/EmptyState';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StatTile } from '@/components/ui/StatTile';
import { formatWeight } from '@/utils/number';

import { DeloadBanner } from '../../components/DeloadBanner';
import { HistoryItem } from '../../components/HistoryItem';
import { NextWorkoutCard } from '../../components/NextWorkoutCard';
import { QuickActionCard } from '../../components/QuickActionCard';
import { QuickWeightCard } from '../../components/QuickWeightCard';
import { WeekStrip } from '../../components/WeekStrip';
import { useHomeData } from '../../hooks/useHomeData';
import { styles } from './HomeScreen.styles';

export function HomeScreen() {
  const { t } = useTranslation(['home', 'common', 'workout']);
  const data = useHomeData();

  return (
    <ScreenContainer>
      <AnimatedEntry index={0}>
        <View style={styles.header}>
          <View style={styles.headerTexts}>
            <Text style={styles.date}>{data.dateLabel}</Text>
            <Text style={styles.greeting}>{data.greeting}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{data.initial}</Text>
          </View>
        </View>
      </AnimatedEntry>

      {data.deload.due ? (
        <DeloadBanner
          title={t('home:deload.title')}
          body={t('home:deload.body')}
          primaryLabel={t('home:deload.start')}
          onPrimary={data.actions.startDeload}
          secondaryLabel={t('home:deload.dismiss')}
          onSecondary={data.actions.dismissDeload}
        />
      ) : null}
      {data.deload.active ? <DeloadBanner title={t('home:deload.active', { count: data.deload.remaining })} /> : null}

      <AnimatedEntry index={1}>
        {data.card ? (
          <NextWorkoutCard
            eyebrow={data.hasActive ? t('home:activeWorkout') : t('home:nextWorkout')}
            badge={data.deload.active ? t('workout:deloadTag') : undefined}
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
      </AnimatedEntry>

      <AnimatedEntry index={2}>
        <WeekStrip days={data.week} />
      </AnimatedEntry>

      <AnimatedEntry index={3} style={styles.stats}>
        {data.stats.map((s) => (
          <StatTile key={s.key} value={s.value} label={s.label} />
        ))}
      </AnimatedEntry>

      <AnimatedEntry index={4} style={styles.quick}>
        <QuickActionCard title={t('home:quick.cardio')} hint={t('home:quick.cardioHint')} glyph="≈" onPress={data.actions.openCardio} />
        <QuickWeightCard
          title={t('home:quick.weight')}
          hint={t('home:quick.weightHint')}
          unitLabel={t('common:units.kg')}
          savedLabel={data.todayWeight ? t('home:quick.weightSaved', { value: formatWeight(data.todayWeight) }) : undefined}
          onSave={data.actions.saveWeight}
        />
      </AnimatedEntry>

      <AnimatedEntry index={5} style={styles.section}>
        <SectionHeader title={t('home:pastWorkouts')} actionLabel={t('home:progressLink')} onAction={data.actions.openProgress} />
        {data.history.length === 0 ? <EmptyState message={t('home:noHistory')} /> : null}
        {data.history.map((h) => (
          <HistoryItem key={h.id} badge={h.badge} title={h.title} meta={h.meta} value={h.volume} onPress={() => data.actions.openSession(h.id)} />
        ))}
      </AnimatedEntry>

      <ActionSheet
        visible={data.chooser.open}
        title={t('home:chooseTitle')}
        cancelLabel={t('common:cancel')}
        onClose={() => data.chooser.setOpen(false)}
        actions={data.chooser.options.map((o) => ({
          key: o.id,
          label: o.label,
          selected: o.selected,
          onPress: () => data.actions.start(o.id),
        }))}
      />
    </ScreenContainer>
  );
}
