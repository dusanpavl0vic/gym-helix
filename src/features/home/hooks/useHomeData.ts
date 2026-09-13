import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { HOME_HISTORY_LIMIT, WEEK_DAYS } from '@/constants/training';
import { measurementAdded } from '@/features/body/store/bodySlice';
import { selectMeasurements } from '@/features/body/store/bodySelectors';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { selectActiveRotation, selectIsDeloadWeek, selectNextWorkout, selectTrainingWeek } from '@/features/plan/store/rotationSelectors';
import { getWorkoutBadge, getWorkoutFocus, getWorkoutName } from '@/features/programs/helpers/programText';
import { selectActiveProgram } from '@/features/programs/store/programsSelectors';
import { sessionSetCount, sessionVolumeKg } from '@/features/progress/logic/volume';
import { selectSessions } from '@/features/progress/store/historySelectors';
import { selectAthleteName } from '@/features/settings/store/settingsSelectors';
import { countSets, estimateWorkoutMin } from '@/features/workout/logic/duration';
import { selectActiveSession } from '@/features/workout/store/activeSessionSelectors';
import { workoutStarted } from '@/features/workout/store/workoutThunks';
import { useFormatters } from '@/hooks/useFormatters';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { dateForWeekday, daysSince, isSameDayIso, weekStart } from '@/utils/date';
import { createId } from '@/utils/id';
import { formatWeight } from '@/utils/number';

import { useWeekActivity } from './useWeekActivity';

export function useHomeData() {
  const { t } = useTranslation(['home', 'common', 'programs']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fmt = useFormatters();
  const { nameOf } = useExerciseLookup();

  const athleteName = useAppSelector(selectAthleteName);
  const program = useAppSelector(selectActiveProgram);
  const rotation = useAppSelector(selectActiveRotation);
  const nextWorkout = useAppSelector(selectNextWorkout);
  const isDeloadWeek = useAppSelector(selectIsDeloadWeek);
  const trainingWeek = useAppSelector(selectTrainingWeek);
  const activeSession = useAppSelector(selectActiveSession);
  const sessions = useAppSelector(selectSessions);
  const measurements = useAppSelector(selectMeasurements);
  const weekDays = useWeekActivity();
  const [chooserOpen, setChooserOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);

  const dayLabelFor = (workoutId: string) => {
    const day = program?.weekPlan?.find((d) => d.kind === 'strength' && d.workoutId === workoutId);
    return day ? fmt.weekdayAbbr(dateForWeekday(day.weekday).toISOString()) : undefined;
  };

  const card = useMemo(() => {
    if (!nextWorkout) return undefined;
    return {
      title: activeSession?.workoutName ?? getWorkoutName(nextWorkout, t),
      focus: getWorkoutFocus(nextWorkout, t),
      meta: t('home:meta', { exercises: nextWorkout.exercises.length, minutes: estimateWorkoutMin(nextWorkout), sets: countSets(nextWorkout.exercises) }),
      tags: nextWorkout.exercises.slice(0, 3).map((e) => nameOf(e.exerciseId)),
    };
  }, [nextWorkout, activeSession, t, nameOf]);

  const stats = useMemo(() => {
    const start = weekStart(new Date()).toISOString();
    const thisWeek = sessions.filter((s) => s.startedAt >= start);
    return [
      { key: 'week', value: String(thisWeek.length), label: t('home:stats.thisWeek') },
      { key: 'volume', value: fmt.tonnes(thisWeek.reduce((sum, s) => sum + sessionVolumeKg(s), 0)), label: t('home:stats.volume') },
      { key: 'cycle', value: String(trainingWeek), label: t('home:stats.cycle') },
    ];
  }, [sessions, trainingWeek, fmt, t]);

  const history = useMemo(
    () =>
      sessions.slice(0, HOME_HISTORY_LIMIT).map((s) => {
        const workoutIndex = program?.workouts.findIndex((w) => w.id === s.workoutId) ?? 0;
        return {
          id: s.id,
          badge: getWorkoutBadge(s.workoutName, Math.max(0, workoutIndex)),
          title: s.workoutName,
          meta: t('home:historyMeta', { day: fmt.weekdayAbbr(s.startedAt), minutes: fmt.minutesBetween(s.startedAt, s.finishedAt), sets: sessionSetCount(s) }),
          volume: fmt.tonnes(sessionVolumeKg(s)),
        };
      }),
    [sessions, program, fmt, t],
  );

  const weight = useMemo(() => {
    const withWeight = measurements.filter((m) => m.weightKg !== undefined);
    const latest = withWeight[0];
    if (!latest || latest.weightKg === undefined) {
      return { value: undefined, caption: t('home:weight.empty'), delta: undefined, initialValue: null };
    }
    const weekAgo = withWeight.find((m) => (daysSince(m.date) ?? 0) >= WEEK_DAYS);
    const delta = weekAgo?.weightKg !== undefined ? Math.round((latest.weightKg - weekAgo.weightKg) * 10) / 10 : undefined;
    return {
      value: formatWeight(latest.weightKg),
      caption: isSameDayIso(latest.date, new Date()) ? t('home:weight.today') : t('home:weight.lastOn', { date: fmt.dayMonth(latest.date) }),
      delta: delta === undefined ? undefined : t('home:weight.delta', { value: `${delta > 0 ? '+' : ''}${formatWeight(delta)}` }),
      initialValue: latest.weightKg,
    };
  }, [measurements, fmt, t]);

  const lastWhen = fmt.relativeDays(rotation?.lastCompletedAt);

  return {
    greeting: t('home:greeting', { name: athleteName }),
    initial: athleteName.trim().charAt(0).toUpperCase(),
    dateLabel: fmt.dayHeader(new Date()),
    card,
    weekBadge: t('home:weekBadge', { week: trainingWeek }),
    hasActive: Boolean(activeSession),
    lastWorkoutLabel: lastWhen ? t('home:lastWorkout', { when: lastWhen }) : t('home:noWorkoutsYet'),
    isDeloadWeek,
    trainingWeek,
    weekDays,
    stats,
    history,
    weight,
    chooser: {
      open: chooserOpen,
      setOpen: setChooserOpen,
      options: (program?.workouts ?? []).map((w, index) => {
        const name = getWorkoutName(w, t);
        return {
          id: w.id,
          badge: getWorkoutBadge(name, index),
          name,
          focus: getWorkoutFocus(w, t),
          meta: t('home:chooser.meta', { exercises: w.exercises.length, minutes: estimateWorkoutMin(w) }),
          dayLabel: dayLabelFor(w.id),
          isNext: w.id === nextWorkout?.id,
        };
      }),
    },
    weightDialog: { open: weightOpen, setOpen: setWeightOpen },
    actions: {
      start: (workoutId = nextWorkout?.id) => {
        if (activeSession) {
          router.push(routes.workout);
          return;
        }
        const workout = program?.workouts.find((w) => w.id === workoutId);
        if (!workout) return;
        dispatch(workoutStarted({ workoutId: workout.id, workoutName: getWorkoutName(workout, t) }));
        router.push(routes.workout);
      },
      saveWeight: (kg: number) => dispatch(measurementAdded({ id: createId('m_'), date: new Date().toISOString(), weightKg: kg })),
      openSession: (id: string) => router.push(routes.session(id)),
      openProgress: () => router.push(routes.progress),
      openCardio: () => router.push(routes.cardio),
      openPlan: () => router.push(routes.plan),
    },
  };
}
