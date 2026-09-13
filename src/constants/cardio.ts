import type { IconName } from '@/constants/icons';
import type { CardioType } from '@/types/domain';

export const CARDIO_TYPES: CardioType[] = ['run', 'swim', 'walk', 'zone2', 'hiit'];

export const CARDIO_ICONS: Record<CardioType, IconName> = {
  run: 'run',
  swim: 'swim',
  walk: 'walk',
  zone2: 'zone2',
  hiit: 'hiit',
};

export const DEFAULT_CARDIO_DURATION_MIN: Record<CardioType, number> = {
  run: 45,
  swim: 40,
  walk: 30,
  zone2: 35,
  hiit: 20,
};

export const CARDIO_DURATION_STEP_MIN = 5;
export const CARDIO_MAX_DURATION_MIN = 240;
export const RPE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const CARDIO_RECENT_LIMIT = 20;
