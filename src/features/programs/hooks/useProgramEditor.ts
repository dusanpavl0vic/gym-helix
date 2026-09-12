import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { countSets, estimateWorkoutMin } from '@/features/workout/logic/duration';
import { useConfirm } from '@/hooks/useConfirm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { ROTATION_LETTERS } from '../helpers/programMutations';
import { getProgramName, getWorkoutBadge, getWorkoutName } from '../helpers/programText';
import {
  activeProgramSet, programDuplicated, programRenamed, rotationMoved, workoutAdded, workoutRemoved,
} from '../store/programsSlice';
import { selectActiveProgramId, selectProgramById } from '../store/programsSelectors';

export function useProgramEditor() {
  const { t } = useTranslation(['programs', 'common']);
  const { pid } = useLocalSearchParams<{ pid: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const program = useAppSelector((s) => selectProgramById(s, pid));
  const activeId = useAppSelector(selectActiveProgramId);

  const workouts = (program?.rotation ?? [])
    .map((id) => program?.workouts.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))
    .map((w, index) => {
      const name = getWorkoutName(w, t);
      return {
        id: w.id,
        index,
        badge: getWorkoutBadge(name, index),
        name,
        meta: t('programs:workoutEdit.estimate', { minutes: estimateWorkoutMin(w), sets: countSets(w.exercises) }),
      };
    });

  return {
    exists: Boolean(program),
    name: getProgramName(program, t),
    isActive: program?.id === activeId,
    workouts,
    actions: {
      rename: (name: string) => program && name.trim() && dispatch(programRenamed({ programId: program.id, name: name.trim() })),
      activate: () => program && dispatch(activeProgramSet(program.id)),
      duplicate: () => program && dispatch(programDuplicated({ programId: program.id, name: t('programs:copyName', { name: getProgramName(program, t) }) })),
      addWorkout: () =>
        program && dispatch(workoutAdded({ programId: program.id, name: t('programs:edit.newWorkoutName', { letter: ROTATION_LETTERS[program.workouts.length % ROTATION_LETTERS.length] }) })),
      move: (index: number, direction: -1 | 1) => program && dispatch(rotationMoved({ programId: program.id, index, direction })),
      openWorkout: (workoutId: string) => program && router.push(routes.programWorkout(program.id, workoutId)),
      removeWorkout: async (workoutId: string) => {
        const ok = await confirm({ title: t('programs:edit.deleteWorkoutTitle'), message: t('programs:edit.deleteWorkoutBody'), confirmLabel: t('common:delete'), destructive: true });
        if (ok && program) dispatch(workoutRemoved({ programId: program.id, workoutId }));
      },
      back: () => router.back(),
    },
  };
}
