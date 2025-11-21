import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (existingStatus === 'granted') {
    return true;
  }
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return status === 'granted';
}

export async function scheduleDemoNotification(message: string) {
  const granted = await requestNotificationPermission();
  if (!granted) {
    throw new Error('Notifications permission not granted');
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Order update',
      body: message,
    },
    trigger: null,
  });
}

