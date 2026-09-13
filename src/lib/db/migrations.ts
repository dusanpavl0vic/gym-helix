import type { SQLiteDatabase } from 'expo-sqlite';

import { DB_SCHEMA_VERSION } from '@/constants/storage';

import { SCHEMA_V1, SCHEMA_V2 } from './schema';

const STEPS: Record<number, string> = { 1: SCHEMA_V1, 2: SCHEMA_V2 };

export async function migrate(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let version = row?.user_version ?? 0;
  while (version < DB_SCHEMA_VERSION) {
    version += 1;
    await db.execAsync(STEPS[version]);
    await db.execAsync(`PRAGMA user_version = ${version}`);
  }
  await db.execAsync('PRAGMA foreign_keys = ON;');
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
