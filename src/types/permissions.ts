export type PermissionKind = 'notifications' | 'camera' | 'photos';

export interface PermissionStatus {
  /** False when the capability does not exist in this runtime (e.g. notifications in Expo Go). */
  available: boolean;
  granted: boolean;
  canAskAgain: boolean;
}
