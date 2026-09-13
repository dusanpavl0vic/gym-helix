import type { ReactNode } from 'react';

export interface BottomSheetProps {
  visible: boolean;
  title?: string;
  onClose: () => void;
  closeLabel: string;
  children: ReactNode;
  footer?: ReactNode;
}
