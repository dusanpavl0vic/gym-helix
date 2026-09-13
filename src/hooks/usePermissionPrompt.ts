import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PERMISSION_ICONS } from '@/constants/permissions';
import { getPermissionStatus, requestPermission } from '@/lib/permissions/permissions';
import type { PermissionKind } from '@/types/permissions';

import { useDialog } from './useDialog';

const ALLOW_KEY = 'allow';
const SETTINGS_KEY = 'settings';
const LATER_KEY = 'later';

/** Explains why a permission is needed in an in-app dialog before the system prompt. */
export function usePermissionPrompt() {
  const { t } = useTranslation('common');
  const dialog = useDialog();

  return useCallback(
    async (kind: PermissionKind): Promise<boolean> => {
      const status = await getPermissionStatus(kind);
      if (!status.available) return false;
      if (status.granted) return true;

      const icon = PERMISSION_ICONS[kind];
      const later = { key: LATER_KEY, label: t('permissions.notNow'), variant: 'outline' as const };

      if (!status.canAskAgain) {
        const key = await dialog.show({
          icon,
          title: t(`permissions.${kind}.title`),
          message: t(`permissions.${kind}.denied`),
          actions: [{ key: SETTINGS_KEY, label: t('permissions.openSettings'), variant: 'primary', icon: 'settings' }, later],
        });
        if (key === SETTINGS_KEY) Linking.openSettings().catch(() => undefined);
        return false;
      }

      const key = await dialog.show({
        icon,
        title: t(`permissions.${kind}.title`),
        message: t(`permissions.${kind}.body`),
        actions: [{ key: ALLOW_KEY, label: t('permissions.allow'), variant: 'primary' }, later],
      });
      if (key !== ALLOW_KEY) return false;
      return (await requestPermission(kind)).granted;
    },
    [dialog, t],
  );
}
