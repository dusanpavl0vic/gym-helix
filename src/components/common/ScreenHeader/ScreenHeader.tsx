import { Text, View } from 'react-native';

import { IconButton } from '@/components/ui/IconButton';

import { styles } from './ScreenHeader.styles';
import type { ScreenHeaderProps } from './ScreenHeader.types';

export function ScreenHeader({ title, subtitle, eyebrow, onBack, backLabel = 'Back', right }: ScreenHeaderProps) {
  return (
    <View style={styles.wrap}>
      {onBack ? <IconButton glyph="‹" onPress={onBack} accessibilityLabel={backLabel} /> : null}
      <View style={styles.row}>
        <View style={styles.texts}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.title} accessibilityRole="header">{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right}
      </View>
    </View>
  );
}
