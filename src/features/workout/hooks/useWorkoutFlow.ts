import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { formatRir, formatScheme } from '@/features/plan/helpers/plannedFormat';
import { getPlannedNote } from '@/features/programs/helpers/programText';
import { selectSessions } from '@/features/progress/store/historySelectors';
import { selectSettings } from '@/features/settings/store/settingsSelectors';
import { useConfirm } from '@/hooks/useConfirm';
import { useFormatters } from '@/hooks/useFormatters';
import { useNow } from '@/hooks/useNow';
import { successFeedback } from '@/lib/feedback/haptics';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatWeight } from '@/utils/number';
import { formatMmSs } from '@/utils/time';

import { formatSetsShort, getExerciseHistory } from '../helpers/performance';
import { findNextOpenPosition } from '../helpers/position';
import { restSecondsFor } from '../helpers/rest';
import {
  exerciseSelected, exerciseSkipToggled, sessionClosed, setAdded, setCompleted, setRemoved, setReopened, setValueChanged,
} from '../store/activeSessionSlice';
import { selectActiveSession, selectCurrentSetIndex, selectIsActiveSessionComplete } from '../store/activeSessionSelectors';
import { exerciseSubstituted } from '../store/workoutThunks';
import type { ActiveSet } from '../types';

const ELAPSED_TICK_MS = 1000;

export function useWorkoutFlow() {
  const { t } = useTranslation(['workout', 'plan', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const fmt = useFormatters();
  const { exercises, nameOf } = useExerciseLookup();
  const session = useAppSelector(selectActiveSession);
  const currentSetIndex = useAppSelector(selectCurrentSetIndex);
  const isComplete = useAppSelector(selectIsActiveSessionComplete);
  const history = useAppSelector(selectSessions);
  const settings = useAppSelector(selectSettings);
  const now = useNow(ELAPSED_TICK_MS, Boolean(session));
  const [actionsOpen, setActionsOpen] = useState(false);

  const exerciseIndex = session?.currentExerciseIndex ?? 0;
  const current = session?.exercises[exerciseIndex];

  const view = useMemo(() => {
    if (!session || !current) return undefined;
    const planned = current.planned;
    const last = getExerciseHistory(history, current.exerciseId, 1)[0];
    const doneSets = session.exercises.reduce((sum, e) => sum + (e.skipped ? e.sets.length : e.sets.filter((s) => s.done).length), 0);
    const totalSets = session.exercises.reduce((sum, e) => sum + e.sets.length, 0);

    const next = findNextOpenPosition(
      session.exercises.map((e, i) => (i === exerciseIndex && currentSetIndex >= 0
        ? { ...e, sets: e.sets.map((s, si) => (si === currentSetIndex ? { ...s, done: true } : s)) }
        : e)),
      exerciseIndex,
    );
    let nextLabel = t('workout:lastSet');
    if (next && next.exerciseIndex === exerciseIndex) {
      const set = current.sets[next.setIndex];
      const detail = set.weightKg > 0 ? `${fmt.weight(set.weightKg)} × ${set.reps}` : `× ${set.reps}`;
      nextLabel = t('workout:nextSet', { n: next.setIndex + 1, detail, rest: restSecondsFor(planned, 'set') });
    } else if (next) {
      nextLabel = t('workout:nextExercise', { name: nameOf(session.exercises[next.exerciseIndex].exerciseId), rest: restSecondsFor(planned, 'exercise') });
    }

    const suggestion =
      current.suggestion === 'increase'
        ? t('workout:suggestion.increase', { inc: formatWeight(current.suggestionIncrementKg) })
        : current.suggestion === 'recover'
          ? t('workout:suggestion.recover')
          : current.suggestion === 'hold'
            ? t('workout:suggestion.hold')
            : t('workout:firstTime', { reps: planned.repsMin });

    return {
      name: nameOf(current.exerciseId),
      exercise: exercises[current.exerciseId],
      substitutedFor: current.exerciseId !== current.originalExerciseId ? nameOf(current.originalExerciseId) : undefined,
      scheme: `${formatScheme(planned, t)} · ${t('plan:rest', { value: planned.restSec })} · ${formatRir(planned, t)}`,
      note: getPlannedNote(planned, t),
      lastTime: last ? t('workout:lastTime', { sets: formatSetsShort(last.sets, fmt.unitLabel) }) : undefined,
      suggestion,
      suggestionTone: current.suggestion,
      nextLabel,
      position: t('workout:exercisePosition', { current: exerciseIndex + 1, total: session.exercises.length }),
      progress: totalSets === 0 ? 0 : doneSets / totalSets,
      elapsed: formatMmSs((now - new Date(session.startedAt).getTime()) / 1000),
      tabs: session.exercises.map((e, i) => ({
        key: String(i),
        label: `${i + 1}${e.skipped ? ' ✕' : e.sets.every((s) => s.done) ? ' ✓' : ''}`,
      })),
      alternatives: (planned.alternativeIds ?? []).filter((id) => id !== current.exerciseId),
    };
  }, [session, current, exerciseIndex, currentSetIndex, history, exercises, nameOf, fmt, now, t]);

  const finishLabel = isComplete
    ? t('workout:finishWorkout')
    : t('workout:finishSet', { n: Math.max(0, currentSetIndex) + 1 });

  return {
    session,
    current,
    exerciseIndex,
    currentSetIndex,
    isComplete,
    view,
    finishLabel,
    unitLabel: fmt.unitLabel,
    weightStep: settings.weightStepKg,
    isDeload: session?.isDeload ?? false,
    actionsOpen,
    setActionsOpen,
    nameOf,
    actions: {
      changeSet: (setIndex: number, patch: Partial<Pick<ActiveSet, 'weightKg' | 'reps' | 'rir'>>) =>
        dispatch(setValueChanged({ exerciseIndex, setIndex, patch })),
      reopenSet: (setIndex: number) => dispatch(setReopened({ exerciseIndex, setIndex })),
      primary: () => {
        if (isComplete) {
          router.push(routes.workoutSummary);
          return;
        }
        if (currentSetIndex < 0) {
          const next = session ? findNextOpenPosition(session.exercises, exerciseIndex) : null;
          if (next) dispatch(exerciseSelected(next.exerciseIndex));
          return;
        }
        successFeedback();
        dispatch(setCompleted({ exerciseIndex, setIndex: currentSetIndex, now: Date.now(), completedAt: new Date().toISOString() }));
      },
      selectExercise: (index: number) => dispatch(exerciseSelected(index)),
      substitute: (exerciseId: string) => dispatch(exerciseSubstituted({ exerciseIndex, exerciseId })),
      restoreOriginal: () => current && dispatch(exerciseSubstituted({ exerciseIndex, exerciseId: current.originalExerciseId })),
      toggleSkip: () => dispatch(exerciseSkipToggled(exerciseIndex)),
      addSet: () => dispatch(setAdded(exerciseIndex)),
      removeSet: () => dispatch(setRemoved(exerciseIndex)),
      openDetails: () => current && router.push(routes.exercise(current.exerciseId)),
      exit: async () => {
        const discard = await confirm({
          title: t('workout:exit.title'),
          message: t('workout:exit.body'),
          confirmLabel: t('workout:exit.discard'),
          destructive: true,
        });
        if (discard) dispatch(sessionClosed());
        router.back();
      },
      leave: () => router.back(),
    },
  };
}
