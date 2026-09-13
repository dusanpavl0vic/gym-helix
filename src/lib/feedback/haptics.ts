import * as Haptics from 'expo-haptics';
import { Vibration } from 'react-native';

import { REST_VIBRATION_PATTERN } from '@/constants/timer';

export function restEndVibration(): void {
  Vibration.vibrate(REST_VIBRATION_PATTERN);
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
}

export function warningHaptic(): void {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => undefined);
}

export function tickHaptic(): void {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => undefined);
}

export function tapFeedback(): void {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
}

export function successFeedback(): void {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
}
