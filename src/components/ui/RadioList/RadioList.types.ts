import type { IconName } from '@/constants/icons';

export interface RadioItem {
  key: string;
  label: string;
  description?: string;
  icon?: IconName;
}

export interface RadioListProps {
  items: RadioItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
}
