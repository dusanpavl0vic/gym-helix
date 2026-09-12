import { Text, View } from 'react-native';

import { styles } from './WarmupCard.styles';
import type { WarmupCardProps } from './WarmupCard.types';

export function WarmupCard({ title, steps }: WarmupCardProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      {steps.map((step, i) => (
        <View key={step} style={styles.step}>
          <Text style={styles.index}>{i + 1}</Text>
          <Text style={styles.text}>{step}</Text>
        </View>
      ))}
    </View>
  );
}
