import { useTranslation } from 'react-i18next';

import type { AppLanguage } from '@/constants/config';
import { restEndVibration } from '@/lib/feedback/haptics';
import { playRestSound } from '@/lib/feedback/sound';
import { notificationsAvailable } from '@/lib/notifications/restNotifications';
import { effectiveRestSound } from '@/features/workout/helpers/rest';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { SettingsState } from '@/types/backup';

import { languageChanged, plateToggled, settingsUpdated } from '../store/settingsSlice';
import { selectSettings } from '../store/settingsSelectors';

export function useSettings() {
  const { t } = useTranslation('settings');
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);

  return {
    settings,
    t,
    notificationsAvailable,
    update: (patch: Partial<SettingsState>) => dispatch(settingsUpdated(patch)),
    setLanguage: (language: AppLanguage) => dispatch(languageChanged(language)),
    togglePlate: (plate: number) => dispatch(plateToggled(plate)),
    testSound: () => {
      if (settings.vibration) restEndVibration();
      if (effectiveRestSound(settings.restSound, notificationsAvailable) === 'app') playRestSound();
    },
  };
}
