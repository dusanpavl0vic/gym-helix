import { Switch, Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';
import { colors } from '@/constants/colors';

import { styles } from './SettingRow.styles';
import type { SettingRowProps } from './SettingRow.types';

export function SettingRow({ label, description, icon, value, onChange }: SettingRowProps) {
  return (
    <View style={styles.row}>
      {icon ? <Icon name={icon} size={22} color="forest" /> : null}
      <View style={styles.texts}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <Switch value={value} onValueChange={onChange} accessibilityLabel={label} trackColor={{ true: colors.lime, false: colors.track }} thumbColor={value ? colors.forest : colors.paper} />
    </View>
  );
}
