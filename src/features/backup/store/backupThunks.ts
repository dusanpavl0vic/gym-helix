import { createAsyncThunk } from '@reduxjs/toolkit';

import { saveMeasurements } from '@/features/body/db/bodyRepository';
import { bodyLoaded } from '@/features/body/store/bodySlice';
import { saveCardio } from '@/features/cardio/db/cardioRepository';
import { cardioLoaded } from '@/features/cardio/store/cardioSlice';
import { historyLoaded } from '@/features/progress/store/historySlice';
import { saveSessions } from '@/features/workout/db/sessionsRepository';
import { clearAllTables, getDb } from '@/lib/db';
import type { AppDispatch, RootState } from '@/store';
import { appReset, backupRestored } from '@/store/appActions';
import { migrateToV2 } from '@/store/migrations';
import type { BackupFile } from '@/types/backup';

type ThunkApi = { state: RootState; dispatch: AppDispatch };

export const backupImported = createAsyncThunk<void, BackupFile, ThunkApi>('backup/import', async (file, { dispatch }) => {
  const db = await getDb();
  await clearAllTables(db);
  await saveSessions(file.sessions);
  await saveCardio(file.cardio);
  await saveMeasurements(file.body);
  dispatch(backupRestored(migrateToV2(file.state)));
  await Promise.all([dispatch(historyLoaded()), dispatch(cardioLoaded()), dispatch(bodyLoaded())]);
});

export const allDataReset = createAsyncThunk<void, void, ThunkApi>('backup/reset', async (_, { dispatch }) => {
  const db = await getDb();
  await clearAllTables(db);
  dispatch(appReset());
});

export const persistedDataLoaded = createAsyncThunk<void, void, ThunkApi>('app/loadData', async (_, { dispatch }) => {
  await Promise.all([dispatch(historyLoaded()), dispatch(cardioLoaded()), dispatch(bodyLoaded())]);
});
