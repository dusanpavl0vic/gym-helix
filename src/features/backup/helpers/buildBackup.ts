import { BACKUP_APP_ID, BACKUP_FORMAT_VERSION } from '@/constants/storage';
import type { RootState } from '@/store';
import type { BackupFile } from '@/types/backup';

export function buildBackup(state: RootState, exportedAt: string): BackupFile {
  return {
    app: BACKUP_APP_ID,
    version: BACKUP_FORMAT_VERSION,
    exportedAt,
    state: {
      settings: state.settings,
      programs: state.programs,
      rotation: state.rotation,
      exercises: state.exercises,
    },
    sessions: state.history.sessions,
    cardio: state.cardio.entries,
    body: state.body.measurements,
  };
}

export const backupFileName = (prefix: string, date: Date): string =>
  `${prefix}-${date.toISOString().slice(0, 10)}.json`;
