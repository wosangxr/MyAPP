import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

export async function checkForAppUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Alert.alert(
        'Update Available',
        'A new update is available. Restart the app to apply the update.',
        [
          { text: 'Restart Now', onPress: () => Updates.reloadAsync() },
          { text: 'Later', style: 'cancel' },
        ]
      );
    }
  } catch (e) {
    // handle error silently
  }
}
