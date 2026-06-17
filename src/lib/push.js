import { Capacitor } from '@capacitor/core';

// Initializes push notifications on native (Android/iOS) only.
// On web this is a no-op. The device token is logged — send it to your
// backend later to target a specific device (e.g. new-lead alerts).
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
    // TODO: POST token.value to your backend to enable targeted notifications.
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
