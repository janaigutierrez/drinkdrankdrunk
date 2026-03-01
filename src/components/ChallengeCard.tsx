/**
 * ChallengeCard
 *
 * The hero component of the game. Shows one challenge at a time.
 * Animates in on mount and animates out when the user advances.
 * Uses Reanimated for smooth 60fps transitions.
 */

import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

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
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const translateX = useSharedValue(0);
  const cardScale = useSharedValue(0.95);

  // Animate in on mount / challenge change
  useEffect(() => {
    opacity.value = 0;
    translateY.value = 30;
    cardScale.value = 0.95;
    translateX.value = 0;

    opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.quad) });
    translateY.value = withTiming(0, { duration: 350, easing: Easing.out(Easing.back(1.2)) });
    cardScale.value = withTiming(1, { duration: 350, easing: Easing.out(Easing.back(1.2)) });
  }, [challenge.id]);

  function animateOut(direction: 'left' | 'right', callback: () => void) {
    const target = direction === 'left' ? -400 : 400;
    opacity.value = withTiming(0, { duration: 250 });
    translateX.value = withTiming(target, { duration: 280, easing: Easing.in(Easing.quad) }, () => {
      runOnJS(callback)();
    });
  }

  // Swipe gesture
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (Math.abs(e.translationX) > SWIPE_THRESHOLD) {
        const dir = e.translationX > 0 ? 'right' : 'left';
        runOnJS(animateOut)(dir, onNext);
      } else {
        // Snap back
        translateX.value = withSpring(0, { damping: 15, stiffness: 300 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: cardScale.value },
    ],
  }));

  const accentColor = INTENSITY_COLOR[challenge.intensity];

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, animatedStyle]}>
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
    </GestureDetector>
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
