import { request, PERMISSIONS } from 'react-native-permissions';

export async function checkPermition() {
  const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  return result;
}
