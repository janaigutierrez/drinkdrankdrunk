// Challenge metadata — language-agnostic.
// Text content lives in src/i18n/challenges/{lang}.ts keyed by id.

export type Intensity = 'suau' | 'mig' | 'picant';
export type ChallengeType = 'dare' | 'never' | 'question' | 'rule' | 'drink';
export type GameMode = 'classic' | 'hot' | 'teams';

export interface ChallengeMeta {
  id: string;
  mode: GameMode;
  intensity: Intensity;
  type: ChallengeType;
  minPlayers?: number; // minimum players required
  sips?: number;       // sips to drink (for drink/dare types)
  usesPlayers?: boolean; // whether the challenge text uses {{player}} tokens
}

// ─── CLASSIC MODE ──────────────────────────────────────────────────────────────

export const challengesMeta: ChallengeMeta[] = [
  // ── Suau ──
  { id: 'c_s_001', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_002', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_003', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_004', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_005', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_006', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_007', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_008', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_009', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_010', mode: 'classic', intensity: 'suau', type: 'never', sips: 1 },
  { id: 'c_s_011', mode: 'classic', intensity: 'suau', type: 'dare', sips: 1 },
  { id: 'c_s_012', mode: 'classic', intensity: 'suau', type: 'dare', sips: 1 },
  { id: 'c_s_013', mode: 'classic', intensity: 'suau', type: 'dare', sips: 2 },
  { id: 'c_s_014', mode: 'classic', intensity: 'suau', type: 'question' },
  { id: 'c_s_015', mode: 'classic', intensity: 'suau', type: 'question' },
  { id: 'c_s_016', mode: 'classic', intensity: 'suau', type: 'question' },
  { id: 'c_s_017', mode: 'classic', intensity: 'suau', type: 'rule', sips: 1 },
  { id: 'c_s_018', mode: 'classic', intensity: 'suau', type: 'rule', sips: 1 },
  { id: 'c_s_019', mode: 'classic', intensity: 'suau', type: 'dare', sips: 1 },
  { id: 'c_s_020', mode: 'classic', intensity: 'suau', type: 'dare', sips: 1 },

  // ── Mig ──
  { id: 'c_m_001', mode: 'classic', intensity: 'mig', type: 'never', sips: 2 },
  { id: 'c_m_002', mode: 'classic', intensity: 'mig', type: 'never', sips: 2 },
  { id: 'c_m_003', mode: 'classic', intensity: 'mig', type: 'never', sips: 2 },
  { id: 'c_m_004', mode: 'classic', intensity: 'mig', type: 'never', sips: 2 },
  { id: 'c_m_005', mode: 'classic', intensity: 'mig', type: 'never', sips: 2 },
  { id: 'c_m_006', mode: 'classic', intensity: 'mig', type: 'never', sips: 2 },
  { id: 'c_m_007', mode: 'classic', intensity: 'mig', type: 'never', sips: 2 },
  { id: 'c_m_008', mode: 'classic', intensity: 'mig', type: 'never', sips: 2 },
  { id: 'c_m_009', mode: 'classic', intensity: 'mig', type: 'dare', sips: 2 },
  { id: 'c_m_010', mode: 'classic', intensity: 'mig', type: 'dare', sips: 2 },
  { id: 'c_m_011', mode: 'classic', intensity: 'mig', type: 'dare', sips: 3 },
  { id: 'c_m_012', mode: 'classic', intensity: 'mig', type: 'dare', sips: 2 },
  { id: 'c_m_013', mode: 'classic', intensity: 'mig', type: 'question' },
  { id: 'c_m_014', mode: 'classic', intensity: 'mig', type: 'question' },
  { id: 'c_m_015', mode: 'classic', intensity: 'mig', type: 'rule', sips: 2 },
  { id: 'c_m_016', mode: 'classic', intensity: 'mig', type: 'rule', sips: 2 },
  { id: 'c_m_017', mode: 'classic', intensity: 'mig', type: 'dare', sips: 2 },
  { id: 'c_m_018', mode: 'classic', intensity: 'mig', type: 'dare', sips: 2 },
  { id: 'c_m_019', mode: 'classic', intensity: 'mig', type: 'dare', sips: 3 },
  { id: 'c_m_020', mode: 'classic', intensity: 'mig', type: 'dare', sips: 2 },

  // ── Picant ──
  { id: 'c_p_001', mode: 'classic', intensity: 'picant', type: 'never', sips: 3 },
  { id: 'c_p_002', mode: 'classic', intensity: 'picant', type: 'never', sips: 3 },
  { id: 'c_p_003', mode: 'classic', intensity: 'picant', type: 'never', sips: 3 },
  { id: 'c_p_004', mode: 'classic', intensity: 'picant', type: 'never', sips: 3 },
  { id: 'c_p_005', mode: 'classic', intensity: 'picant', type: 'never', sips: 3 },
  { id: 'c_p_006', mode: 'classic', intensity: 'picant', type: 'never', sips: 3 },
  { id: 'c_p_007', mode: 'classic', intensity: 'picant', type: 'dare', sips: 3 },
  { id: 'c_p_008', mode: 'classic', intensity: 'picant', type: 'dare', sips: 3 },
  { id: 'c_p_009', mode: 'classic', intensity: 'picant', type: 'dare', sips: 3 },
  { id: 'c_p_010', mode: 'classic', intensity: 'picant', type: 'dare', sips: 4 },
  { id: 'c_p_011', mode: 'classic', intensity: 'picant', type: 'question' },
  { id: 'c_p_012', mode: 'classic', intensity: 'picant', type: 'question' },
  { id: 'c_p_013', mode: 'classic', intensity: 'picant', type: 'rule', sips: 3 },
  { id: 'c_p_014', mode: 'classic', intensity: 'picant', type: 'dare', sips: 3 },
  { id: 'c_p_015', mode: 'classic', intensity: 'picant', type: 'dare', sips: 3 },
  { id: 'c_p_016', mode: 'classic', intensity: 'picant', type: 'dare', sips: 3 },
  { id: 'c_p_017', mode: 'classic', intensity: 'picant', type: 'dare', sips: 3 },
  { id: 'c_p_018', mode: 'classic', intensity: 'picant', type: 'dare', sips: 3 },
  { id: 'c_p_019', mode: 'classic', intensity: 'picant', type: 'never', sips: 3 },
  { id: 'c_p_020', mode: 'classic', intensity: 'picant', type: 'dare', sips: 4 },
];
