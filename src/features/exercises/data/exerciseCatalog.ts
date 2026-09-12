import { REST_SEC_BY_KIND } from '@/constants/training';
import type { Exercise } from '@/types/domain';

import { CATALOG } from './catalog.data';
import { EXERCISE_IMAGES } from './exercises.generated';

export const CATALOG_EXERCISES: Record<string, Exercise> = Object.fromEntries(
  CATALOG.map((entry) => [
    entry.id,
    {
      id: entry.id,
      nameEn: entry.nameEn,
      kind: entry.kind,
      equipment: entry.equipment,
      primaryMuscles: entry.primaryMuscles,
      secondaryMuscles: entry.secondaryMuscles,
      defaultRestSec: REST_SEC_BY_KIND[entry.kind],
      images: EXERCISE_IMAGES[entry.id] ?? [],
    } satisfies Exercise,
  ]),
);

export const CATALOG_IDS = CATALOG.map((e) => e.id);
