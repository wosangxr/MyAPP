import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  try {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    // Try to get the token, but fail gracefully if projectId is missing or in Expo Go
    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push token fetched successfully:', token);
    } catch (tokenError) {
      console.log('Could not fetch Expo Push Token (Expected in Expo Go without ProjectId):', tokenError);
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    return token;
  } catch (err) {
    console.log('Error in registerForPushNotificationsAsync:', err);
    return null;
  }
}
