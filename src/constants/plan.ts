import type { IconName } from '@/constants/icons';
import type { WeekPlanKind } from '@/types/domain';

export const WEEK_PLAN_ICONS: Record<WeekPlanKind, IconName> = {
  strength: 'workout',
  rest: 'rest-day',
  cardio: 'run',
};
