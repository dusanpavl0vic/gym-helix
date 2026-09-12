import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';

import { styles } from './EmptyState.styles';
import type { EmptyStateProps } from './EmptyState.types';

export function EmptyState({ message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{message}</Text>
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} variant="outline" /> : null}
    </View>
  );
}
