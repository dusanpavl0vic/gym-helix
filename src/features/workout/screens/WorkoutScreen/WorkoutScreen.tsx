import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

import { ActionSheet, type SheetAction } from '@/components/common/ActionSheet';
import { ImageGallery } from '@/components/common/ImageGallery';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { IconButton } from '@/components/ui/IconButton';
import { PillTabs } from '@/components/ui/PillTabs';
import { animation } from '@/constants/animation';
import { metrics } from '@/constants/metrics';
import { REST_EXTEND_SEC } from '@/constants/timer';
import { spacing } from '@/constants/spacing';
import { useKeepAwakeWhileActive } from '@/hooks/useKeepAwakeWhileActive';

import { CoachHint } from '../../components/CoachHint';
import { NextUpCard } from '../../components/NextUpCard';
import { RestOverlay } from '../../components/RestOverlay';
import { SetTable } from '../../components/SetTable';
import { WorkoutHeader } from '../../components/WorkoutHeader';
import { useRestTimer } from '../../hooks/useRestTimer';
import { useWorkoutFlow } from '../../hooks/useWorkoutFlow';
import { styles } from './WorkoutScreen.styles';

export function WorkoutScreen() {
  const { t } = useTranslation(['workout', 'common', 'exercises']);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const flow = useWorkoutFlow();
  const currentName = flow.view?.name ?? '';
  const timer = useRestTimer(currentName);
  useKeepAwakeWhileActive();

  useEffect(() => {
    if (!flow.session) router.back();
  }, [flow.session, router]);

  if (!flow.session || !flow.current || !flow.view) {
    return (
      <View style={[styles.root, styles.empty]}>
        <Text>{t('workout:noActive')}</Text>
      </View>
    );
  }

  const { view, current } = flow;
  const nextSet = current.sets[flow.currentSetIndex];

  const sheetActions: SheetAction[] = [
    ...view.alternatives.map((id) => ({ key: `alt-${id}`, label: t('workout:actions.substitute', { name: flow.nameOf(id) }), onPress: () => flow.actions.substitute(id) })),
    ...(view.substitutedFor ? [{ key: 'restore', label: t('workout:actions.restoreOriginal'), onPress: flow.actions.restoreOriginal }] : []),
    { key: 'add', label: t('workout:actions.addSet'), onPress: flow.actions.addSet },
    { key: 'remove', label: t('workout:actions.removeSet'), onPress: flow.actions.removeSet },
    { key: 'details', label: t('workout:actions.details'), onPress: flow.actions.openDetails },
    { key: 'skip', label: current.skipped ? t('workout:actions.unskip') : t('workout:actions.skip'), onPress: flow.actions.toggleSkip, destructive: !current.skipped },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <WorkoutHeader
        title={flow.session.workoutName}
        subtitle={view.position}
        elapsed={view.elapsed}
        progress={view.progress}
        closeLabel={t('common:close')}
        onClose={flow.actions.exit}
      />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <PillTabs items={view.tabs} selectedKey={String(flow.exerciseIndex)} onSelect={(key) => flow.actions.selectExercise(Number(key))} size="sm" />
        <Animated.View key={`${flow.exerciseIndex}-${current.exerciseId}`} entering={FadeIn.duration(animation.normal)} style={{ gap: spacing.xxl }}>
          <ImageGallery images={view.exercise?.images ?? []} height={metrics.workoutImageHeight} rounded placeholderLabel={t('exercises:imagePlaceholder')} placeholderCaption={view.name} />
          <View style={styles.titleRow}>
            <View style={styles.titles}>
              {flow.isDeload ? <Chip label={t('workout:deloadTag')} variant="lime" /> : null}
              <Text style={styles.name}>{view.name}</Text>
              {view.substitutedFor ? <Text style={styles.substituted}>{t('workout:substituted', { name: view.substitutedFor })}</Text> : null}
              <Text style={styles.scheme}>{view.scheme}</Text>
              {view.note ? <Text style={styles.note}>{view.note}</Text> : null}
              {current.skipped ? <Text style={styles.skipped}>{t('workout:skipped')}</Text> : null}
            </View>
            <IconButton glyph="⋯" onPress={() => flow.setActionsOpen(true)} accessibilityLabel={t('workout:actions.title')} />
          </View>
          <CoachHint lastTime={view.lastTime} suggestion={view.suggestion} tone={view.suggestionTone} />
          <SetTable
            exercise={current}
            currentSetIndex={flow.currentSetIndex}
            weightStep={flow.weightStep}
            unitLabel={flow.unitLabel}
            labels={{
              set: t('workout:colSet'),
              reps: t('workout:colReps'),
              rir: t('workout:rirOptional'),
              bodyweight: t('common:none'),
              addSet: `+ ${t('workout:actions.addSet')}`,
            }}
            onChange={flow.actions.changeSet}
            onReopen={flow.actions.reopenSet}
            onAddSet={flow.actions.addSet}
          />
          <NextUpCard label={t('workout:next')} text={view.nextLabel} />
        </Animated.View>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.lg }]}>
        <Button label={flow.finishLabel} onPress={flow.actions.primary} variant={flow.isComplete ? 'primary' : 'dark'} size="lg" style={styles.primary} />
      </View>

      {timer.rest ? (
        <RestOverlay
          title={t('workout:rest.title')}
          kindLabel={timer.rest.kind === 'exercise' ? t('workout:rest.newExercise') : t('workout:rest.nextSet')}
          remainingSec={timer.remainingSec}
          totalSec={timer.rest.totalSec}
          progress={timer.progress}
          ofLabel={t('workout:rest.of', { total: timer.rest.totalSec })}
          nextTitle={timer.rest.kind === 'exercise' ? view.name : t('workout:rest.setOf', { n: flow.currentSetIndex + 1, name: view.name })}
          nextMeta={nextSet ? `${nextSet.weightKg > 0 ? `${nextSet.weightKg} ${flow.unitLabel} × ` : '× '}${nextSet.reps}` : view.scheme}
          extendLabel={t('workout:rest.extend', { sec: REST_EXTEND_SEC })}
          skipLabel={t('workout:rest.skip')}
          onExtend={() => timer.extend(REST_EXTEND_SEC)}
          onSkip={timer.skip}
        />
      ) : null}

      <ActionSheet
        visible={flow.actionsOpen}
        title={t('workout:actions.title')}
        actions={sheetActions}
        cancelLabel={t('common:cancel')}
        onClose={() => flow.setActionsOpen(false)}
      />
    </View>
  );
}
