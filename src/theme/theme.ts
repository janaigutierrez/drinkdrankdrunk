export const colors = {
  // Backgrounds
  bg: '#0D0D0D',
  surface: '#1A1A1A',
  card: '#222222',
  cardElevated: '#2A2A2A',

  // Brand
  primary: '#F59E0B',       // Amber - beer/warm
  primaryDark: '#B45309',
  primaryLight: '#FCD34D',
  secondary: '#EF4444',     // Red - hot/danger
  accent: '#8B5CF6',        // Purple - party

  // Text
  text: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textInverse: '#0D0D0D',

  // UI
  border: '#2D2D2D',
  borderLight: '#3D3D3D',
  overlay: 'rgba(0,0,0,0.7)',

  // Intensity colors
  suau: '#34D399',    // Green - easy
  mig: '#F59E0B',     // Amber - medium
  picant: '#EF4444',  // Red - spicy

  // Mode colors
  classic: '#F59E0B',
  hot: '#EF4444',
  teams: '#3B82F6',
  roulette: '#8B5CF6',
  bomb: '#EC4899',
  seasonal: '#10B981',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  base: 17,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  display: 52,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  }),
};
