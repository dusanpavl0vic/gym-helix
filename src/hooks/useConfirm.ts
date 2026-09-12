import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel: string;
  destructive?: boolean;
}

export function useConfirm() {
  const { t } = useTranslation('common');
  return useCallback(
    ({ title, message, confirmLabel, destructive }: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        Alert.alert(title, message, [
          { text: t('cancel'), style: 'cancel', onPress: () => resolve(false) },
          { text: confirmLabel, style: destructive ? 'destructive' : 'default', onPress: () => resolve(true) },
        ], { cancelable: true, onDismiss: () => resolve(false) });
      }),
    [t],
  );
}
