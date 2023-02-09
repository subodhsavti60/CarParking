import AsyncStorage from '@react-native-async-storage/async-storage';

// To get locally storage data.
const getAsyncValue = async function (key) {
  let value = null;
  try {
    await AsyncStorage.getItem(key, (err, result) => {
      value = result;
    });
  } catch (e) {}
  return value;
};

// To set a data to local storage.
const setAsyncValue = async function (key, value) {
  await AsyncStorage.setItem(key, value + '');
};

// To remove a data from local storage.
const removeAsyncStorageItem = async function (key) {
  await AsyncStorage.removeItem(key);
};

// Clear all the data from local storage
const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

export {
  getAsyncValue,
  setAsyncValue,
  removeAsyncStorageItem,
  clearAsyncStorage,
};
