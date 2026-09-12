import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { height: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  bar: { height: 12, backgroundColor: colors.borderStrong, borderRadius: 3 },
  sleeve: { width: 60, height: 18, backgroundColor: colors.mutedLight, borderRadius: 3 },
  collar: { width: 10, height: 34, backgroundColor: colors.slate, borderRadius: 3 },
  plates: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  plate: { width: 18, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  plateText: { ...typography.monoMicro, fontSize: 8, color: colors.paperWarm, transform: [{ rotate: '-90deg' }], width: 60, textAlign: 'center' },
});

export const plateColor = (kg: number) =>
  kg >= 20 ? colors.ink : kg >= 10 ? colors.forest : kg >= 5 ? colors.forestLight : colors.lime;
