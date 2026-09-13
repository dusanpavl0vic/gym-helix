import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@/components/ui/IconButton';
import { spacing } from '@/constants/spacing';

import { styles } from './BottomSheet.styles';
import type { BottomSheetProps } from './BottomSheet.types';

export function BottomSheet({ visible, title, onClose, closeLabel, children, footer }: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent navigationBarTranslucent>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel={closeLabel} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.x5 }]}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title} accessibilityRole="header">{title ?? ''}</Text>
            <IconButton icon="close" onPress={onClose} accessibilityLabel={closeLabel} variant="cream" />
          </View>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
          {footer}
        </View>
      </View>
    </Modal>
  );
}
