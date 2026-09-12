export interface SheetAction {
  key: string;
  label: string;
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
