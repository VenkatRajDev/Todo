import AsyncStorage from '@react-native-async-storage/async-storage';

// For Store Data
export const StoreUserData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`data stored Sucessfully`);
  } catch (Error) {
    console.log(`Error => ${Error} occurs while storing data`);
  }
};

// For Retrive Data
export const getUserData = async key => {
  try {
    const data = await AsyncStorage.getItem(key);

    if (data != null) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (Error) {
    console.log(`Error => ${Error} occurs while retriving data`);
  }
};