import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

import { DB_NAME } from '@/constants/storage';

import { migrate } from './migrations';

let dbPromise: Promise<SQLiteDatabase> | null = null;

export function getDb(): Promise<SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = openDatabaseAsync(DB_NAME).then(async (db) => {
      await migrate(db);
      return db;
    });
  }
  return dbPromise;
}
