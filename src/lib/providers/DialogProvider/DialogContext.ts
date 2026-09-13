import { createContext } from 'react';

import type { DialogAction, DialogTone } from '@/components/common/Dialog';
import type { IconName } from '@/constants/icons';

export interface DialogOptions {
  title: string;
  message?: string;
  icon?: IconName;
  tone?: DialogTone;
  actions: DialogAction[];
}

export interface DialogContextValue {
  /** Resolves with the pressed action key, or null when dismissed. */
  show: (options: DialogOptions) => Promise<string | null>;
}

export const DialogContext = createContext<DialogContextValue | null>(null);
