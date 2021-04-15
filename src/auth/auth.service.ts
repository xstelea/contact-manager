import { AES, enc } from 'crypto-js';

export class InvalidEncryptionKeyError extends Error {}

export const authService = () => ({
  encryptData: (key: string, data: string) => AES.encrypt(data, key).toString(),

  decryptData: (key: string, data: string) => {
    const bytes = AES.decrypt(data, key);

    const originalText = bytes.toString(enc.Utf8);
    if (originalText === '') {
      throw new InvalidEncryptionKeyError();
    }
    return originalText;
  },

  addToLocalStorage: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },

  getFromLocalStorage: (localStorageKey: string) =>
    localStorage.getItem(localStorageKey),
});
