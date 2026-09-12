import { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { PressableScale } from '@/components/common/PressableScale';
import { NumberInput } from '@/components/ui/NumberInput';
import { successFeedback } from '@/lib/feedback/haptics';

import { styles } from './QuickWeightCard.styles';
import type { QuickWeightCardProps } from './QuickWeightCard.types';

export function QuickWeightCard({ title, hint, savedLabel, unitLabel, onSave }: QuickWeightCardProps) {
  const [value, setValue] = useState<number | undefined>();

  const save = () => {
    if (!value) return;
    onSave(value);
    successFeedback();
    setValue(undefined);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {savedLabel ? (
        <Animated.Text entering={ZoomIn.springify()} style={styles.saved}>{savedLabel}</Animated.Text>
      ) : null}
      <View style={styles.row}>
        <NumberInput value={value} onChange={setValue} decimal placeholder={`${hint} (${unitLabel})`} style={styles.input} accessibilityLabel={title} />
        <PressableScale onPress={save} accessibilityLabel={title} style={styles.save} disabled={!value}>
          <Text style={styles.saveText}>✓</Text>
        </PressableScale>
      </View>
    </View>
  );
}
