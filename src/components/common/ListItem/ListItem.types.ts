import type { ReactNode } from 'react';

import type { ColorName } from '@/constants/colors';
import type { IconName } from '@/constants/icons';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  icon?: IconName;
  iconColor?: ColorName;
  leading?: ReactNode;
  trailing?: ReactNode;
  showChevron?: boolean;
}
