import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';

import { styles } from './NextWorkoutCard.styles';
import type { NextWorkoutCardProps } from './NextWorkoutCard.types';

const SECONDARY_ICON = 18;

export function NextWorkoutCard({ eyebrow, title, focus, meta, footnote, tags, badge, primaryLabel, onPrimary, secondaryLabel, onSecondary }: NextWorkoutCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.circle} />
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
        <Button label={primaryLabel} icon="start" onPress={onPrimary} variant="lime" />
        {secondaryLabel && onSecondary ? (
          <Pressable accessibilityRole="button" onPress={onSecondary} hitSlop={10} style={styles.secondary}>
            <Icon name="swap" size={SECONDARY_ICON} color="mint" />
            <Text style={styles.secondaryText}>{secondaryLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
