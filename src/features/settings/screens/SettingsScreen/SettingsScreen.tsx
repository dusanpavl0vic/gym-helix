import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { RadioList } from '@/components/ui/RadioList';
import { Stepper } from '@/components/ui/Stepper';
import { TextField } from '@/components/ui/TextField';
import { SUPPORTED_LANGUAGES } from '@/constants/config';
import type { IconName } from '@/constants/icons';
import { BAR_OPTIONS_KG, DEFAULT_PLATES_KG } from '@/constants/plates';
import { REST_SOUND_MODES } from '@/constants/sound';
import type { ExerciseKind } from '@/constants/training';
import type { RestSoundMode } from '@/types/backup';
import { formatWeight } from '@/utils/number';

import { OptionGroup } from '../../components/OptionGroup';
import { SettingRow } from '../../components/SettingRow';
import { useSettings } from '../../hooks/useSettings';
import { styles } from './SettingsScreen.styles';

const REST_KINDS: ExerciseKind[] = ['heavyCompound', 'machine', 'isolation'];
const WEIGHT_STEPS = [1, 1.25, 2.5, 5];
const REST_STEP = 15;
const MAX_REST = 600;
const SOUND_ICONS: Record<RestSoundMode, IconName> = { app: 'sound', system: 'bell', off: 'vibration' };

function SectionTitle({ icon, title }: { icon: IconName; title: string }) {
  return (
    <View style={styles.sectionTitle}>
      <Icon name={icon} size={22} color="forest" />
      <Text style={styles.sectionText} accessibilityRole="header">{title}</Text>
    </View>
  );
}

export function SettingsScreen() {
  const router = useRouter();
  const s = useSettings();
  const { settings, t } = s;

  return (
    <ScreenContainer>
      <ScreenHeader title={t('settings:title')} onBack={() => router.back()} backLabel={t('common:back')} />

      <Card style={styles.group}>
        <SectionTitle icon="language" title={t('settings:sections.profile')} />
        <TextField label={t('settings:name')} defaultValue={settings.athleteName} onEndEditing={(e) => e.nativeEvent.text.trim() && s.update({ athleteName: e.nativeEvent.text.trim() })} />
        <OptionGroup label={t('settings:language')} value={settings.language} onChange={s.setLanguage} options={SUPPORTED_LANGUAGES.map((l) => ({ value: l, label: t(`settings:languages.${l}`) }))} />
        <OptionGroup label={t('settings:unit')} value={settings.unit} onChange={(unit) => s.update({ unit })} options={[{ value: 'kg', label: 'kg' }, { value: 'lb', label: 'lb' }]} />
      </Card>

      <Card style={styles.group}>
        <SectionTitle icon="sound" title={t('settings:sections.sound')} />
        <RadioList
          items={REST_SOUND_MODES.map((mode) => ({ key: mode, label: t(`settings:restSoundModes.${mode}`), description: t(`settings:restSoundDescriptions.${mode}`), icon: SOUND_ICONS[mode] }))}
          selectedKey={settings.restSound}
          onSelect={(key) => s.update({ restSound: key as RestSoundMode })}
        />
        {s.notificationsAvailable ? null : <Text style={styles.warning}>{t('settings:notificationsUnavailable')}</Text>}
        <SettingRow icon="timer" label={t('settings:restWarning')} value={settings.restWarning} onChange={(restWarning) => s.update({ restWarning })} />
        <SettingRow icon="sound" label={t('settings:countdownTicks')} value={settings.countdownTicks} onChange={(countdownTicks) => s.update({ countdownTicks })} />
        <SettingRow icon="vibration" label={t('settings:vibration')} value={settings.vibration} onChange={(vibration) => s.update({ vibration })} />
        {s.notificationsAvailable ? (
          <SettingRow icon="bell" label={t('settings:notifications')} value={settings.notifications} onChange={(notifications) => s.update({ notifications })} />
        ) : null}
        {s.needsNotificationPermission && settings.notifications ? (
          <>
            <Text style={styles.hint}>{t('settings:notificationsBlocked')}</Text>
            <Button label={t('settings:allowNotifications')} icon="bell" onPress={s.allowNotifications} />
          </>
        ) : null}
        <View style={styles.buttons}>
          <Button label={t('settings:testWarning')} icon="timer" onPress={s.testWarning} variant="outline" flex={1} />
          <Button label={t('settings:testSound')} icon="sound" onPress={s.testSound} variant="outline" flex={1} />
        </View>
      </Card>

      <Card style={styles.group}>
        <SectionTitle icon="timer" title={t('settings:sections.rest')} />
        {REST_KINDS.map((kind) => (
          <Stepper
            key={kind}
            label={t(`settings:restKinds.${kind}`)}
            value={settings.restByKind[kind]}
            step={REST_STEP}
            min={REST_STEP}
            max={MAX_REST}
            onChange={(v) => s.update({ restByKind: { ...settings.restByKind, [kind]: v } })}
          />
        ))}
        <OptionGroup label={t('settings:weightStep')} value={settings.weightStepKg} onChange={(weightStepKg) => s.update({ weightStepKg })} options={WEIGHT_STEPS.map((step) => ({ value: step, label: formatWeight(step) }))} />
      </Card>

      <Card style={styles.group}>
        <SectionTitle icon="plates" title={t('settings:sections.equipment')} />
        <OptionGroup label={t('settings:bar')} value={settings.barKg} onChange={(barKg) => s.update({ barKg })} options={BAR_OPTIONS_KG.map((b) => ({ value: b, label: String(b) }))} />
        <Text style={styles.label}>{t('settings:plates').toUpperCase()}</Text>
        <View style={styles.plates}>
          {DEFAULT_PLATES_KG.map((plate) => {
            const on = settings.plates.includes(plate);
            return (
              <Pressable key={plate} accessibilityRole="checkbox" accessibilityState={{ checked: on }} onPress={() => s.togglePlate(plate)} style={[styles.plate, on && styles.plateOn]}>
                <Text style={[styles.plateText, on && styles.plateTextOn]}>{formatWeight(plate)}</Text>
              </Pressable>
            );
          })}
        </View>
      </Card>
    </ScreenContainer>
  );
}
