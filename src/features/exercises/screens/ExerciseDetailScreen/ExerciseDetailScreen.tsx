import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/components/common/EmptyState';
import { ImageGallery } from '@/components/common/ImageGallery';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { metrics } from '@/constants/metrics';
import { ExerciseProgressChart } from '@/features/progress/components/ExerciseProgressChart';

import { MuscleChips } from '../../components/MuscleChips';
import { RecordCard } from '../../components/RecordCard';
import { useExerciseDetail } from '../../hooks/useExerciseDetail';
import { styles } from './ExerciseDetailScreen.styles';

export function ExerciseDetailScreen() {
  const { t } = useTranslation(['exercises', 'common']);
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const detail = useExerciseDetail(id);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageGallery
          images={detail.exercise?.images ?? []}
          height={metrics.detailImageHeight}
          placeholderLabel={t('exercises:imagePlaceholder')}
          overlay={<IconButton icon="back" variant="cream" onPress={detail.back} accessibilityLabel={t('common:back')} style={styles.back} />}
        />
        <View style={styles.body}>
          <View style={styles.titleBlock}>
            <Text style={styles.name}>{detail.name}</Text>
            <MuscleChips muscles={detail.muscles} />
            {detail.target ? <Text style={styles.target}>{`${t('exercises:detail.target')}: ${detail.target}`}</Text> : null}
          </View>
          {detail.canChangePhoto ? (
            <View style={styles.photoRow}>
              <Button label={t('exercises:picker.gallery')} icon="gallery" onPress={() => detail.changePhoto('gallery')} variant="outline" flex={1} />
              <Button label={t('exercises:picker.camera')} icon="camera" onPress={() => detail.changePhoto('camera')} variant="outline" flex={1} />
            </View>
          ) : null}
          <RecordCard
            title={t('exercises:detail.record')}
            heaviest={detail.record.heaviest}
            heaviestLabel={t('exercises:detail.heaviest')}
            e1rm={detail.record.e1rm}
            e1rmLabel={t('exercises:detail.e1rm')}
          />
          <ExerciseProgressChart exerciseId={id} exerciseName={detail.name} />
          {detail.instructions.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title={t('exercises:detail.instructions')} />
              {detail.instructions.map((step, i) => (
                <View key={step} style={styles.step}>
                  <Text style={styles.stepIndex}>{i + 1}</Text>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          ) : null}
          <View style={styles.section}>
            <SectionHeader title={t('exercises:detail.history')} />
            {detail.log.length === 0 ? <EmptyState message={t('exercises:detail.noHistory')} /> : null}
            {detail.log.map((row) => (
              <View key={row.id} style={styles.logRow}>
                <Text style={styles.logDate}>{row.date}</Text>
                <Text style={styles.logSets} numberOfLines={2}>{row.sets}</Text>
                <Text style={styles.logTop}>{row.top}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
