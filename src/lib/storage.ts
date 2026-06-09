import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Thin async key/value store for local persistence.
 *
 * Backed by AsyncStorage because that runs in **Expo Go**, which is the team's
 * day-to-day preview path. `react-native-mmkv` (the originally planned store) is
 * faster and synchronous but needs a custom dev build, so it's deferred until we
 * move off Expo Go. When that happens, only this file changes — callers use the
 * async API below and stay unaffected.
 */
export const storage = {
  async getString(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  },

  async setString(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  },

  async getJSON<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  async setJSON<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },
};
