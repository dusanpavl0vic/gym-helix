import { View } from 'react-native';

import { Chip } from '@/components/ui/Chip';

import { styles } from './MuscleChips.styles';
import type { MuscleChipsProps } from './MuscleChips.types';

export function MuscleChips({ muscles }: MuscleChipsProps) {
  return (
    <View style={styles.row}>
      {muscles.map((m) => (
        <Chip key={m} label={m} />
      ))}
    </View>
  );
}
