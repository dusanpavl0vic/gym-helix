import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { width: metrics.restRingSize, height: metrics.restRingSize, alignItems: 'center', justifyContent: 'center' },
  pulse: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: metrics.restRingSize / 2, backgroundColor: colors.lime },
  svg: { position: 'absolute', transform: [{ rotate: '-90deg' }] },
  center: { alignItems: 'center', gap: 2 },
  remaining: { ...typography.monoXL, color: colors.paperWarm },
  total: { ...typography.caption, color: colors.sage },
});
