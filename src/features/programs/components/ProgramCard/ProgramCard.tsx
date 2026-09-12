import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';

import { styles } from './ProgramCard.styles';
import type { ProgramCardProps } from './ProgramCard.types';

export function ProgramCard({ name, subtitle, isActive, isDefault, labels, canDelete, onOpen, onActivate, onDuplicate, onDelete }: ProgramCardProps) {
  return (
    <View style={[styles.card, isActive && styles.active]}>
      <PressableScale onPress={onOpen} accessibilityLabel={name} style={styles.head}>
        {isActive || isDefault ? (
          <View style={styles.badges}>
            {isActive ? <Chip label={labels.active} variant="lime" /> : null}
            {isDefault ? <Chip label={labels.default} variant="outline" /> : null}
          </View>
        ) : null}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </PressableScale>
      <View style={styles.actions}>
        {!isActive ? <Button label={labels.setActive} onPress={onActivate} flex={1} /> : null}
        <Button label={labels.edit} onPress={onOpen} variant="outline" flex={1} />
        <Button label={labels.duplicate} onPress={onDuplicate} variant="outline" flex={1} />
        {canDelete ? <Button label={labels.delete} onPress={onDelete} variant="danger" flex={1} /> : null}
      </View>
    </View>
  );
}
