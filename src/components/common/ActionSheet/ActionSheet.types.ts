import type { IconName } from '@/constants/icons';

export interface SheetAction {
  key: string;
  label: string;
  description?: string;
  icon?: IconName;
  onPress: () => void;
  destructive?: boolean;
  selected?: boolean;
}

export interface ActionSheetProps {
  visible: boolean;
  title?: string;
  actions: SheetAction[];
  onClose: () => void;
  cancelLabel: string;
}
