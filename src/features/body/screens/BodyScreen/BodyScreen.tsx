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
import type { BodyField } from '@/features/progress/helpers/analytics';

import { MeasurementForm } from '../../components/MeasurementForm';
import { useBodyMeasurements } from '../../hooks/useBodyMeasurements';
import { styles } from './BodyScreen.styles';

export function BodyScreen() {
  const { t } = useTranslation(['body', 'common']);
  const body = useBodyMeasurements();
  const labels = Object.fromEntries(body.fields.map((f) => [f, t(`body:fields.${f}`)])) as Record<BodyField, string>;

  return (
    <ScreenContainer>
      <ScreenHeader title={t('body:title')} subtitle={t('body:subtitle')} onBack={body.back} backLabel={t('common:back')} />
      <Card>
        <MeasurementForm fields={body.fields} labels={labels} values={body.draft} onChange={body.setField} />
        {body.error ? <Text style={styles.error}>{t('body:atLeastOne')}</Text> : null}
        <Button label={t('body:save')} onPress={body.save} />
      </Card>
      <SectionHeader title={t('body:compare')} />
      <View style={styles.compare}>
        {body.compare.map((c) => (
          <View key={c.field} style={styles.compareCell}>
            <Text style={styles.compareLabel}>{c.label}</Text>
            <Text style={styles.compareValue}>{c.value}</Text>
            {c.delta ? <Text style={styles.compareDelta}>{c.delta}</Text> : null}
          </View>
        ))}
      </View>
      <SectionHeader title={t('body:history')} />
      <View style={styles.list}>
        {body.rows.length === 0 ? <EmptyState message={t('body:empty')} /> : null}
        {body.rows.map((row, i) => (
          <AnimatedEntry key={row.id} index={i}>
            <ListItem title={row.date} subtitle={row.values} trailing={<IconButton glyph="✕" onPress={() => body.remove(row.id)} accessibilityLabel={t('common:delete')} />} />
          </AnimatedEntry>
        ))}
      </View>
    </ScreenContainer>
  );
}
