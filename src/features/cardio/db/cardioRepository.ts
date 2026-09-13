import { getDb } from '@/lib/db';
import type { CardioSession, CardioType } from '@/types/domain';

interface CardioRow {
  id: string;
  type: CardioType;
  date: string;
  duration_min: number;
  distance_km: number | null;
  avg_heart_rate: number | null;
  rpe: number | null;
  notes: string | null;
}

const toModel = (row: CardioRow): CardioSession => ({
  id: row.id,
  type: row.type,
  date: row.date,
  durationMin: row.duration_min,
  distanceKm: row.distance_km ?? undefined,
  avgHeartRate: row.avg_heart_rate ?? undefined,
  rpe: row.rpe ?? undefined,
  notes: row.notes ?? undefined,
});

export async function loadCardio(): Promise<CardioSession[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<CardioRow>('SELECT * FROM cardio_sessions ORDER BY date DESC');
  return rows.map(toModel);
}

export async function saveCardio(entries: CardioSession[]): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    for (const e of entries) {
      await db.runAsync(
        `INSERT OR REPLACE INTO cardio_sessions (id, type, date, duration_min, distance_km, avg_heart_rate, rpe, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        e.id, e.type, e.date, e.durationMin, e.distanceKm ?? null, e.avgHeartRate ?? null, e.rpe ?? null, e.notes ?? null,
      );
    }
  });
}

export async function deleteCardio(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM cardio_sessions WHERE id = ?', id);
}
