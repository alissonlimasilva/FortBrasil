import RNGooglePlaces from 'react-native-google-places';

export async function getCurrentLocation() {
  try {
    const location = await RNGooglePlaces.getCurrentPlace();
    if (location[0]) {
      console.log('LOCATION', location[0]);
      return location[0];
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
}
