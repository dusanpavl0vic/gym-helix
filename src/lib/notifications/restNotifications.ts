import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { colors } from '@/constants/colors';
import { REST_NOTIFICATION_CHANNEL, REST_VIBRATION_PATTERN } from '@/constants/timer';

let configured = false;
/** When true, a notification that fires while the app is open still plays the system sound. */
let systemSoundInForeground = false;

export function setSystemSoundInForeground(enabled: boolean): void {
  systemSoundInForeground = enabled;
}

export async function configureRestNotifications(channelName: string): Promise<void> {
  if (!configured) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: systemSoundInForeground,
        shouldSetBadge: false,
        shouldShowBanner: systemSoundInForeground,
        shouldShowList: false,
      }),
    });
    configured = true;
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(REST_NOTIFICATION_CHANNEL, {
      name: channelName,
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: REST_VIBRATION_PATTERN,
      lightColor: colors.lime,
    });
  }
}

export async function ensureNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function scheduleRestEnd(endsAt: number, title: string, body: string, withSound: boolean): Promise<string | null> {
  const seconds = Math.max(1, Math.round((endsAt - Date.now()) / 1000));
  try {
    return await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: withSound ? 'default' : false },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
        channelId: REST_NOTIFICATION_CHANNEL,
      },
    });
  } catch {
    return null;
  }
}

export async function cancelRestNotification(id: string | null): Promise<void> {
  if (!id) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {
    // Already fired or removed.
  }
}
