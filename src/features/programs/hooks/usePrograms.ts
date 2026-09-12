import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { routes } from '@/constants/routes';
import { useConfirm } from '@/hooks/useConfirm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { getProgramName } from '../helpers/programText';
import {
  activeProgramSet, defaultProgramRestored, programCreated, programDeleted, programDuplicated,
} from '../store/programsSlice';
import { selectActiveProgramId, selectProgramList } from '../store/programsSelectors';

export function usePrograms() {
  const { t } = useTranslation(['programs', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const programs = useAppSelector(selectProgramList);
  const activeId = useAppSelector(selectActiveProgramId);

  return {
    items: programs.map((p) => ({
      id: p.id,
      name: getProgramName(p, t),
      subtitle: t('programs:workoutsCount', { count: p.workouts.length }),
      isActive: p.id === activeId,
      isDefault: Boolean(p.isDefault),
    })),
    canDelete: programs.length > 1,
    actions: {
      open: (id: string) => router.push(routes.program(id)),
      activate: (id: string) => dispatch(activeProgramSet(id)),
      duplicate: (id: string) => {
        const program = programs.find((p) => p.id === id);
        dispatch(programDuplicated({ programId: id, name: t('programs:copyName', { name: getProgramName(program, t) }) }));
      },
      remove: async (id: string) => {
        const ok = await confirm({ title: t('programs:deleteTitle'), message: t('programs:deleteBody'), confirmLabel: t('common:delete'), destructive: true });
        if (ok) dispatch(programDeleted(id));
      },
      create: () => dispatch(programCreated({ name: t('programs:untitled') })),
      restoreDefault: async () => {
        const ok = await confirm({ title: t('programs:restoreTitle'), message: t('programs:restoreBody'), confirmLabel: t('common:confirm') });
        if (ok) dispatch(defaultProgramRestored());
      },
      back: () => router.back(),
    },
  };
}
