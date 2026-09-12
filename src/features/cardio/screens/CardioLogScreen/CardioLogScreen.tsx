import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { EmptyState } from '@/components/common/EmptyState';
import { ListItem } from '@/components/common/ListItem';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Stepper } from '@/components/ui/Stepper';
import { TextField } from '@/components/ui/TextField';
import type { CardioType } from '@/types/domain';

import { CARDIO_TYPES, useCardio } from '../../hooks/useCardio';
import { styles } from './CardioLogScreen.styles';

const DURATION_STEP = 5;

export function CardioLogScreen() {
  const { t } = useTranslation(['cardio', 'common']);
  const cardio = useCardio();

  return (
    <ScreenContainer>
      <ScreenHeader title={t('cardio:title')} onBack={cardio.back} backLabel={t('common:back')} />
      <Card>
        <SegmentedControl
          items={CARDIO_TYPES.map((type) => ({ key: type, label: t(`common:cardioTypes.${type}`) }))}
          selectedKey={cardio.type}
          onSelect={(key) => cardio.setType(key as CardioType)}
        />
        <Text style={styles.hint}>{cardio.hint}</Text>
        <Stepper label={t('cardio:duration')} value={cardio.durationMin} step={DURATION_STEP} min={DURATION_STEP} max={240} onChange={cardio.setDurationMin} />
        <TextField label={t('cardio:notes')} value={cardio.notes} onChangeText={cardio.setNotes} />
        <Button label={t('cardio:save')} onPress={cardio.save} />
      </Card>
      <SectionHeader title={t('cardio:recent')} />
      <View style={styles.list}>
        {cardio.recent.length === 0 ? <EmptyState message={t('cardio:empty')} /> : null}
        {cardio.recent.map((row, i) => (
          <AnimatedEntry key={row.id} index={i}>
            <ListItem title={row.title} subtitle={row.subtitle} trailing={<IconButton glyph="✕" onPress={() => cardio.remove(row.id)} accessibilityLabel={t('common:delete')} />} />
          </AnimatedEntry>
        ))}
      </View>
    </ScreenContainer>
  );
}
