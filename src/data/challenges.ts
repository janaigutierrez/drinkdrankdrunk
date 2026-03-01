import { challengesMeta, ChallengeMeta, Intensity, GameMode } from './challengesMeta';
import challengesES from '../i18n/challenges/es';
import challengesCA from '../i18n/challenges/ca';
import challengesEN from '../i18n/challenges/en';

type LangCode = 'es' | 'ca' | 'en';

const translationMap: Record<LangCode, Record<string, string>> = {
  es: challengesES,
  ca: challengesCA,
  en: challengesEN,
};

export interface Challenge extends ChallengeMeta {
  text: string;
}

/** Returns all challenges for a given mode and language, optionally filtered by intensity. */
export function getChallenges(
  lang: LangCode,
  mode: GameMode,
  intensity?: Intensity
): Challenge[] {
  const translations = translationMap[lang] ?? translationMap.es;

  return challengesMeta
    .filter((meta) => meta.mode === mode && (!intensity || meta.intensity === intensity))
    .map((meta) => ({
      ...meta,
      text: translations[meta.id] ?? `[missing: ${meta.id}]`,
    }));
}

/** Shuffles and returns a mix of all intensities for the Classic mode. */
export function getClassicDeck(lang: LangCode): Challenge[] {
  const all = getChallenges(lang, 'classic');
  return shuffleArray(all);
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
