import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: { borderRadius: radii.lg, overflow: 'hidden', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  placeholder: {
    borderRadius: radii.lg,
    backgroundColor: colors.mint,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { ...typography.monoMicro, fontSize: 8, lineHeight: 10, color: colors.forest, textAlign: 'center' },
});
