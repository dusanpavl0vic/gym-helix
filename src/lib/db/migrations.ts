import type { SQLiteDatabase } from 'expo-sqlite';

import { DB_SCHEMA_VERSION } from '@/constants/storage';

import { SCHEMA_V1 } from './schema';

export async function migrate(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let version = row?.user_version ?? 0;
  if (version >= DB_SCHEMA_VERSION) {
    await db.execAsync('PRAGMA foreign_keys = ON;');
    return;
  }
  if (version === 0) {
    await db.execAsync(SCHEMA_V1);
    version = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${version}`);
}

export async function clearAllTables(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    DELETE FROM logged_sets;
    DELETE FROM session_exercises;
    DELETE FROM sessions;
    DELETE FROM cardio_sessions;
    DELETE FROM body_measurements;
  `);
}
