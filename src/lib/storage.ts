import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const namespace = process.env.SECURE_STORAGE_NAMESPACE ?? 'order-food';

const toKey = (key: string) => `${namespace}:${key}`;

export const storage = {
  async getString(key: string) {
    return AsyncStorage.getItem(toKey(key));
  },
  async setString(key: string, value: string) {
    return AsyncStorage.setItem(toKey(key), value);
  },
  async removeItem(key: string) {
    return AsyncStorage.removeItem(toKey(key));
  },
  async clearAll() {
    const keys = await AsyncStorage.getAllKeys();
    const ownKeys = keys.filter((key) => key.startsWith(`${namespace}:`));
    return AsyncStorage.multiRemove(ownKeys);
  },
  secure: {
    async getString(key: string) {
      return SecureStore.getItemAsync(toKey(key));
    },
    async setString(key: string, value: string) {
      return SecureStore.setItemAsync(toKey(key), value, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
      });
    },
    async delete(key: string) {
      return SecureStore.deleteItemAsync(toKey(key));
    },
  },
};

