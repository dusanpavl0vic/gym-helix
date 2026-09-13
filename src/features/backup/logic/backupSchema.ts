import { BACKUP_APP_ID, LEGACY_BACKUP_APP_IDS } from '@/constants/storage';
import type { BackupFile } from '@/types/backup';

const ACCEPTED_APP_IDS: readonly string[] = [BACKUP_APP_ID, ...LEGACY_BACKUP_APP_IDS];

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export function isBackupFile(value: unknown): value is BackupFile {
  if (!isObject(value)) return false;
  if (typeof value.app !== 'string' || !ACCEPTED_APP_IDS.includes(value.app) || typeof value.version !== 'number') return false;
  const state = value.state;
  if (!isObject(state)) return false;
  if (!isObject(state.settings) || !isObject(state.programs) || !isObject(state.rotation) || !isObject(state.exercises)) return false;
  if (!isObject(state.programs.programs) || !Array.isArray(state.programs.order)) return false;
  return Array.isArray(value.sessions) && Array.isArray(value.cardio) && Array.isArray(value.body);
}
