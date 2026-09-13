import * as ImagePicker from 'expo-image-picker';

import { getNotificationPermission, requestNotificationPermission } from '@/lib/notifications/restNotifications';
import type { PermissionKind, PermissionStatus } from '@/types/permissions';

const fromResponse = (response: { granted: boolean; canAskAgain: boolean }): PermissionStatus => ({
  available: true,
  granted: response.granted,
  canAskAgain: response.canAskAgain,
});

export async function getPermissionStatus(kind: PermissionKind): Promise<PermissionStatus> {
  switch (kind) {
    case 'notifications':
      return getNotificationPermission();
    case 'camera':
      return fromResponse(await ImagePicker.getCameraPermissionsAsync());
    case 'photos':
      return fromResponse(await ImagePicker.getMediaLibraryPermissionsAsync());
  }
}

export async function requestPermission(kind: PermissionKind): Promise<PermissionStatus> {
  switch (kind) {
    case 'notifications':
      return requestNotificationPermission();
    case 'camera':
      return fromResponse(await ImagePicker.requestCameraPermissionsAsync());
    case 'photos':
      return fromResponse(await ImagePicker.requestMediaLibraryPermissionsAsync());
  }
}
