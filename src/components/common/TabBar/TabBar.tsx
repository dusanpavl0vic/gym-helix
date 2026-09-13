import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_ICONS } from '@/constants/icons';
import { spacing } from '@/constants/spacing';

import { TabBarItem } from '../TabBarItem';
import { styles } from './TabBar.styles';
import type { TabBarProps } from './TabBar.types';

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const options = descriptors[route.key].options;
        const label = typeof options.title === 'string' ? options.title : route.name;
        return (
          <TabBarItem
            key={route.key}
            label={label}
            icon={TAB_ICONS[route.name as keyof typeof TAB_ICONS] ?? 'tab-more'}
            focused={focused}
            onPress={() => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
            }}
          />
        );
      })}
    </View>
  );
}
