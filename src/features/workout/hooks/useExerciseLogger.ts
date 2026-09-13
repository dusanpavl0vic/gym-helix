import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { SheetAction } from '@/components/common/ActionSheet';
import { routes } from '@/constants/routes';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { formatRir, formatScheme } from '@/features/plan/helpers/plannedFormat';
import { getPlannedNote } from '@/features/programs/helpers/programText';
import { selectSessions } from '@/features/progress/store/historySelectors';
import { successFeedback } from '@/lib/feedback/haptics';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatWeight } from '@/utils/number';

import { formatSetsShort, getExerciseHistory } from '../helpers/performance';
import { firstOpenSetIndex, nextOpenSetAfter } from '../helpers/position';
import {
  exerciseSelected, exerciseSkipToggled, setAdded, setCompleted, setRemoved, setValueChanged,
} from '../store/activeSessionSlice';
import { selectActiveSession } from '../store/activeSessionSelectors';
import { exerciseSubstituted } from '../store/workoutThunks';

export type KeypadTarget = 'weight' | 'reps';

const round = (value: number) => Math.max(0, Math.round(value * 100) / 100);

export function useExerciseLogger() {
  const { exercise: indexParam } = useLocalSearchParams<{ exercise: string }>();
  const exerciseIndex = Number(indexParam);
  const { t } = useTranslation(['workout', 'plan', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { exercises, nameOf } = useExerciseLookup();
  const session = useAppSelector(selectActiveSession);
  const history = useAppSelector(selectSessions);
  const weightStep = useAppSelector((state) => state.settings.weightStepKg);
  const exercise = session?.exercises[exerciseIndex];
  const kg = t('common:units.kg');

  const [selected, setSelected] = useState(() => {
    const first = exercise ? firstOpenSetIndex(exercise) : 0;
    return first >= 0 ? first : 0;
  });
  const [keypad, setKeypad] = useState<KeypadTarget | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!exercise) router.back();
    }, [exercise, router]),
  );

  useEffect(() => {
    if (exercise && session?.currentExerciseIndex !== exerciseIndex) dispatch(exerciseSelected(exerciseIndex));
  }, [exerciseIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const setCount = exercise?.sets.length ?? 0;
  useEffect(() => {
    if (setCount > 0 && selected > setCount - 1) setSelected(setCount - 1);
  }, [setCount, selected]);

  const lastPerformance = useMemo(
    () => (exercise ? getExerciseHistory(history, exercise.exerciseId, 1)[0] : undefined),
    [history, exercise?.exerciseId], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const set = exercise?.sets[selected];
  const nextOpen = exercise ? firstOpenSetIndex(exercise) : -1;
  const change = (patch: { weightKg?: number | null; reps?: number }) =>
    dispatch(setValueChanged({ exerciseIndex, setIndex: selected, patch }));

  const view = useMemo(() => {
    if (!exercise) return undefined;
    const planned = exercise.planned;
    const suggestionKey = exercise.suggestedWeightKg === null ? 'none' : exercise.suggestion;
    return {
      name: nameOf(exercise.exerciseId),
      exercise: exercises[exercise.exerciseId],
      scheme: `${formatScheme(planned, t)} · ${t('plan:rest', { value: planned.restSec })} · ${formatRir(planned, t)}`,
      note: getPlannedNote(planned, t),
      lastTime: lastPerformance ? t('workout:lastTime', { sets: formatSetsShort(lastPerformance.sets, kg) }) : undefined,
      suggestion: t(`workout:suggestion.${suggestionKey}`, { inc: formatWeight(exercise.incrementKg), min: planned.repsMin, max: planned.repsMax }),
      suggestionTone: suggestionKey,
      substitutedFor: exercise.exerciseId !== exercise.originalExerciseId ? nameOf(exercise.originalExerciseId) : undefined,
      skipped: exercise.skipped,
    };
  }, [exercise, exercises, nameOf, lastPerformance, t, kg]);

  const rows = (exercise?.sets ?? []).map((s, index) => ({
    index,
    label: t('workout:set', { n: index + 1 }),
    value: `${s.weightKg === null ? '—' : formatWeight(s.weightKg)} ${kg} × ${s.reps}`,
    done: s.done,
    selected: index === selected,
    isNext: index === nextOpen,
  }));

  const menuActions: SheetAction[] = exercise
    ? [
        ...(exercise.planned.alternativeIds ?? [])
          .filter((id) => id !== exercise.exerciseId)
          .map((id) => ({ key: `alt-${id}`, icon: 'swap' as const, label: t('workout:actions.substitute', { name: nameOf(id) }), onPress: () => dispatch(exerciseSubstituted({ exerciseIndex, exerciseId: id })) })),
        ...(exercise.exerciseId !== exercise.originalExerciseId
          ? [{ key: 'restore', icon: 'restore' as const, label: t('workout:actions.restoreOriginal'), onPress: () => dispatch(exerciseSubstituted({ exerciseIndex, exerciseId: exercise.originalExerciseId })) }]
          : []),
        { key: 'add', icon: 'plus', label: t('workout:actions.addSet'), onPress: () => dispatch(setAdded(exerciseIndex)) },
        { key: 'remove', icon: 'minus', label: t('workout:actions.removeSet'), onPress: () => dispatch(setRemoved(exerciseIndex)) },
        { key: 'details', icon: 'info', label: t('workout:actions.details'), onPress: () => router.push(routes.exercise(exercise.exerciseId)) },
        {
          key: 'skip',
          icon: exercise.skipped ? 'restore' : 'skip',
          label: exercise.skipped ? t('workout:actions.unskip') : t('workout:actions.skip'),
          destructive: !exercise.skipped,
          onPress: () => {
            dispatch(exerciseSkipToggled(exerciseIndex));
            if (!exercise.skipped) router.back();
          },
        },
      ]
    : [];

  return {
    exists: Boolean(exercise && set),
    position: session ? t('workout:exercisePosition', { current: exerciseIndex + 1, total: session.exercises.length }) : '',
    isDeload: session?.isDeload ?? false,
    view,
    rows,
    unitLabel: kg,
    weightStep,
    editor: set
      ? {
          title: t('workout:setOf', { n: selected + 1, total: setCount }),
          weightText: set.weightKg === null ? '' : formatWeight(set.weightKg),
          repsText: String(set.reps),
          isDone: set.done,
          primaryLabel: set.done ? t('workout:saveEdit') : t('workout:finishSet'),
        }
      : undefined,
    keypad: {
      target: keypad,
      title: keypad === 'reps' ? t('workout:keypad.repsTitle', { n: selected + 1 }) : t('workout:keypad.weightTitle', { n: selected + 1 }),
      initialValue: keypad === 'reps' ? set?.reps ?? null : set?.weightKg ?? null,
      decimal: keypad !== 'reps',
      unitLabel: keypad === 'reps' ? undefined : kg,
      quickSteps: keypad === 'reps' ? [-1, 1] : [-weightStep, weightStep],
      open: setKeypad,
      close: () => setKeypad(null),
      submit: (value: number | null) => {
        if (keypad === 'reps') change({ reps: Math.round(value ?? 0) });
        else change({ weightKg: value === null ? null : round(value) });
        setKeypad(null);
      },
    },
    menu: { open: menuOpen, setOpen: setMenuOpen, actions: menuActions },
    actions: {
      select: setSelected,
      stepWeight: (direction: -1 | 1) => {
        if (!set) return;
        const base = set.weightKg ?? exercise?.suggestedWeightKg ?? 0;
        change({ weightKg: round(base + direction * weightStep) });
      },
      stepReps: (direction: -1 | 1) => set && change({ reps: Math.max(0, set.reps + direction) }),
      primary: () => {
        if (!exercise || !set) return;
        if (set.done) {
          if (nextOpen >= 0) setSelected(nextOpen);
          return;
        }
        successFeedback();
        dispatch(setCompleted({ exerciseIndex, setIndex: selected, now: Date.now(), completedAt: new Date().toISOString() }));
        const after = nextOpenSetAfter({ ...exercise, sets: exercise.sets.map((s, i) => (i === selected ? { ...s, done: true } : s)) }, selected);
        if (after >= 0) setSelected(after);
        else router.back();
      },
      unskip: () => dispatch(exerciseSkipToggled(exerciseIndex)),
      back: () => router.back(),
    },
  };
}
