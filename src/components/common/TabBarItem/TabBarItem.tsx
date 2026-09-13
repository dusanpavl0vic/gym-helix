import { Pressable, Text } from 'react-native';

import { Icon } from '@/components/ui/Icon';
import { metrics } from '@/constants/metrics';

import { styles } from './TabBarItem.styles';
import type { TabBarItemProps } from './TabBarItem.types';

export function TabBarItem({ label, icon, focused, onPress }: TabBarItemProps) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.item, focused && styles.focused]}>
      <Icon name={icon} size={metrics.tabIcon} color={focused ? 'forest' : 'mutedLight'} />
      <Text style={[styles.label, focused && styles.labelFocused]} numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}
