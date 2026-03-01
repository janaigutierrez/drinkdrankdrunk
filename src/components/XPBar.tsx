import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, radius, spacing } from '../theme/theme';
import { Level } from '../utils/xp';

interface XPBarProps {
  level: Level;
  progress: number; // 0–1
  totalXP: number;
}

export default function XPBar({ level, progress, totalXP }: XPBarProps) {
  const fillAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: progress,
      duration: 900,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthStyle = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Badge */}
      <View style={styles.badge}>
        <Text style={styles.emoji}>{level.emoji}</Text>
        <View>
          <Text style={styles.levelLabel}>Niv. {level.level}</Text>
          <Text style={styles.levelTitle}>{level.title}</Text>
        </View>
      </View>

      {/* Bar */}
      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, { width: widthStyle }]} />
      </View>

      {/* XP counter */}
      <Text style={styles.xpText}>{totalXP} XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  emoji: {
    fontSize: fontSize.lg,
  },
  levelLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  levelTitle: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  xpText: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    minWidth: 48,
    textAlign: 'right',
  },
});
