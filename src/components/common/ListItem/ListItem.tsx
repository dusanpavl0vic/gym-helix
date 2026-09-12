import { Text, View } from 'react-native';

import { PressableScale } from '../PressableScale';
import { styles } from './ListItem.styles';
import type { ListItemProps } from './ListItem.types';

export function ListItem({ title, subtitle, onPress, leading, trailing, showChevron = Boolean(onPress) }: ListItemProps) {
  const content = (
    <>
      {leading}
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text> : null}
      </View>
      {trailing}
      {showChevron ? <Text style={styles.chevron}>›</Text> : null}
    </>
  );
  if (!onPress) return <View style={styles.row}>{content}</View>;
  return (
    <PressableScale onPress={onPress} accessibilityLabel={title} style={styles.row} pressedStyle={styles.pressed}>
      {content}
    </PressableScale>
  );
}
