import type { SQLiteDatabase } from 'expo-sqlite';

import { getDb } from '@/lib/db';
import type { LoggedExercise, Session } from '@/types/domain';

interface SessionRow {
  id: string;
  program_id: string;
  workout_id: string;
  workout_name: string;
  started_at: string;
  finished_at: string | null;
  bodyweight_kg: number | null;
  notes: string | null;
  is_deload: number;
}
interface ExerciseRow { session_id: string; position: number; exercise_id: string; skipped: number; substituted_for: string | null }
interface SetRow { session_id: string; exercise_position: number; set_index: number; weight_kg: number; reps: number; rir: number | null; completed_at: string }

async function insertSession(db: SQLiteDatabase, session: Session) {
  await db.runAsync(
    `INSERT OR REPLACE INTO sessions (id, program_id, workout_id, workout_name, started_at, finished_at, bodyweight_kg, notes, is_deload)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    session.id, session.programId, session.workoutId, session.workoutName, session.startedAt,
    session.finishedAt ?? null, session.bodyweightKg ?? null, session.notes ?? null, session.isDeload ? 1 : 0,
  );
  for (const [position, exercise] of session.exercises.entries()) {
    await db.runAsync(
      'INSERT OR REPLACE INTO session_exercises (session_id, position, exercise_id, skipped, substituted_for) VALUES (?, ?, ?, ?, ?)',
      session.id, position, exercise.exerciseId, exercise.skipped ? 1 : 0, exercise.substitutedFor ?? null,
    );
    for (const set of exercise.sets) {
      await db.runAsync(
        `INSERT OR REPLACE INTO logged_sets (session_id, exercise_position, exercise_id, set_index, weight_kg, reps, rir, completed_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        session.id, position, exercise.exerciseId, set.setIndex, set.weightKg, set.reps, set.rir ?? null, set.completedAt,
      );
    }
  }
}

export async function saveSession(session: Session): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(() => insertSession(db, session));
}

export async function saveSessions(sessions: Session[]): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    for (const session of sessions) await insertSession(db, session);
  });
}

export async function loadSessions(): Promise<Session[]> {
  const db = await getDb();
  const [sessions, exercises, sets] = await Promise.all([
    db.getAllAsync<SessionRow>('SELECT * FROM sessions ORDER BY started_at DESC'),
    db.getAllAsync<ExerciseRow>('SELECT * FROM session_exercises ORDER BY session_id, position'),
    db.getAllAsync<SetRow>('SELECT * FROM logged_sets ORDER BY session_id, exercise_position, set_index'),
  ]);

  const exercisesBySession = new Map<string, LoggedExercise[]>();
  for (const row of exercises) {
    const list = exercisesBySession.get(row.session_id) ?? [];
    list[row.position] = {
      exerciseId: row.exercise_id,
      sets: [],
      skipped: row.skipped === 1 || undefined,
      substitutedFor: row.substituted_for ?? undefined,
    };
    exercisesBySession.set(row.session_id, list);
  }
  for (const row of sets) {
    const exercise = exercisesBySession.get(row.session_id)?.[row.exercise_position];
    exercise?.sets.push({
      setIndex: row.set_index,
      weightKg: row.weight_kg,
      reps: row.reps,
      rir: row.rir ?? undefined,
      completedAt: row.completed_at,
    });
  }

  return sessions.map((row) => ({
    id: row.id,
    programId: row.program_id,
    workoutId: row.workout_id,
    workoutName: row.workout_name,
    startedAt: row.started_at,
    finishedAt: row.finished_at ?? undefined,
    bodyweightKg: row.bodyweight_kg ?? undefined,
    notes: row.notes ?? undefined,
    isDeload: row.is_deload === 1,
    exercises: (exercisesBySession.get(row.id) ?? []).filter(Boolean),
  }));
}

export async function deleteSession(id: string): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM logged_sets WHERE session_id = ?', id);
    await db.runAsync('DELETE FROM session_exercises WHERE session_id = ?', id);
    await db.runAsync('DELETE FROM sessions WHERE id = ?', id);
  });
}
