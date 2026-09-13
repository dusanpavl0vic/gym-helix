import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { ELAPSED_TICK_MS } from '@/constants/timer';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { formatRir, formatScheme } from '@/features/plan/helpers/plannedFormat';
import { selectTrainingWeek } from '@/features/plan/store/rotationSelectors';
import { selectSettings } from '@/features/settings/store/settingsSelectors';
import { settingsUpdated } from '@/features/settings/store/settingsSlice';
import { useConfirm } from '@/hooks/useConfirm';
import { useDialog } from '@/hooks/useDialog';
import { useNow } from '@/hooks/useNow';
import { usePermissionPrompt } from '@/hooks/usePermissionPrompt';
import { notificationsAvailable } from '@/lib/notifications/restNotifications';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatWeight } from '@/utils/number';
import { formatMmSs } from '@/utils/time';

import { formatSetsShort } from '../helpers/performance';
import { exerciseProgress, exerciseStatus } from '../helpers/position';
import { sessionClosed } from '../store/activeSessionSlice';
import { selectActiveSession, selectIsActiveSessionComplete } from '../store/activeSessionSelectors';
import type { ActiveExercise } from '../types';

const EXIT_LATER = 'later';
const EXIT_DISCARD = 'discard';
const EXIT_STAY = 'stay';

export function useWorkoutOverview() {
  const { t } = useTranslation(['workout', 'plan', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dialog = useDialog();
  const confirm = useConfirm();
  const promptPermission = usePermissionPrompt();
  const { exercises, nameOf } = useExerciseLookup();
  const session = useAppSelector(selectActiveSession);
  const isComplete = useAppSelector(selectIsActiveSessionComplete);
  const settings = useAppSelector(selectSettings);
  const week = useAppSelector(selectTrainingWeek);
  const now = useNow(ELAPSED_TICK_MS, Boolean(session));
  const kg = t('common:units.kg');

  useFocusEffect(
    useCallback(() => {
      if (!session) router.dismissTo(routes.home);
    }, [session, router]),
  );

  // Ask for notifications once, at the start of a workout — never in the middle of a rest.
  useEffect(() => {
    if (!session || settings.notificationsPrompted || !settings.notifications || !notificationsAvailable) return;
    dispatch(settingsUpdated({ notificationsPrompted: true }));
    promptPermission('notifications');
  }, [session?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const suggestionLine = useCallback(
    (exercise: ActiveExercise) => {
      const reps = `${exercise.planned.repsMin}–${exercise.planned.repsMax}`;
      if (exercise.suggestedWeightKg === null) return t('workout:suggest.none', { reps });
      return t(`workout:suggest.${exercise.suggestion}`, { weight: `${formatWeight(exercise.suggestedWeightKg)} ${kg}`, reps });
    },
    [t, kg],
  );

  const cards = useMemo(
    () =>
      (session?.exercises ?? []).map((exercise, index) => {
        const { done, total } = exerciseProgress(exercise);
        const status = exerciseStatus(exercise);
        const doneSets = exercise.sets.filter((s) => s.done).map((s) => ({ weightKg: s.weightKg ?? 0, reps: s.reps }));
        return {
          index,
          exercise: exercises[exercise.exerciseId],
          name: nameOf(exercise.exerciseId),
          scheme: `${formatScheme(exercise.planned, t)} · ${formatRir(exercise.planned, t)}`,
          detail: status === 'skipped' ? t('workout:status.skipped') : done > 0 ? formatSetsShort(doneSets, kg) : suggestionLine(exercise),
          status,
          progressLabel: t('workout:progress', { done, total }),
        };
      }),
    [session, exercises, nameOf, suggestionLine, t, kg],
  );

  const totals = cards.reduce(
    (sum, card) => {
      const exercise = session?.exercises[card.index];
      if (!exercise) return sum;
      const { done, total } = exerciseProgress(exercise);
      return { done: sum.done + (exercise.skipped ? total : done), total: sum.total + total };
    },
    { done: 0, total: 0 },
  );

  return {
    session,
    isComplete,
    cards,
    header: session
      ? {
          title: session.workoutName,
          subtitle: `${t('workout:weekLabel', { week })}${session.isDeload ? ` · ${t('workout:deloadTag')}` : ''}`,
          elapsed: formatMmSs((now - new Date(session.startedAt).getTime()) / 1000),
          progress: totals.total === 0 ? 0 : totals.done / totals.total,
        }
      : undefined,
    isDeload: session?.isDeload ?? false,
    actions: {
      open: (index: number) => router.push(routes.workoutExercise(index)),
      finish: async () => {
        if (!isComplete) {
          const ok = await confirm({ title: t('workout:finishEarly.title'), message: t('workout:finishEarly.body'), confirmLabel: t('workout:finishEarly.confirm'), icon: 'workout' });
          if (!ok) return;
        }
        router.push(routes.workoutSummary);
      },
      exit: async () => {
        const key = await dialog.show({
          icon: 'workout',
          title: t('workout:exit.title'),
          message: t('workout:exit.body'),
          actions: [
            { key: EXIT_LATER, label: t('common:dialog.later'), variant: 'primary' },
            { key: EXIT_DISCARD, label: t('common:dialog.discard'), variant: 'danger', icon: 'delete' },
            { key: EXIT_STAY, label: t('common:dialog.keep'), variant: 'ghost' },
          ],
        });
        if (key === EXIT_LATER) router.dismissTo(routes.home);
        if (key === EXIT_DISCARD) dispatch(sessionClosed());
      },
    },
  };
}
