import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { AppLanguage } from '@/constants/config';
import { effectiveRestSound } from '@/features/workout/helpers/rest';
import { usePermissionPrompt } from '@/hooks/usePermissionPrompt';
import { restEndVibration, warningHaptic } from '@/lib/feedback/haptics';
import { playRestEndSound, playRestWarningSound } from '@/lib/feedback/sound';
import { notificationsAvailable } from '@/lib/notifications/restNotifications';
import { getPermissionStatus } from '@/lib/permissions/permissions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { SettingsState } from '@/types/backup';
import type { PermissionStatus } from '@/types/permissions';

import { languageChanged, plateToggled, settingsUpdated } from '../store/settingsSlice';
import { selectSettings } from '../store/settingsSelectors';

export function useSettings() {
  const { t } = useTranslation(['settings', 'common']);
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const promptPermission = usePermissionPrompt();
  const [notificationStatus, setNotificationStatus] = useState<PermissionStatus | null>(null);

  const refreshNotificationStatus = useCallback(() => {
    getPermissionStatus('notifications').then(setNotificationStatus).catch(() => undefined);
  }, []);

  useFocusEffect(refreshNotificationStatus);

  const soundMode = effectiveRestSound(settings.restSound, notificationsAvailable);

  return {
    settings,
    t,
    notificationsAvailable,
    needsNotificationPermission: Boolean(notificationStatus?.available && !notificationStatus.granted),
    update: (patch: Partial<SettingsState>) => dispatch(settingsUpdated(patch)),
    setLanguage: (language: AppLanguage) => dispatch(languageChanged(language)),
    togglePlate: (plate: number) => dispatch(plateToggled(plate)),
    allowNotifications: async () => {
      await promptPermission('notifications');
      refreshNotificationStatus();
    },
    testSound: () => {
      if (settings.vibration) restEndVibration();
      if (soundMode === 'app') playRestEndSound();
    },
    testWarning: () => {
      warningHaptic();
      if (soundMode !== 'off') playRestWarningSound();
    },
  };
}
