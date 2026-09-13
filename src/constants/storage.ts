export const PERSIST_KEY = 'gym-personal-root';
export const PERSIST_VERSION = 2;
export const DB_NAME = 'gympersonal.db';
export const DB_SCHEMA_VERSION = 2;
export const BACKUP_FORMAT_VERSION = 1;
export const BACKUP_FILE_PREFIX = 'helix-backup';
export const BACKUP_APP_ID = 'helix';
/** Backups written before the rename are still accepted. */
export const LEGACY_BACKUP_APP_IDS = ['gym-personal'] as const;
