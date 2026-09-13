import { isRunningInExpoGo } from 'expo';
import { Platform } from 'react-native';

import { colors } from '@/constants/colors';
import { REST_NOTIFICATION_CHANNEL, REST_VIBRATION_PATTERN } from '@/constants/timer';
import type { PermissionStatus } from '@/types/permissions';

type NotificationsModule = typeof import('expo-notifications');

/**
 * expo-notifications throws as soon as it is imported in Expo Go on Android (SDK 53+),
 * so it is only loaded lazily, and never inside Expo Go. Dev builds and APKs get full support.
 */
export const notificationsAvailable = !(Platform.OS === 'android' && isRunningInExpoGo());

const UNAVAILABLE: PermissionStatus = { available: false, granted: false, canAskAgain: false };

let notificationsModule: NotificationsModule | null = null;

function loadNotifications(): NotificationsModule | null {
  if (!notificationsAvailable) return null;
  try {
    notificationsModule ??= require('expo-notifications') as NotificationsModule;
  } catch {
    return null;
  }
  return notificationsModule;
}

let configured = false;
/** When true, a notification that fires while the app is open still plays the system sound. */
let systemSoundInForeground = false;

export function setSystemSoundInForeground(enabled: boolean): void {
  systemSoundInForeground = enabled;
}

export async function configureRestNotifications(channelName: string): Promise<void> {
  const Notifications = loadNotifications();
  if (!Notifications) return;
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

export async function getNotificationPermission(): Promise<PermissionStatus> {
  const Notifications = loadNotifications();
  if (!Notifications) return UNAVAILABLE;
  const status = await Notifications.getPermissionsAsync();
  return { available: true, granted: status.granted, canAskAgain: status.canAskAgain };
}

export async function requestNotificationPermission(): Promise<PermissionStatus> {
  const Notifications = loadNotifications();
  if (!Notifications) return UNAVAILABLE;
  const status = await Notifications.requestPermissionsAsync();
  return { available: true, granted: status.granted, canAskAgain: status.canAskAgain };
}

export async function scheduleRestEnd(endsAt: number, title: string, body: string, withSound: boolean): Promise<string | null> {
  const Notifications = loadNotifications();
  if (!Notifications) return null;
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
  const Notifications = loadNotifications();
  if (!id || !Notifications) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {
    // Already fired or removed.
  }
}
