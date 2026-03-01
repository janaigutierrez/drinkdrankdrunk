export interface Level {
  level: number;
  title: string;
  minXP: number;
  emoji: string;
}

export const LEVELS: Level[] = [
  { level: 1,  title: 'Novato',              minXP: 0,    emoji: '🍺' },
  { level: 2,  title: 'Beginner',            minXP: 100,  emoji: '🍻' },
  { level: 3,  title: 'Social Drinker',      minXP: 300,  emoji: '🥂' },
  { level: 4,  title: 'Party Animal',        minXP: 550,  emoji: '🎉' },
  { level: 5,  title: 'Party Starter',       minXP: 700,  emoji: '🎲' },
  { level: 6,  title: 'Night Owl',           minXP: 1000, emoji: '🦉' },
  { level: 7,  title: 'Bar Legend',          minXP: 1400, emoji: '🎸' },
  { level: 8,  title: 'Hot Player',          minXP: 1500, emoji: '🔥' },
  { level: 9,  title: 'Elite Drinker',       minXP: 2000, emoji: '💎' },
  { level: 10, title: 'Master',              minXP: 2500, emoji: '⭐' },
  { level: 11, title: 'VIP',                 minXP: 2750, emoji: '👑' },
  { level: 12, title: 'Legend of the Night', minXP: 3000, emoji: '🏆' },
];

export const XP_REWARDS = {
  completeGame: 1,
  gameLongerThan5Min: 15,
  gameLongerThan10Min: 25,
  firstGameOfDay: 5,
  shareResult: 3,
} as const;

export function getLevelForXP(xp: number): Level {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXP) current = lvl;
    else break;
  }
  return current;
}

/** Progress toward next level (0–1). Returns 1 if at max level. */
export function getLevelProgress(xp: number): number {
  const current = getLevelForXP(xp);
  const nextLevel = LEVELS.find((l) => l.level === current.level + 1);
  if (!nextLevel) return 1;

  const xpIntoLevel = xp - current.minXP;
  const xpNeeded = nextLevel.minXP - current.minXP;
  return Math.min(xpIntoLevel / xpNeeded, 1);
}
