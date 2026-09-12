import { createAction } from '@reduxjs/toolkit';

import type { BackupPersistedState } from '@/types/backup';

/** Resets every slice to its initial state. */
export const appReset = createAction('app/reset');

/** Replaces persisted slices with data from a backup file. */
export const backupRestored = createAction<BackupPersistedState>('app/backupRestored');
