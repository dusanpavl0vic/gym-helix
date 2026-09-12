import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  input: {
    ...typography.monoInput,
    color: colors.ink,
    textAlign: 'center',
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    minHeight: metrics.tapTarget,
    paddingVertical: 0,
  },
});
