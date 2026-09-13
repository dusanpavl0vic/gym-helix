import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { IconName } from '@/constants/icons';

import { useDialog } from './useDialog';

interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel: string;
  destructive?: boolean;
  icon?: IconName;
}

const CONFIRM_KEY = 'confirm';
const CANCEL_KEY = 'cancel';

export function useConfirm() {
  const { t } = useTranslation('common');
  const dialog = useDialog();
  return useCallback(
    async ({ title, message, confirmLabel, destructive, icon }: ConfirmOptions) => {
      const key = await dialog.show({
        title,
        message,
        icon: icon ?? (destructive ? 'warning' : undefined),
        tone: destructive ? 'danger' : 'default',
        actions: [
          { key: CONFIRM_KEY, label: confirmLabel, variant: destructive ? 'dangerSolid' : 'primary' },
          { key: CANCEL_KEY, label: t('cancel'), variant: 'outline' },
        ],
      });
      return key === CONFIRM_KEY;
    },
    [dialog, t],
  );
}
