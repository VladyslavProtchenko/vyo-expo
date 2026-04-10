import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_VERSION_KEY = '@app_storage_version';

// Increment this number whenever you make breaking changes to:
// - Zustand store shapes
// - AsyncStorage data structures
// - Auth/session handling logic
// Users will be signed out and all local data cleared on version mismatch.
const CURRENT_STORAGE_VERSION = '1';

export async function checkStorageVersion(): Promise<void> {
  const stored = await AsyncStorage.getItem(STORAGE_VERSION_KEY);

  if (stored !== CURRENT_STORAGE_VERSION) {
    await AsyncStorage.clear();
    await AsyncStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION);
  }
}
