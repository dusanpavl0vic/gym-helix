import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { REST_WARNING_SEC } from '@/constants/timer';
import { formatMmSs } from '@/utils/time';

import { RestRing } from '../RestRing';
import { styles } from './RestOverlay.styles';
import type { RestOverlayProps } from './RestOverlay.types';

export function RestOverlay(props: RestOverlayProps) {
  return (
    <View style={styles.overlay} accessibilityViewIsModal accessibilityLiveRegion="polite">
      <Text style={styles.title}>{props.title}</Text>
      <RestRing progress={props.progress} remainingLabel={formatMmSs(props.remainingSec)} totalLabel={props.ofLabel} warning={props.remainingSec <= REST_WARNING_SEC} />
      <View style={styles.card}>
        <Text style={styles.kind}>{props.kindLabel}</Text>
        <Text style={styles.nextTitle}>{props.nextTitle}</Text>
        <Text style={styles.nextMeta}>{props.nextMeta}</Text>
      </View>
      <View style={styles.actions}>
        <Button label={props.extendLabel} icon="timer-plus" onPress={props.onExtend} variant="outlineDark" flex={1} />
        <Button label={props.skipLabel} icon="skip" onPress={props.onSkip} variant="lime" flex={1.4} />
      </View>
    </View>
  );
}
