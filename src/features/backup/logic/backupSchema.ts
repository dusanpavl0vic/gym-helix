import type { BackupFile } from '@/types/backup';

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export function isBackupFile(value: unknown): value is BackupFile {
  if (!isObject(value)) return false;
  if (value.app !== 'gym-personal' || typeof value.version !== 'number') return false;
  const state = value.state;
  if (!isObject(state)) return false;
  if (!isObject(state.settings) || !isObject(state.programs) || !isObject(state.rotation) || !isObject(state.exercises)) return false;
  if (!isObject(state.programs.programs) || !Array.isArray(state.programs.order)) return false;
  return Array.isArray(value.sessions) && Array.isArray(value.cardio) && Array.isArray(value.body);
}
