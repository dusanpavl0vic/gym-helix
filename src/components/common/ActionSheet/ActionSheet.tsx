import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { animation } from '@/constants/animation';
import { spacing } from '@/constants/spacing';

import { PressableScale } from '../PressableScale';
import { styles } from './ActionSheet.styles';
import type { ActionSheetProps } from './ActionSheet.types';

export function ActionSheet({ visible, title, actions, onClose, cancelLabel }: ActionSheetProps) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel={cancelLabel}>
        <Animated.View
          entering={SlideInDown.duration(animation.normal)}
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.x5 }]}
          onStartShouldSetResponder={() => true}>
          <View style={styles.handle} />
          {title ? <Text style={styles.title}>{title.toUpperCase()}</Text> : null}
          <ScrollView style={{ maxHeight: 420 }} contentContainerStyle={{ gap: spacing.md }}>
            {actions.map((action) => (
              <PressableScale
                key={action.key}
                accessibilityLabel={action.label}
                style={[styles.action, action.selected && styles.actionSelected]}
                onPress={() => {
                  onClose();
                  action.onPress();
                }}>
                <Text style={[styles.actionText, action.destructive && styles.destructive]}>{action.label}</Text>
              </PressableScale>
            ))}
          </ScrollView>
          <Button label={cancelLabel} onPress={onClose} variant="outline" style={styles.cancel} />
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
