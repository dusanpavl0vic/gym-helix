import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@/constants/spacing';

import { styles } from './ScreenContainer.styles';
import type { ScreenContainerProps } from './ScreenContainer.types';

export function ScreenContainer({ children, scroll = true, header, footer, contentStyle, withTopInset = true }: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      style={[styles.root, withTopInset && { paddingTop: insets.top }]}
      behavior="padding">
      {header}
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.content, contentStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, contentStyle]}>{children}</View>
      )}
      {footer ? <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.lg }]}>{footer}</View> : null}
    </KeyboardAvoidingView>
  );
}
