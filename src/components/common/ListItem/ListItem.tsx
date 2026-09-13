import { Text, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';

import { PressableScale } from '../PressableScale';
import { styles } from './ListItem.styles';
import type { ListItemProps } from './ListItem.types';

export function ListItem({ title, subtitle, onPress, icon, iconColor = 'forest', leading, trailing, showChevron = Boolean(onPress) }: ListItemProps) {
  const content = (
    <>
      {icon ? (
        <View style={styles.iconTile}>
          <Icon name={icon} size={20} color={iconColor} />
        </View>
      ) : (
        leading
      )}
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle} numberOfLines={3}>{subtitle}</Text> : null}
      </View>
      {trailing}
      {showChevron ? <Icon name="chevron-right" size={20} color="mutedLight" /> : null}
    </>
  );
  if (!onPress) return <View style={styles.row}>{content}</View>;
  return (
    <PressableScale onPress={onPress} accessibilityLabel={title} style={styles.row} pressedStyle={styles.pressed}>
      {content}
    </PressableScale>
  );
}
