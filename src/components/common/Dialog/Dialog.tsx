import { Modal, Pressable, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

import { styles } from './Dialog.styles';
import type { DialogProps } from './Dialog.types';

const DIALOG_ICON_SIZE = 28;

export function Dialog({ visible, title, message, icon, tone = 'default', actions, onAction, onDismiss, children }: DialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss} statusBarTranslucent navigationBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <Pressable style={styles.card} accessibilityViewIsModal onPress={() => undefined}>
          {icon ? (
            <View style={[styles.iconCircle, tone === 'danger' && styles.iconCircleDanger]}>
              <Icon name={icon} size={DIALOG_ICON_SIZE} color={tone === 'danger' ? 'danger' : 'forest'} />
            </View>
          ) : null}
          <Text style={styles.title} accessibilityRole="header">{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}
          {children}
          <View style={styles.actions}>
            {actions.map((action) => (
              <Button key={action.key} label={action.label} icon={action.icon} variant={action.variant ?? 'primary'} onPress={() => onAction(action.key)} />
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
