import type { IconName } from '@/constants/icons';

export interface WeekPlanRow {
  key: string;
  dayLabel: string;
  icon: IconName;
  title: string;
  highlight: boolean;
  muted: boolean;
}

export interface WeekPlanCardProps {
  title: string;
  hint: string;
  tempo?: string;
  days: WeekPlanRow[];
}
