import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatRest, formatRir, formatScheme } from '@/features/plan/helpers/plannedFormat';
import { selectActiveProgram } from '@/features/programs/store/programsSelectors';
import { exerciseSeries } from '@/features/progress/helpers/analytics';
import { selectSessions } from '@/features/progress/store/historySelectors';
import { formatSetsShort } from '@/features/workout/helpers/performance';
import { useFormatters } from '@/hooks/useFormatters';
import { usePermissionPrompt } from '@/hooks/usePermissionPrompt';
import { pickExercisePhoto, type PhotoSource } from '@/lib/files/imagePicker';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { bestSet } from '../logic/e1rm';
import { exercisePhotoSet } from '../store/exercisesSlice';
import { useExercise } from './useExercise';

const HISTORY_ROWS = 12;

export function useExerciseDetail(exerciseId: string) {
  const { t } = useTranslation(['exercises', 'plan']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fmt = useFormatters();
  const promptPermission = usePermissionPrompt();
  const { exercise, name, instructions, muscles } = useExercise(exerciseId);
  const sessions = useAppSelector(selectSessions);
  const program = useAppSelector(selectActiveProgram);

  const series = useMemo(() => exerciseSeries(sessions, exerciseId), [sessions, exerciseId]);

  const record = useMemo(() => {
    const allSets = sessions.flatMap((s) => s.exercises.filter((e) => e.exerciseId === exerciseId).flatMap((e) => e.sets));
    const top = bestSet(allSets);
    const bestE1rm = series.reduce((max, p) => Math.max(max, p.e1rm), 0);
    return {
      heaviest: top ? `${fmt.weight(top.weightKg)} × ${top.reps}` : t('common:none'),
      e1rm: bestE1rm > 0 ? fmt.weight(bestE1rm) : t('common:none'),
    };
  }, [sessions, series, exerciseId, fmt, t]);

  const target = useMemo(() => {
    const planned = program?.workouts.flatMap((w) => w.exercises).find((e) => e.exerciseId === exerciseId);
    return planned ? `${formatScheme(planned, t)} · ${formatRir(planned, t)} · ${formatRest(planned, t)}` : undefined;
  }, [program, exerciseId, t]);

  const log = useMemo(
    () =>
      sessions
        .map((s) => ({ session: s, sets: s.exercises.filter((e) => e.exerciseId === exerciseId).flatMap((e) => e.sets) }))
        .filter((row) => row.sets.length > 0)
        .slice(0, HISTORY_ROWS)
        .map(({ session, sets }) => {
          const top = bestSet(sets);
          return {
            id: session.id,
            date: fmt.shortDate(session.startedAt),
            sets: formatSetsShort(sets, fmt.unitLabel),
            top: top ? fmt.weight(top.weightKg) : '',
          };
        }),
    [sessions, exerciseId, fmt],
  );

  return {
    exercise,
    name,
    instructions,
    muscles,
    record,
    target,
    log,
    canChangePhoto: Boolean(exercise?.isCustom),
    changePhoto: async (source: PhotoSource) => {
      if (!(await promptPermission(source === 'camera' ? 'camera' : 'photos'))) return;
      const uri = await pickExercisePhoto(source, exerciseId);
      if (uri) dispatch(exercisePhotoSet({ exerciseId, uri }));
    },
    back: () => router.back(),
  };
}
