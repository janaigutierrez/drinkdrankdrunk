import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, radius, shadow, spacing } from '../theme/theme';

export interface ModeConfig {
  id: string;
  emoji: string;
  name: string;
  description: string;
  color: string;
  isLocked: boolean;
  unlockHint?: string;
}

interface ModeCardProps {
  mode: ModeConfig;
  onPress: (mode: ModeConfig) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ModeCard({ mode, onPress }: ModeCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  function handlePressIn() {
    Animated.spring(scale, {
      toValue: 0.96,
      damping: 15,
      stiffness: 400,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(scale, {
      toValue: 1,
      damping: 15,
      stiffness: 400,
      useNativeDriver: true,
    }).start();
  }

  return (
    <AnimatedPressable
      style={[styles.card, { transform: [{ scale }] }, mode.isLocked && styles.cardLocked]}
      onPress={() => onPress(mode)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={mode.name}
      accessibilityState={{ disabled: mode.isLocked }}
    >
      {/* Color accent strip */}
      <View style={[styles.accentStrip, { backgroundColor: mode.isLocked ? colors.border : mode.color }]} />

      <View style={styles.content}>
        <Text style={[styles.emoji, mode.isLocked && styles.emojiLocked]}>
          {mode.isLocked ? '🔒' : mode.emoji}
        </Text>
        <Text style={[styles.name, mode.isLocked && styles.textLocked]}>{mode.name}</Text>
        <Text style={[styles.description, mode.isLocked && styles.textLocked]} numberOfLines={2}>
          {mode.isLocked ? (mode.unlockHint ?? 'Coming soon') : mode.description}
        </Text>
      </View>

      {/* Free badge */}
      {!mode.isLocked && (
        <View style={[styles.badge, { backgroundColor: mode.color }]}>
          <Text style={styles.badgeText}>FREE</Text>
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 130,
    ...shadow.md,
  },
  cardLocked: {
    opacity: 0.55,
  },
  accentStrip: {
    height: 4,
    width: '100%',
  },
  content: {
    padding: spacing.md,
    gap: spacing.xs,
    flex: 1,
  },
  emoji: {
    fontSize: fontSize.xl,
    marginBottom: spacing.xs,
  },
  emojiLocked: {
    opacity: 0.6,
  },
  name: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  textLocked: {
    color: colors.textMuted,
  },
  description: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    lineHeight: 16,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: {
    color: colors.textInverse,
    fontSize: 9,
    fontWeight: fontWeight.black,
    letterSpacing: 0.8,
  },
});
