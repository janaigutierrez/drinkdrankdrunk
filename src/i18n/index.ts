import { getLocales } from 'expo-localization';
import en from './en';
import es from './es';
import ca from './ca';

type LangCode = 'en' | 'es' | 'ca';

const translations = { en, es, ca };

let currentLang: LangCode = 'es';

function detectLanguage(): LangCode {
  try {
    const locales = getLocales();
    if (locales && locales.length > 0) {
      const code = locales[0].languageCode?.toLowerCase() ?? 'es';
      if (code === 'ca') return 'ca';
      if (code === 'es') return 'es';
      return 'en';
    }
  } catch {
    // ignore
  }
  return 'es';
}

export function initI18n() {
  currentLang = detectLanguage();
}

export function setLanguage(lang: LangCode) {
  currentLang = lang;
}

export function getLanguage(): LangCode {
  return currentLang;
}

export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[currentLang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallback: any = translations['en'];
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return key;
        }
      }
      value = fallback;
      break;
    }
  }

  if (typeof value !== 'string') return key;

  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, k) =>
      params[k] !== undefined ? String(params[k]) : `{{${k}}}`
    );
  }
  return value;
}
