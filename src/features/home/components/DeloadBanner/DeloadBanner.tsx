import { Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Button } from '@/components/ui/Button';
import { animation } from '@/constants/animation';

import { styles } from './DeloadBanner.styles';
import type { DeloadBannerProps } from './DeloadBanner.types';

export function DeloadBanner({ title, body, primaryLabel, onPrimary, secondaryLabel, onSecondary }: DeloadBannerProps) {
  return (
    <Animated.View entering={FadeInUp.duration(animation.slow)}>
      <View style={styles.box}>
        <Text style={styles.title}>{title}</Text>
        {body ? <Text style={styles.body}>{body}</Text> : null}
        {primaryLabel && onPrimary ? (
          <View style={styles.actions}>
            <Button label={primaryLabel} onPress={onPrimary} variant="lime" flex={1.4} />
            {secondaryLabel && onSecondary ? <Button label={secondaryLabel} onPress={onSecondary} variant="outlineDark" flex={1} /> : null}
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
}
