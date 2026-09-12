import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { NumberInput } from '@/components/ui/NumberInput';
import { StatTile } from '@/components/ui/StatTile';
import { TextField } from '@/components/ui/TextField';
import { Text as UIText } from '@/components/ui/Text';

import { Celebration } from '../../components/Celebration';
import { useWorkoutSummary } from '../../hooks/useWorkoutSummary';
import { styles } from './WorkoutSummaryScreen.styles';

export function WorkoutSummaryScreen() {
  const { t } = useTranslation(['workout', 'common']);
  const router = useRouter();
  const summary = useWorkoutSummary();

  useEffect(() => {
    if (!summary.hasSession && !summary.saving) router.back();
  }, [summary.hasSession, summary.saving, router]);

  if (!summary.hasSession) return null;

  return (
    <ScreenContainer footer={<Button label={t('workout:summary.save')} onPress={summary.save} disabled={summary.saving} variant="dark" size="lg" />}>
      <Celebration label={t('workout:summary.celebrate')} />
      <AnimatedEntry index={1}>
        <Text style={styles.title}>{summary.title}</Text>
      </AnimatedEntry>
      <AnimatedEntry index={2} style={styles.stats}>
        {summary.stats.map((s) => (
          <StatTile key={s.key} value={s.value} label={s.label} />
        ))}
      </AnimatedEntry>
      <AnimatedEntry index={3} style={styles.section}>
        <SectionHeader title={t('workout:summary.records')} />
        {summary.records.length === 0 ? (
          <Text style={styles.noRecords}>{t('workout:summary.noRecords')}</Text>
        ) : (
          <Card variant="forest">
            {summary.records.map((r) => (
              <View key={r.key} style={styles.record}>
                <Text style={styles.recordName}>{r.name}</Text>
                <Text style={styles.recordValue}>{r.value}</Text>
              </View>
            ))}
          </Card>
        )}
      </AnimatedEntry>
      <AnimatedEntry index={4} style={styles.section}>
        <UIText variant="monoMicro" color="muted">{t('workout:summary.bodyweight').toUpperCase()}</UIText>
        <NumberInput value={summary.bodyweightKg} onChange={summary.setBodyweightKg} decimal placeholder={t('common:units.kg')} />
        <TextField label={t('workout:summary.notes')} value={summary.notes} onChangeText={summary.setNotes} placeholder={t('workout:summary.notesPlaceholder')} multiline />
      </AnimatedEntry>
    </ScreenContainer>
  );
}
