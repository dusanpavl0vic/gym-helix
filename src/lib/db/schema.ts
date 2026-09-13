export const SCHEMA_V1 = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY NOT NULL,
  program_id TEXT NOT NULL,
  workout_id TEXT NOT NULL,
  workout_name TEXT NOT NULL,
  started_at TEXT NOT NULL,
  finished_at TEXT,
  bodyweight_kg REAL,
  notes TEXT,
  is_deload INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions (started_at);

CREATE TABLE IF NOT EXISTS session_exercises (
  session_id TEXT NOT NULL REFERENCES sessions (id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  exercise_id TEXT NOT NULL,
  skipped INTEGER NOT NULL DEFAULT 0,
  substituted_for TEXT,
  PRIMARY KEY (session_id, position)
);

CREATE TABLE IF NOT EXISTS logged_sets (
  session_id TEXT NOT NULL REFERENCES sessions (id) ON DELETE CASCADE,
  exercise_position INTEGER NOT NULL,
  exercise_id TEXT NOT NULL,
  set_index INTEGER NOT NULL,
  weight_kg REAL NOT NULL,
  reps INTEGER NOT NULL,
  rir INTEGER,
  completed_at TEXT NOT NULL,
  PRIMARY KEY (session_id, exercise_position, set_index)
);
CREATE INDEX IF NOT EXISTS idx_sets_exercise ON logged_sets (exercise_id, completed_at);

CREATE TABLE IF NOT EXISTS cardio_sessions (
  id TEXT PRIMARY KEY NOT NULL,
  type TEXT NOT NULL,
  date TEXT NOT NULL,
  duration_min INTEGER NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS body_measurements (
  id TEXT PRIMARY KEY NOT NULL,
  date TEXT NOT NULL,
  weight_kg REAL,
  waist_cm REAL,
  arm_cm REAL,
  chest_cm REAL,
  thigh_cm REAL
);
`;

export const SCHEMA_V2 = `
ALTER TABLE cardio_sessions ADD COLUMN distance_km REAL;
ALTER TABLE cardio_sessions ADD COLUMN avg_heart_rate INTEGER;
ALTER TABLE cardio_sessions ADD COLUMN rpe INTEGER;
`;
