import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { HOME_HISTORY_LIMIT } from '@/constants/training';
import { measurementAdded } from '@/features/body/store/bodySlice';
import { selectMeasurements } from '@/features/body/store/bodySelectors';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { deloadDismissed, deloadStarted } from '@/features/plan/store/rotationSlice';
import { selectActiveRotation, selectIsDeloadDue, selectNextWorkout } from '@/features/plan/store/rotationSelectors';
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
import { isSameDayIso, weekStart } from '@/utils/date';
import { createId } from '@/utils/id';

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
  const deloadDue = useAppSelector(selectIsDeloadDue);
  const activeSession = useAppSelector(selectActiveSession);
  const sessions = useAppSelector(selectSessions);
  const measurements = useAppSelector(selectMeasurements);
  const week = useWeekActivity();
  const [chooserOpen, setChooserOpen] = useState(false);

  const workoutName = activeSession?.workoutName ?? getWorkoutName(nextWorkout, t);

  const card = useMemo(() => {
    if (!nextWorkout) return undefined;
    return {
      title: workoutName,
      focus: getWorkoutFocus(nextWorkout, t),
      meta: t('home:meta', {
        exercises: nextWorkout.exercises.length,
        minutes: estimateWorkoutMin(nextWorkout),
        sets: countSets(nextWorkout.exercises),
      }),
      tags: nextWorkout.exercises.slice(0, 3).map((e) => nameOf(e.exerciseId)),
    };
  }, [nextWorkout, workoutName, t, nameOf]);

  const stats = useMemo(() => {
    const start = weekStart(new Date()).toISOString();
    const thisWeek = sessions.filter((s) => s.startedAt >= start);
    return [
      { key: 'week', value: String(thisWeek.length), label: t('home:stats.thisWeek') },
      { key: 'volume', value: fmt.tonnes(thisWeek.reduce((sum, s) => sum + sessionVolumeKg(s), 0)), label: t('home:stats.volume') },
      { key: 'cycle', value: String(rotation?.cycleNumber ?? 1), label: t('home:stats.cycle') },
    ];
  }, [sessions, rotation, fmt, t]);

  const history = useMemo(
    () =>
      sessions.slice(0, HOME_HISTORY_LIMIT).map((s) => {
        const workoutIndex = program?.workouts.findIndex((w) => w.id === s.workoutId) ?? 0;
        return {
          id: s.id,
          badge: getWorkoutBadge(s.workoutName, Math.max(0, workoutIndex)),
          title: s.workoutName,
          meta: t('home:historyMeta', {
            day: fmt.weekdayAbbr(s.startedAt),
            minutes: fmt.minutesBetween(s.startedAt, s.finishedAt),
            sets: sessionSetCount(s),
          }),
          volume: fmt.tonnes(sessionVolumeKg(s)),
        };
      }),
    [sessions, program, fmt, t],
  );

  const todayWeight = measurements.find((m) => m.weightKg !== undefined && isSameDayIso(m.date, new Date()))?.weightKg;
  const lastWhen = fmt.relativeDays(rotation?.lastCompletedAt);

  return {
    greeting: t('home:greeting', { name: athleteName }),
    initial: athleteName.trim().charAt(0).toUpperCase(),
    dateLabel: fmt.dayHeader(new Date()),
    card,
    hasActive: Boolean(activeSession),
    lastWorkoutLabel: lastWhen ? t('home:lastWorkout', { when: lastWhen }) : t('home:noWorkoutsYet'),
    deload: {
      due: deloadDue,
      active: Boolean(rotation?.deloadActive),
      remaining: rotation?.deloadRemaining ?? 0,
    },
    week,
    stats,
    history,
    todayWeight,
    unitLabel: fmt.unitLabel,
    chooser: {
      open: chooserOpen,
      setOpen: setChooserOpen,
      options: (program?.workouts ?? []).map((w) => ({
        id: w.id,
        label: getWorkoutName(w, t),
        selected: w.id === nextWorkout?.id,
      })),
    },
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
      startDeload: () => program && dispatch(deloadStarted({ programId: program.id, rotationLength: program.rotation.length })),
      dismissDeload: () => program && dispatch(deloadDismissed(program.id)),
      saveWeight: (kg: number) => dispatch(measurementAdded({ id: createId('m_'), date: new Date().toISOString(), weightKg: kg })),
      openSession: (id: string) => router.push(routes.session(id)),
      openProgress: () => router.push(routes.progress),
      openCardio: () => router.push(routes.cardio),
      openPlan: () => router.push(routes.plan),
    },
  };
}
