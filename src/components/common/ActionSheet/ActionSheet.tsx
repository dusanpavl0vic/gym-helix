import { Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';

import { BottomSheet } from '../BottomSheet';
import { PressableScale } from '../PressableScale';
import { styles } from './ActionSheet.styles';
import type { ActionSheetProps } from './ActionSheet.types';

export function ActionSheet({ visible, title, actions, onClose, cancelLabel }: ActionSheetProps) {
  return (
    <BottomSheet visible={visible} title={title} onClose={onClose} closeLabel={cancelLabel}>
      {actions.map((action) => (
        <PressableScale
          key={action.key}
          accessibilityLabel={action.label}
          style={[styles.action, action.selected && styles.actionSelected]}
          onPress={() => {
            onClose();
            action.onPress();
          }}>
          {action.icon ? <Icon name={action.icon} size={22} color={action.destructive ? 'danger' : 'forest'} /> : null}
          <View style={styles.texts}>
            <Text style={[styles.label, action.destructive && styles.destructive]}>{action.label}</Text>
            {action.description ? <Text style={styles.description}>{action.description}</Text> : null}
          </View>
          {action.selected ? <Icon name="status-done" size={22} color="forest" /> : null}
        </PressableScale>
      ))}
    </BottomSheet>
  );
}
