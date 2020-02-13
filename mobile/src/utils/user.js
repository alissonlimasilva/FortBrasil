import AsyncStorage from '@react-native-community/async-storage';
import contants from '../res/contants';

export async function getLoggedUser() {
  try {
    let user = await AsyncStorage.getItem(contants.KEY_LOGGEDUSER);
    if (!user) throw new Error();
    user = JSON.parse(user);
    return user;
  } catch (error) {
    return {
      email: '',
    };
  }
}

export async function saveLoggedUser(user) {
  console.log('SAVE', user);
  await AsyncStorage.setItem(contants.KEY_LOGGEDUSER, JSON.stringify(user));
}
