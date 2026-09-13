import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/components/common/EmptyState';
import { ListItem } from '@/components/common/ListItem';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { NumberInput } from '@/components/ui/NumberInput';
import { Stepper } from '@/components/ui/Stepper';
import { TextField } from '@/components/ui/TextField';
import { CARDIO_DURATION_STEP_MIN, CARDIO_MAX_DURATION_MIN, CARDIO_TYPES } from '@/constants/cardio';
import type { CardioType } from '@/types/domain';

import { CardioTypePicker } from '../../components/CardioTypePicker';
import { RpePicker } from '../../components/RpePicker';
import { useCardio } from '../../hooks/useCardio';
import { styles } from './CardioLogScreen.styles';

export function CardioLogScreen() {
  const { t } = useTranslation(['cardio', 'common']);
  const cardio = useCardio();
  const labels = Object.fromEntries(CARDIO_TYPES.map((type) => [type, t(`common:cardioTypes.${type}`)])) as Record<CardioType, string>;

  return (
    <ScreenContainer>
      <ScreenHeader title={t('cardio:title')} onBack={cardio.back} backLabel={t('common:back')} />
      <Card style={styles.form}>
        <CardioTypePicker value={cardio.type} labels={labels} onChange={cardio.setType} />
        <Text style={styles.hint}>{cardio.hint}</Text>
        <Stepper label={t('cardio:duration')} value={cardio.durationMin} step={CARDIO_DURATION_STEP_MIN} min={CARDIO_DURATION_STEP_MIN} max={CARDIO_MAX_DURATION_MIN} onChange={cardio.setDurationMin} />
        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>{t('cardio:distance').toUpperCase()}</Text>
            <NumberInput value={cardio.distanceKm} onChange={cardio.setDistanceKm} decimal placeholder={t('cardio:optional')} accessibilityLabel={t('cardio:distance')} />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('cardio:avgHeartRate').toUpperCase()}</Text>
            <NumberInput value={cardio.avgHeartRate} onChange={cardio.setAvgHeartRate} placeholder={t('cardio:optional')} accessibilityLabel={t('cardio:avgHeartRate')} />
          </View>
        </View>
        <RpePicker label={t('cardio:rpe')} hint={t('cardio:rpeHint')} value={cardio.rpe} onChange={cardio.setRpe} />
        <TextField label={t('cardio:notes')} value={cardio.notes} onChangeText={cardio.setNotes} />
        <Button label={t('cardio:save')} icon="check" onPress={cardio.save} />
      </Card>
      <SectionHeader title={t('cardio:recent')} />
      <View style={styles.list}>
        {cardio.recent.length === 0 ? <EmptyState message={t('cardio:empty')} /> : null}
        {cardio.recent.map((row) => (
          <ListItem
            key={row.id}
            icon={row.icon}
            title={row.title}
            subtitle={row.subtitle}
            trailing={<IconButton icon="delete" color="danger" variant="ghost" onPress={() => cardio.remove(row.id)} accessibilityLabel={t('common:delete')} />}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}
