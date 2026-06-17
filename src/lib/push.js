import { Capacitor } from '@capacitor/core';
import { supabase } from './supabase';
import { apiUrl } from './api';

// Sends the device's push token to our backend so it can be targeted later.
async function saveToken(token) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) return;
    await fetch(apiUrl('/api/register-device'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ token, platform: Capacitor.getPlatform() }),
    });
  } catch (e) {
    console.error('[push] saveToken failed:', e);
  }
}

// Initializes push notifications on native (Android/iOS) only.
// On web this is a no-op.
export async function initPush() {
  if (!Capacitor.isNativePlatform()) return;

  // Dynamic import so the web bundle never pulls in the native plugin.
  const { PushNotifications } = await import('@capacitor/push-notifications');

  let perm = await PushNotifications.checkPermissions();
  if (perm.receive === 'prompt') {
    perm = await PushNotifications.requestPermissions();
  }
  if (perm.receive !== 'granted') return;

  await PushNotifications.register();

  PushNotifications.addListener('registration', (token) => {
    console.log('[push] device token:', token.value);
    saveToken(token.value);
  });

  PushNotifications.addListener('registrationError', (err) => {
    console.error('[push] registration error:', err);
  });

  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('[push] received:', notification);
  });

  PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
    console.log('[push] action performed:', action);
  });
}
