import type { IconName } from '@/constants/icons';

export interface QuickActionCardProps {
  title: string;
  hint: string;
  icon: IconName;
  onPress: () => void;
}
