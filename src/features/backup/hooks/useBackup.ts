import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-redux';

import { BACKUP_FILE_PREFIX } from '@/constants/storage';
import { useConfirm } from '@/hooks/useConfirm';
import { successFeedback } from '@/lib/feedback/haptics';
import { pickJsonFileText } from '@/lib/files/pickFile';
import { shareJsonFile } from '@/lib/files/shareFile';
import type { RootState } from '@/store';
import { useAppDispatch } from '@/store/hooks';

import { backupFileName, buildBackup } from '../helpers/buildBackup';
import { isBackupFile } from '../logic/backupSchema';
import { allDataReset, backupImported } from '../store/backupThunks';

type Status = { tone: 'success' | 'error'; message: string } | null;

export function useBackup() {
  const { t } = useTranslation(['backup', 'common']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();
  const confirm = useConfirm();
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);

  const run = async (task: () => Promise<void>) => {
    setBusy(true);
    setStatus(null);
    try {
      await task();
    } catch {
      setStatus({ tone: 'error', message: t('common:errors.generic') });
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    status,
    exportData: () =>
      run(async () => {
        const now = new Date();
        const file = buildBackup(store.getState(), now.toISOString());
        await shareJsonFile(backupFileName(BACKUP_FILE_PREFIX, now), JSON.stringify(file, null, 2));
      }),
    importData: () =>
      run(async () => {
        const text = await pickJsonFileText();
        if (text === null) return;
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = null;
        }
        if (!isBackupFile(parsed)) {
          setStatus({ tone: 'error', message: t('backup:importError') });
          return;
        }
        const ok = await confirm({ title: t('backup:importConfirmTitle'), message: t('backup:importConfirmBody'), confirmLabel: t('backup:import'), destructive: true });
        if (!ok) return;
        await dispatch(backupImported(parsed)).unwrap();
        successFeedback();
        setStatus({ tone: 'success', message: t('backup:importSuccess') });
      }),
    resetData: () =>
      run(async () => {
        const ok = await confirm({ title: t('backup:resetConfirmTitle'), message: t('backup:resetConfirmBody'), confirmLabel: t('backup:reset'), destructive: true });
        if (!ok) return;
        await dispatch(allDataReset()).unwrap();
        setStatus({ tone: 'success', message: t('backup:resetDone') });
      }),
    back: () => router.back(),
  };
}
