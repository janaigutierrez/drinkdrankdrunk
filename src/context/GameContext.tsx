/**
 * GameContext
 *
 * Holds all runtime state for an active game session and the persistent
 * user profile (XP, language, premium status). Keeps component logic
 * simple — screens just call the provided actions.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { Challenge, getClassicDeck } from '../data/challenges';
import { initI18n, setLanguage, getLanguage } from '../i18n';
import { Storage } from '../utils/storage';
import { getLevelForXP, getLevelProgress, Level, XP_REWARDS } from '../utils/xp';

// ─── Types ────────────────────────────────────────────────────────────────────

type LangCode = 'es' | 'ca' | 'en';

export interface Player {
  id: string;
  name: string;
}

interface GameSession {
  players: Player[];
  deck: Challenge[];
  currentIndex: number;
  startedAt: number; // epoch ms
  isActive: boolean;
}

interface UserProfile {
  totalXP: number;
  isPremium: boolean;
  language: LangCode;
}

interface GameState {
  session: GameSession | null;
  profile: UserProfile;
  isLoading: boolean;
}

type GameAction =
  | { type: 'PROFILE_LOADED'; payload: UserProfile }
  | { type: 'START_SESSION'; payload: { players: Player[]; deck: Challenge[] } }
  | { type: 'NEXT_CARD' }
  | { type: 'END_SESSION'; xpEarned: number }
  | { type: 'SET_LANGUAGE'; lang: LangCode }
  | { type: 'ADD_XP'; amount: number };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'PROFILE_LOADED':
      return { ...state, isLoading: false, profile: action.payload };

    case 'START_SESSION':
      return {
        ...state,
        session: {
          players: action.payload.players,
          deck: action.payload.deck,
          currentIndex: 0,
          startedAt: Date.now(),
          isActive: true,
        },
      };

    case 'NEXT_CARD': {
      if (!state.session) return state;
      const nextIndex = state.session.currentIndex + 1;
      const isFinished = nextIndex >= state.session.deck.length;
      return {
        ...state,
        session: isFinished
          ? { ...state.session, isActive: false }
          : { ...state.session, currentIndex: nextIndex },
      };
    }

    case 'END_SESSION':
      return {
        ...state,
        session: null,
        profile: {
          ...state.profile,
          totalXP: state.profile.totalXP + action.xpEarned,
        },
      };

    case 'SET_LANGUAGE':
      return { ...state, profile: { ...state.profile, language: action.lang } };

    case 'ADD_XP':
      return {
        ...state,
        profile: { ...state.profile, totalXP: state.profile.totalXP + action.amount },
      };

    default:
      return state;
  }
}

const initialState: GameState = {
  session: null,
  profile: { totalXP: 0, isPremium: false, language: 'es' },
  isLoading: true,
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface GameContextValue {
  state: GameState;
  // Derived shortcuts
  currentCard: Challenge | null;
  level: Level;
  levelProgress: number;
  cardsLeft: number;
  // Actions
  startClassicGame: (players: Player[]) => void;
  nextCard: () => void;
  endGame: () => Promise<void>;
  changeLanguage: (lang: LangCode) => Promise<void>;
}

const GameContext = createContext<GameContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [xpSnapshot, setXpSnapshot] = useState(0);

  // Load persisted profile on mount
  useEffect(() => {
    async function loadProfile() {
      initI18n();
      const [totalXP, isPremium, storedLang] = await Promise.all([
        Storage.getTotalXP(),
        Storage.getIsPremium(),
        Storage.getLanguage(),
      ]);

      const language = (storedLang as LangCode) ?? (getLanguage() as LangCode);
      setLanguage(language);

      dispatch({
        type: 'PROFILE_LOADED',
        payload: { totalXP, isPremium, language },
      });
    }
    loadProfile();
  }, []);

  // Derived values
  const { session, profile } = state;
  const currentCard = session?.isActive
    ? session.deck[session.currentIndex] ?? null
    : null;
  const cardsLeft = session ? session.deck.length - session.currentIndex : 0;
  const level = getLevelForXP(profile.totalXP);
  const levelProgress = getLevelProgress(profile.totalXP);

  // ── Actions ──

  const startClassicGame = useCallback(
    (players: Player[]) => {
      const deck = getClassicDeck(profile.language);
      setXpSnapshot(profile.totalXP);
      dispatch({ type: 'START_SESSION', payload: { players, deck } });
    },
    [profile.language, profile.totalXP]
  );

  const nextCard = useCallback(() => {
    dispatch({ type: 'NEXT_CARD' });
  }, []);

  const endGame = useCallback(async () => {
    if (!session) return;

    const elapsedMs = Date.now() - session.startedAt;
    const elapsedMin = elapsedMs / 60_000;

    let xp = XP_REWARDS.completeGame;
    if (elapsedMin >= 10) xp += XP_REWARDS.gameLongerThan10Min;
    else if (elapsedMin >= 5) xp += XP_REWARDS.gameLongerThan5Min;

    const isFirstToday = await Storage.isFirstGameToday();
    if (isFirstToday) {
      xp += XP_REWARDS.firstGameOfDay;
      await Storage.setLastPlayedDate(new Date().toISOString().slice(0, 10));
    }

    await Storage.addXP(xp);
    dispatch({ type: 'END_SESSION', xpEarned: xp });
    // Prevent re-use of same snapshot
    setXpSnapshot(0);
  }, [session]);

  const changeLanguage = useCallback(async (lang: LangCode) => {
    setLanguage(lang);
    await Storage.setLanguage(lang);
    dispatch({ type: 'SET_LANGUAGE', lang });
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        currentCard,
        level,
        levelProgress,
        cardsLeft,
        startClassicGame,
        nextCard,
        endGame,
        changeLanguage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}
