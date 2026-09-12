import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';

import { Button } from '@/components/ui/Button';
import { animation } from '@/constants/animation';
import { formatMmSs } from '@/utils/time';

import { RestRing } from '../RestRing';
import { styles } from './RestOverlay.styles';
import type { RestOverlayProps } from './RestOverlay.types';

export function RestOverlay(props: RestOverlayProps) {
  const urgent = props.remainingSec <= animation.countdownTickSec;
  return (
    <Animated.View
      entering={FadeIn.duration(animation.normal)}
      exiting={FadeOut.duration(animation.normal)}
      style={styles.overlay}
      accessibilityViewIsModal
      accessibilityLiveRegion="polite">
      <Text style={styles.title}>{props.title}</Text>
      <RestRing
        progress={props.progress}
        remainingLabel={formatMmSs(props.remainingSec)}
        totalLabel={props.ofLabel}
        urgent={urgent}
      />
      <Animated.View entering={SlideInDown.duration(animation.slow).springify()} style={styles.card}>
        <Text style={styles.kind}>{props.kindLabel}</Text>
        <Text style={styles.nextTitle}>{props.nextTitle}</Text>
        <Text style={styles.nextMeta}>{props.nextMeta}</Text>
      </Animated.View>
      <View style={styles.actions}>
        <Button label={props.extendLabel} onPress={props.onExtend} variant="outlineDark" flex={1} />
        <Button label={props.skipLabel} onPress={props.onSkip} variant="lime" flex={1.4} />
      </View>
    </Animated.View>
  );
}
