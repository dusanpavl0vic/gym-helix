import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { width: '100%' },
  grow: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, transformOrigin: 'bottom' },
  empty: { alignItems: 'center', justifyContent: 'center' },
  emptyText: { ...typography.caption, color: colors.muted, textAlign: 'center' },
});
