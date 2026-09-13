import { useTranslation } from 'react-i18next';

import { REST_EXTEND_SEC } from '@/constants/timer';
import { useExerciseLookup } from '@/features/exercises/hooks/useExercise';
import { useAppSelector } from '@/store/hooks';
import { formatWeight } from '@/utils/number';

import { firstOpenSetIndex } from '../../helpers/position';
import { useRestTimer } from '../../hooks/useRestTimer';
import { selectActiveSession } from '../../store/activeSessionSelectors';
import { RestOverlay } from '../RestOverlay';

/** Owns the rest timer for the whole workout flow, so rest keeps running while switching screens. */
export function RestOverlayHost() {
  const { t } = useTranslation(['workout', 'common']);
  const session = useAppSelector(selectActiveSession);
  const { nameOf } = useExerciseLookup();
  const restExercise = session?.rest ? session.exercises[session.rest.exerciseIndex] : undefined;
  const name = restExercise ? nameOf(restExercise.exerciseId) : '';
  const timer = useRestTimer(name);

  if (!timer.rest || !restExercise) return null;

  const exerciseDone = timer.rest.kind === 'exercise';
  const nextIndex = firstOpenSetIndex(restExercise);
  const nextSet = nextIndex >= 0 ? restExercise.sets[nextIndex] : undefined;
  const kg = t('common:units.kg');

  return (
    <RestOverlay
      title={t('workout:rest.title')}
      kindLabel={exerciseDone ? t('workout:rest.exerciseDone') : t('workout:rest.nextSet')}
      remainingSec={timer.remainingSec}
      progress={timer.progress}
      ofLabel={t('workout:rest.of', { total: timer.rest.totalSec })}
      nextTitle={exerciseDone || !nextSet ? t('workout:rest.chooseNext', { name }) : t('workout:rest.setOf', { n: nextIndex + 1, name })}
      nextMeta={exerciseDone || !nextSet ? t('workout:rest.chooseNextHint') : `${nextSet.weightKg === null ? '—' : formatWeight(nextSet.weightKg)} ${kg} × ${nextSet.reps}`}
      extendLabel={t('workout:rest.extend', { sec: REST_EXTEND_SEC })}
      skipLabel={t('workout:rest.skip')}
      onExtend={() => timer.extend(REST_EXTEND_SEC)}
      onSkip={timer.skip}
    />
  );
}
