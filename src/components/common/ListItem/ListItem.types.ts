import type { ReactNode } from 'react';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  leading?: ReactNode;
  trailing?: ReactNode;
  showChevron?: boolean;
}
