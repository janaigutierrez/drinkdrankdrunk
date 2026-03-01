/**
 * ChallengeCard
 *
 * Shows one challenge at a time.
 * Animates in on mount and animates out when the user advances.
 * Swipe left/right (or tap Next) to advance.
 */

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, PanResponder, StyleSheet, Text, View } from 'react-native';

import { Challenge } from '../data/challenges';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '../theme/theme';

// Intensity → accent color map
const INTENSITY_COLOR: Record<Challenge['intensity'], string> = {
  suau: colors.suau,
  mig: colors.mig,
  picant: colors.picant,
};

const INTENSITY_LABEL: Record<Challenge['intensity'], string> = {
  suau: '🟢 Mild',
  mig: '🟡 Medium',
  picant: '🔴 Spicy',
};

const TYPE_EMOJI: Record<Challenge['type'], string> = {
  never: '🤚',
  dare: '🎯',
  question: '💬',
  rule: '📜',
  drink: '🍺',
};

interface ChallengeCardProps {
  challenge: Challenge;
  cardNumber: number;
  totalCards: number;
  onNext: () => void;
}

const SWIPE_THRESHOLD = 80;

export default function ChallengeCard({
  challenge,
  cardNumber,
  totalCards,
  onNext,
}: ChallengeCardProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.95)).current;

  // Animate in on mount / challenge change
  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(30);
    cardScale.setValue(0.95);
    translateX.setValue(0);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();
  }, [challenge.id]);

  function animateOut(direction: 'left' | 'right', callback: () => void) {
    const target = direction === 'left' ? -400 : 400;
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
      Animated.timing(translateX, {
        toValue: target,
        duration: 280,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => callback());
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10,
      onPanResponderMove: (_, { dx }) => {
        translateX.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          animateOut(dx > 0 ? 'right' : 'left', onNext);
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            damping: 15,
            stiffness: 300,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          damping: 15,
          stiffness: 300,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const accentColor = INTENSITY_COLOR[challenge.intensity];

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{ translateY }, { translateX }, { scale: cardScale }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      {/* Top accent bar */}
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      <View style={styles.body}>
        {/* Header row */}
        <View style={styles.header}>
          <View style={[styles.typePill, { borderColor: accentColor }]}>
            <Text style={styles.typeEmoji}>{TYPE_EMOJI[challenge.type]}</Text>
            <Text style={[styles.typeLabel, { color: accentColor }]}>
              {challenge.type.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.intensityLabel}>{INTENSITY_LABEL[challenge.intensity]}</Text>
        </View>

        {/* Challenge text */}
        <Text style={styles.challengeText}>{challenge.text}</Text>

        {/* Sips indicator */}
        {challenge.sips !== undefined && (
          <View style={styles.sipsRow}>
            <Text style={styles.sipsEmoji}>
              {'🍺'.repeat(Math.min(challenge.sips, 4))}
            </Text>
            <Text style={styles.sipsText}>
              {challenge.sips === 1 ? '1 sip' : `${challenge.sips} sips`}
            </Text>
          </View>
        )}
      </View>

      {/* Progress indicator */}
      <View style={styles.footer}>
        <Text style={styles.progressText}>
          {cardNumber} / {totalCards}
        </Text>
        <Text style={styles.swipeHint}>Swipe or tap Next →</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
    ...shadow.lg,
  },
  accentBar: {
    height: 5,
    width: '100%',
  },
  body: {
    padding: spacing.xl,
    gap: spacing.lg,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  typeEmoji: {
    fontSize: fontSize.sm,
  },
  typeLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    letterSpacing: 0.5,
  },
  intensityLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  challengeText: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: 32,
    textAlign: 'center',
  },
  sipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  sipsEmoji: {
    fontSize: fontSize.md,
    letterSpacing: 4,
  },
  sipsText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  progressText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  swipeHint: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
});
