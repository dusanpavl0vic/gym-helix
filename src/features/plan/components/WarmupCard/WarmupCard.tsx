import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';

import { styles } from './WarmupCard.styles';
import type { WarmupCardProps } from './WarmupCard.types';

export function WarmupCard({ title, steps }: WarmupCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.box}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={title}
        onPress={() => setOpen((value) => !value)}
        style={styles.header}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        <Icon name="chevron-down" size={20} color="forest" style={open ? styles.chevronOpen : undefined} />
      </Pressable>
      {open ? (
        <View style={styles.steps}>
          {steps.map((step, i) => (
            <View key={step} style={styles.step}>
              <Text style={styles.index}>{i + 1}</Text>
              <Text style={styles.text}>{step}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
