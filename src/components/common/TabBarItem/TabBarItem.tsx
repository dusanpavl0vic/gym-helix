import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { animation } from '@/constants/animation';
import { colors } from '@/constants/colors';

import { styles } from './TabBarItem.styles';
import type { TabBarItemProps } from './TabBarItem.types';

export function TabBarItem({ label, focused, onPress }: TabBarItemProps) {
  const active = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    active.value = withTiming(focused ? 1 : 0, { duration: animation.normal });
  }, [focused, active]);

  const itemStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(active.value, [0, 1], [colors.paper, colors.mint]),
  }));
  const iconStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(active.value, [0, 1], [colors.mutedLight, colors.forest]),
    backgroundColor: interpolateColor(active.value, [0, 1], [colors.paper, colors.lime]),
    transform: [{ scale: withSpring(focused ? 1.1 : 1, animation.spring) }],
  }));
  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(active.value, [0, 1], [colors.mutedLight, colors.forest]),
  }));

  return (
    <Pressable accessibilityRole="tab" accessibilityState={{ selected: focused }} accessibilityLabel={label} onPress={onPress} style={styles.item}>
      <Animated.View style={[styles.item, itemStyle]}>
        <Animated.View style={[styles.icon, iconStyle]} />
        <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
}
