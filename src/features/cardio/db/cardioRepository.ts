import { getDb } from '@/lib/db';
import type { CardioSession, CardioType } from '@/types/domain';

interface CardioRow { id: string; type: CardioType; date: string; duration_min: number; notes: string | null }

const toModel = (row: CardioRow): CardioSession => ({
  id: row.id, type: row.type, date: row.date, durationMin: row.duration_min, notes: row.notes ?? undefined,
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
        'INSERT OR REPLACE INTO cardio_sessions (id, type, date, duration_min, notes) VALUES (?, ?, ?, ?, ?)',
        e.id, e.type, e.date, e.durationMin, e.notes ?? null,
      );
    }
  });
}

export async function deleteCardio(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM cardio_sessions WHERE id = ?', id);
}
