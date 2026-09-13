import type { IconName } from '@/constants/icons';
import type { PermissionKind } from '@/types/permissions';

export const PERMISSION_ICONS: Record<PermissionKind, IconName> = {
  notifications: 'bell',
  camera: 'camera',
  photos: 'gallery',
};
