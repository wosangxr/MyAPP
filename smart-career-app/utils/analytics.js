import * as Analytics from 'expo-firebase-analytics';

export async function logEvent(eventName, params) {
  try {
    await Analytics.logEvent(eventName, params);
  } catch (e) {
    // handle error silently
  }
}

export default Analytics;
