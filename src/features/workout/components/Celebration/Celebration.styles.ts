import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export const BADGE = 112;

export const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', height: BADGE + 60 },
  badge: { width: BADGE, height: BADGE, borderRadius: BADGE / 2, backgroundColor: colors.forest, alignItems: 'center', justifyContent: 'center' },
  check: { ...typography.monoXL, fontSize: 48, lineHeight: 56, color: colors.lime },
  spark: { position: 'absolute', width: 10, height: 10, borderRadius: 5 },
  label: { ...typography.h2, color: colors.ink, marginTop: 12 },
});

export const SPARK_COLORS = [colors.lime, colors.forest, colors.mintSoft, colors.forestLight];
