import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateUser() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!hasHardware || !isEnrolled) {
    return { success: false, error: 'Biometric authentication not available.' };
  }
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to continue',
    fallbackLabel: 'Enter Passcode',
  });
  return result;
}
