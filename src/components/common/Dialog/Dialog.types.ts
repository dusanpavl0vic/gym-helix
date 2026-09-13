import type { ReactNode } from 'react';

import type { ButtonVariant } from '@/components/ui/Button';
import type { IconName } from '@/constants/icons';

export interface DialogAction {
  key: string;
  label: string;
  variant?: ButtonVariant;
  icon?: IconName;
}

export type DialogTone = 'default' | 'danger';

export interface DialogProps {
  visible: boolean;
  title: string;
  message?: string;
  icon?: IconName;
  tone?: DialogTone;
  actions: DialogAction[];
  onAction: (key: string) => void;
  onDismiss: () => void;
  children?: ReactNode;
}
