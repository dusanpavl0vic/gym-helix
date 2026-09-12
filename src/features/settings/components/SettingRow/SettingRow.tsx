import { Switch, Text, View } from 'react-native';

import { colors } from '@/constants/colors';

import { styles } from './SettingRow.styles';
import type { SettingRowProps } from './SettingRow.types';

export function SettingRow({ label, value, onChange }: SettingRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        accessibilityLabel={label}
        trackColor={{ true: colors.lime, false: colors.track }}
        thumbColor={value ? colors.forest : colors.paper}
      />
    </View>
  );
}
