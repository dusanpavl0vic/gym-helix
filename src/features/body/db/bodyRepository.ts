import { getDb } from '@/lib/db';
import type { BodyMeasurement } from '@/types/domain';

interface BodyRow {
  id: string; date: string; weight_kg: number | null; waist_cm: number | null;
  arm_cm: number | null; chest_cm: number | null; thigh_cm: number | null;
}

const opt = (v: number | null) => v ?? undefined;
const toModel = (r: BodyRow): BodyMeasurement => ({
  id: r.id, date: r.date, weightKg: opt(r.weight_kg), waistCm: opt(r.waist_cm),
  armCm: opt(r.arm_cm), chestCm: opt(r.chest_cm), thighCm: opt(r.thigh_cm),
});

export async function loadMeasurements(): Promise<BodyMeasurement[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<BodyRow>('SELECT * FROM body_measurements ORDER BY date DESC');
  return rows.map(toModel);
}

export async function saveMeasurements(entries: BodyMeasurement[]): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    for (const m of entries) {
      await db.runAsync(
        `INSERT OR REPLACE INTO body_measurements (id, date, weight_kg, waist_cm, arm_cm, chest_cm, thigh_cm)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        m.id, m.date, m.weightKg ?? null, m.waistCm ?? null, m.armCm ?? null, m.chestCm ?? null, m.thighCm ?? null,
      );
    }
  });
}

export async function deleteMeasurement(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM body_measurements WHERE id = ?', id);
}
