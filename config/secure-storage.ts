import * as aesjs from 'aes-js';
import * as SecureStore from 'expo-secure-store';

// AES-256 key stored in SecureStore (Keychain/Keystore),
// encrypted data stored in localStorage (expo-sqlite).
// This is the Supabase-recommended pattern for React Native.
export class LargeSecureStore {
  private async _getOrCreateKey(name: string): Promise<Uint8Array> {
    const existing = await SecureStore.getItemAsync(name);
    if (existing) {
      return aesjs.utils.hex.toBytes(existing);
    }
    const key = crypto.getRandomValues(new Uint8Array(256 / 8));
    await SecureStore.setItemAsync(name, aesjs.utils.hex.fromBytes(key));
    return key;
  }

  private _encrypt(key: Uint8Array, value: string): string {
    const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
    const encrypted = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
    return aesjs.utils.hex.fromBytes(encrypted);
  }

  private _decrypt(key: Uint8Array, value: string): string {
    const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
    const decrypted = cipher.decrypt(aesjs.utils.hex.toBytes(value));
    return aesjs.utils.utf8.fromBytes(decrypted);
  }

  async getItem(key: string): Promise<string | null> {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    const encryptionKey = await this._getOrCreateKey(key);
    return this._decrypt(encryptionKey, encrypted);
  }

  async setItem(key: string, value: string): Promise<void> {
    const encryptionKey = await this._getOrCreateKey(key);
    const encrypted = this._encrypt(encryptionKey, value);
    localStorage.setItem(key, encrypted);
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }
}
