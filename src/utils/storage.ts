import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  totalXP: '@ddd:totalXP',
  language: '@ddd:language',
  isPremium: '@ddd:isPremium',
  lastPlayedDate: '@ddd:lastPlayedDate',
} as const;

export const Storage = {
  async getTotalXP(): Promise<number> {
    const raw = await AsyncStorage.getItem(KEYS.totalXP);
    return raw ? parseInt(raw, 10) : 0;
  },

  async addXP(amount: number): Promise<number> {
    const current = await Storage.getTotalXP();
    const updated = current + amount;
    await AsyncStorage.setItem(KEYS.totalXP, String(updated));
    return updated;
  },

  async getLanguage(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.language);
  },

  async setLanguage(lang: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.language, lang);
  },

  async getIsPremium(): Promise<boolean> {
    const raw = await AsyncStorage.getItem(KEYS.isPremium);
    return raw === 'true';
  },

  async getLastPlayedDate(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.lastPlayedDate);
  },

  async setLastPlayedDate(date: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.lastPlayedDate, date);
  },

  /** Returns true if it's the first game of the current calendar day. */
  async isFirstGameToday(): Promise<boolean> {
    const today = new Date().toISOString().slice(0, 10);
    const last = await Storage.getLastPlayedDate();
    return last !== today;
  },
};
