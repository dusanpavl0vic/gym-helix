import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Stepper } from '@/components/ui/Stepper';
import { TextField } from '@/components/ui/TextField';
import { SUPPORTED_LANGUAGES } from '@/constants/config';
import { BAR_OPTIONS_KG, DEFAULT_PLATES_KG } from '@/constants/plates';
import { REST_SOUND_MODES } from '@/constants/sound';
import type { ExerciseKind } from '@/constants/training';
import { formatWeight } from '@/utils/number';

import { OptionGroup } from '../../components/OptionGroup';
import { SettingRow } from '../../components/SettingRow';
import { useSettings } from '../../hooks/useSettings';
import { styles } from './SettingsScreen.styles';

const REST_KINDS: ExerciseKind[] = ['heavyCompound', 'machine', 'isolation'];
const WEIGHT_STEPS = [1, 1.25, 2.5, 5];
const REST_STEP = 15;

export function SettingsScreen() {
  const router = useRouter();
  const { settings, t, update, setLanguage, togglePlate, testSound } = useSettings();

  return (
    <ScreenContainer>
      <ScreenHeader title={t('title')} onBack={() => router.back()} backLabel={t('common:back')} />

      <Card style={styles.group}>
        <SectionHeader title={t('profile')} />
        <TextField label={t('name')} defaultValue={settings.athleteName} onEndEditing={(e) => e.nativeEvent.text.trim() && update({ athleteName: e.nativeEvent.text.trim() })} />
        <OptionGroup label={t('language')} value={settings.language} onChange={setLanguage} options={SUPPORTED_LANGUAGES.map((l) => ({ value: l, label: t(`languages.${l}`) }))} />
        <OptionGroup label={t('unit')} value={settings.unit} onChange={(unit) => update({ unit })} options={[{ value: 'kg', label: 'kg' }, { value: 'lb', label: 'lb' }]} />
      </Card>

      <Card style={styles.group}>
        <SectionHeader title={t('timer')} />
        <OptionGroup
          label={t('restSound')}
          value={settings.restSound}
          onChange={(restSound) => update({ restSound })}
          options={REST_SOUND_MODES.map((m) => ({ value: m, label: t(`restSoundModes.${m}`) }))}
        />
        <Text style={styles.hint}>{t('restSoundHint')}</Text>
        <SettingRow label={t('countdownTicks')} value={settings.countdownTicks} onChange={(countdownTicks) => update({ countdownTicks })} />
        <SettingRow label={t('vibration')} value={settings.vibration} onChange={(vibration) => update({ vibration })} />
        <SettingRow label={t('notifications')} value={settings.notifications} onChange={(notifications) => update({ notifications })} />
        <Button label={t('testSound')} onPress={testSound} variant="outline" />
        <Text style={styles.label}>{t('restTitle').toUpperCase()}</Text>
        {REST_KINDS.map((kind) => (
          <Stepper
            key={kind}
            label={t(`restKinds.${kind}`)}
            value={settings.restByKind[kind]}
            step={REST_STEP}
            min={REST_STEP}
            max={600}
            onChange={(v) => update({ restByKind: { ...settings.restByKind, [kind]: v } })}
          />
        ))}
        <OptionGroup label={t('weightStep')} value={settings.weightStepKg} onChange={(weightStepKg) => update({ weightStepKg })} options={WEIGHT_STEPS.map((s) => ({ value: s, label: formatWeight(s) }))} />
      </Card>

      <Card style={styles.group}>
        <SectionHeader title={t('equipment')} />
        <OptionGroup label={t('bar')} value={settings.barKg} onChange={(barKg) => update({ barKg })} options={BAR_OPTIONS_KG.map((b) => ({ value: b, label: String(b) }))} />
        <Text style={styles.label}>{t('plates').toUpperCase()}</Text>
        <View style={styles.plates}>
          {DEFAULT_PLATES_KG.map((plate) => {
            const on = settings.plates.includes(plate);
            return (
              <Pressable key={plate} accessibilityRole="checkbox" accessibilityState={{ checked: on }} onPress={() => togglePlate(plate)} style={[styles.plate, on && styles.plateOn]}>
                <Text style={[styles.plateText, on && styles.plateTextOn]}>{formatWeight(plate)}</Text>
              </Pressable>
            );
          })}
        </View>
      </Card>
    </ScreenContainer>
  );
}
