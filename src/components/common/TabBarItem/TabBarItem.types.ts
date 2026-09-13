import type { IconName } from '@/constants/icons';

export interface TabBarItemProps {
  label: string;
  icon: IconName;
  focused: boolean;
  onPress: () => void;
}
