import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { COUNTDOWN_TICK_SEC, REST_WARNING_SEC, STALE_ALERT_MS, TIMER_TICK_MS } from '@/constants/timer';
import { selectSettings } from '@/features/settings/store/settingsSelectors';
import { useNow } from '@/hooks/useNow';
import { restEndVibration, tickHaptic, warningHaptic } from '@/lib/feedback/haptics';
import { playRestEndSound, playRestWarningSound, playTickSound } from '@/lib/feedback/sound';
import {
  cancelRestNotification,
  getNotificationPermission,
  notificationsAvailable,
  scheduleRestEnd,
  setSystemSoundInForeground,
} from '@/lib/notifications/restNotifications';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { effectiveRestSound, restRemainingSec } from '../helpers/rest';
import { restCleared, restExtended } from '../store/activeSessionSlice';
import { selectRest } from '../store/activeSessionSelectors';

interface AlertState {
  endsAt: number;
  warned: boolean;
  ticks: Set<number>;
}

export function useRestTimer(nextName: string) {
  const { t } = useTranslation('workout');
  const dispatch = useAppDispatch();
  const rest = useAppSelector(selectRest);
  const settings = useAppSelector(selectSettings);
  const now = useNow(TIMER_TICK_MS, Boolean(rest));
  const notificationId = useRef<string | null>(null);
  const alerts = useRef<AlertState | null>(null);

  const remainingSec = rest ? restRemainingSec(rest.endsAt, now) : 0;
  const soundMode = effectiveRestSound(settings.restSound, notificationsAvailable);

  useEffect(() => {
    setSystemSoundInForeground(soundMode === 'system');
  }, [soundMode]);

  // A local notification alerts even with the screen locked. Permission is asked earlier (workout start), never here.
  useEffect(() => {
    let cancelled = false;
    const previous = notificationId.current;
    notificationId.current = null;
    cancelRestNotification(previous);
    if (!rest || (!settings.notifications && soundMode !== 'system')) return undefined;
    (async () => {
      const permission = await getNotificationPermission();
      if (!permission.granted || cancelled) return;
      const id = await scheduleRestEnd(rest.endsAt, t('rest.notificationTitle'), t('rest.notificationBody', { name: nextName }), soundMode !== 'off');
      if (cancelled) cancelRestNotification(id);
      else notificationId.current = id;
    })();
    return () => {
      cancelled = true;
    };
  }, [rest?.endsAt, settings.notifications, soundMode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!rest) {
      alerts.current = null;
      return;
    }
    if (!alerts.current || alerts.current.endsAt !== rest.endsAt) {
      // Very short rests (or +15 s bringing it back above 10 s) set this correctly.
      alerts.current = { endsAt: rest.endsAt, warned: restRemainingSec(rest.endsAt, now) <= REST_WARNING_SEC, ticks: new Set() };
    }
    const state = alerts.current;

    if (remainingSec > 0) {
      if (settings.restWarning && !state.warned && remainingSec <= REST_WARNING_SEC) {
        state.warned = true;
        warningHaptic();
        if (soundMode !== 'off') playRestWarningSound();
      }
      if (settings.countdownTicks && remainingSec <= COUNTDOWN_TICK_SEC && !state.ticks.has(remainingSec)) {
        state.ticks.add(remainingSec);
        tickHaptic();
        if (soundMode !== 'off') playTickSound();
      }
      return;
    }

    if (now - rest.endsAt < STALE_ALERT_MS) {
      if (settings.vibration) restEndVibration();
      if (soundMode === 'app') playRestEndSound();
    }
    dispatch(restCleared());
  }, [remainingSec, rest, now, settings, soundMode, dispatch]);

  const skip = () => {
    cancelRestNotification(notificationId.current);
    notificationId.current = null;
    dispatch(restCleared());
  };

  return {
    rest,
    remainingSec,
    progress: rest ? Math.min(1, Math.max(0, (rest.endsAt - now) / (rest.totalSec * 1000))) : 0,
    extend: (sec: number) => dispatch(restExtended(sec)),
    skip,
  };
}
