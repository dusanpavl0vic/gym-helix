import type { IconName } from '@/constants/icons';

export interface SettingRowProps {
  label: string;
  description?: string;
  icon?: IconName;
  value: boolean;
  onChange: (value: boolean) => void;
}
