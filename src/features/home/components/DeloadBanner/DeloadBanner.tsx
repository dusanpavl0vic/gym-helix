import { Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';

import { styles } from './DeloadBanner.styles';
import type { DeloadBannerProps } from './DeloadBanner.types';

const BANNER_ICON = 24;

export function DeloadBanner({ title, body }: DeloadBannerProps) {
  return (
    <View style={styles.box}>
      <Icon name="info" size={BANNER_ICON} color="lime" />
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {body ? <Text style={styles.body}>{body}</Text> : null}
      </View>
    </View>
  );
}
