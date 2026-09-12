import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { animation } from '@/constants/animation';

import { styles } from './NextWorkoutCard.styles';
import type { NextWorkoutCardProps } from './NextWorkoutCard.types';

export function NextWorkoutCard({ eyebrow, title, focus, meta, footnote, tags, badge, primaryLabel, onPrimary, secondaryLabel, onSecondary }: NextWorkoutCardProps) {
  const breathe = useSharedValue(1);

  useEffect(() => {
    breathe.value = withRepeat(withTiming(1.12, { duration: animation.pulseDuration, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [breathe]);

  const circleStyle = useAnimatedStyle(() => ({ transform: [{ scale: breathe.value }] }));

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.circle, circleStyle]} />
      <View style={styles.texts}>
        <View style={styles.eyebrowRow}>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          {badge ? <Chip label={badge} variant="lime" /> : null}
        </View>
        <Text style={styles.title}>{title}</Text>
        {focus ? <Text style={styles.meta}>{focus}</Text> : null}
        <Text style={styles.meta}>{meta}</Text>
        <Text style={styles.footnote}>{footnote}</Text>
      </View>
      <View style={styles.tags}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} variant="onDark" />
        ))}
      </View>
      <View style={styles.actions}>
        <Button label={primaryLabel} onPress={onPrimary} variant="lime" />
        {secondaryLabel && onSecondary ? (
          <Pressable accessibilityRole="button" onPress={onSecondary} hitSlop={10} style={styles.secondary}>
            <Text style={styles.secondaryText}>{secondaryLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
