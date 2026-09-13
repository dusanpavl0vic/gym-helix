import { Text, View } from 'react-native';

import { PressableScale } from '@/components/common/PressableScale';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { IconButton } from '@/components/ui/IconButton';

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
        {isActive ? <View style={styles.spacer} /> : <Button label={labels.setActive} icon="check" onPress={onActivate} style={styles.primary} />}
        <IconButton icon="edit" variant="mint" size="lg" onPress={onOpen} accessibilityLabel={labels.edit} />
        <IconButton icon="copy" variant="mint" size="lg" onPress={onDuplicate} accessibilityLabel={labels.duplicate} />
        {canDelete ? <IconButton icon="delete" color="danger" size="lg" onPress={onDelete} accessibilityLabel={labels.delete} /> : null}
      </View>
    </View>
  );
}
