import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { animation } from '@/constants/animation';
import { TIMER_TICK_MS } from '@/constants/timer';
import { selectSettings } from '@/features/settings/store/settingsSelectors';
import { useNow } from '@/hooks/useNow';
import { restEndVibration, tickHaptic } from '@/lib/feedback/haptics';
import { playRestSound, playTickSound } from '@/lib/feedback/sound';
import {
  cancelRestNotification,
  ensureNotificationPermission,
  notificationsAvailable,
  scheduleRestEnd,
  setSystemSoundInForeground,
} from '@/lib/notifications/restNotifications';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { effectiveRestSound, restRemainingSec } from '../helpers/rest';
import { restCleared, restExtended } from '../store/activeSessionSlice';
import { selectRest } from '../store/activeSessionSelectors';

/** Late by more than this (e.g. app was in background) → close silently, the notification already alerted. */
const STALE_ALERT_MS = 2500;

export function useRestTimer(nextName: string) {
  const { t } = useTranslation('workout');
  const dispatch = useAppDispatch();
  const rest = useAppSelector(selectRest);
  const settings = useAppSelector(selectSettings);
  const now = useNow(TIMER_TICK_MS, Boolean(rest));
  const notificationId = useRef<string | null>(null);
  const lastTick = useRef<number | null>(null);

  const remainingSec = rest ? restRemainingSec(rest.endsAt, now) : 0;
  const soundMode = effectiveRestSound(settings.restSound, notificationsAvailable);

  useEffect(() => {
    setSystemSoundInForeground(soundMode === 'system');
  }, [soundMode]);

  // Schedule a local notification so the alert also fires with the screen locked.
  useEffect(() => {
    let cancelled = false;
    const previous = notificationId.current;
    notificationId.current = null;
    cancelRestNotification(previous);
    if (!rest || !notificationsAvailable || (!settings.notifications && soundMode !== 'system')) return undefined;
    (async () => {
      if (!(await ensureNotificationPermission()) || cancelled) return;
      const id = await scheduleRestEnd(
        rest.endsAt,
        t('rest.notificationTitle'),
        t('rest.notificationBody', { name: nextName }),
        soundMode !== 'off',
      );
      if (cancelled) cancelRestNotification(id);
      else notificationId.current = id;
    })();
    return () => {
      cancelled = true;
    };
  }, [rest?.endsAt, settings.notifications, soundMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown ticks and the end-of-rest alert.
  useEffect(() => {
    if (!rest) {
      lastTick.current = null;
      return;
    }
    if (remainingSec > 0) {
      if (settings.countdownTicks && remainingSec <= animation.countdownTickSec && lastTick.current !== remainingSec) {
        lastTick.current = remainingSec;
        tickHaptic();
        if (soundMode === 'app') playTickSound();
      }
      return;
    }
    const lateBy = now - rest.endsAt;
    if (lateBy < STALE_ALERT_MS) {
      if (settings.vibration) restEndVibration();
      if (soundMode === 'app') playRestSound();
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
