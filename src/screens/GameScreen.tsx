import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { GameScreenProps } from '../navigation/AppNavigator';
import ChallengeCard from '../components/ChallengeCard';
import { useGame } from '../context/GameContext';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '../theme/theme';

export default function GameScreen({ navigation }: GameScreenProps) {
  const { state, currentCard, cardsLeft, nextCard, endGame } = useGame();
  const { session } = state;

  // Track whether we are in the "end" screen (no more cards)
  const [showGameOver, setShowGameOver] = useState(false);

  // Redirect back if session is missing (e.g. after app restart)
  useEffect(() => {
    if (!session) {
      navigation.replace('Home');
    }
  }, [session]);

  // Watch for session ending
  useEffect(() => {
    if (session && !session.isActive) {
      setShowGameOver(true);
    }
  }, [session?.isActive]);

  const handleNext = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nextCard();
  }, [nextCard]);

  const handleEndGame = useCallback(async () => {
    await endGame();
    navigation.replace('Home');
  }, [endGame, navigation]);

  function confirmQuit() {
    Alert.alert(
      'Quit game?',
      'Progress will be lost.',
      [
        { text: 'Keep playing', style: 'cancel' },
        {
          text: 'Quit',
          style: 'destructive',
          onPress: handleEndGame,
        },
      ]
    );
  }

  if (!session) return null;

  // ── Game Over screen ──────────────────────────────────────────────────────
  if (showGameOver) {
    const totalCards = session.deck.length;
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverEmoji}>🏆</Text>
          <Text style={styles.gameOverTitle}>Game Over!</Text>
          <Text style={styles.gameOverSubtitle}>
            You survived {totalCards} challenges
          </Text>
          <View style={styles.gameOverActions}>
            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary]}
              onPress={async () => {
                await endGame();
                // Restart with same players
                navigation.replace('PlayerSetup', { mode: 'classic' });
              }}
            >
              <Text style={styles.btnPrimaryText}>Play again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={handleEndGame}
            >
              <Text style={styles.btnSecondaryText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ── Active game ───────────────────────────────────────────────────────────
  if (!currentCard) return null;

  const cardNumber = session.currentIndex + 1;
  const totalCards = session.deck.length;

  // Pick a random player from the session for dares that use {{player}}
  const randomPlayer =
    session.players[Math.floor(Math.random() * session.players.length)]?.name ?? 'Someone';

  const cardText = currentCard.text.replace(/\{\{player\}\}/g, randomPlayer);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.quitBtn} onPress={confirmQuit}>
          <Text style={styles.quitText}>✕ Quit</Text>
        </TouchableOpacity>

        <View style={styles.playersRow}>
          {session.players.slice(0, 4).map((p) => (
            <View key={p.id} style={styles.playerChip}>
              <Text style={styles.playerChipText} numberOfLines={1}>
                {p.name}
              </Text>
            </View>
          ))}
          {session.players.length > 4 && (
            <View style={styles.playerChip}>
              <Text style={styles.playerChipText}>+{session.players.length - 4}</Text>
            </View>
          )}
        </View>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${(cardNumber / totalCards) * 100}%` },
          ]}
        />
      </View>

      {/* ── Challenge card ── */}
      <View style={styles.cardArea}>
        <ChallengeCard
          challenge={{ ...currentCard, text: cardText }}
          cardNumber={cardNumber}
          totalCards={totalCards}
          onNext={handleNext}
        />
      </View>

      {/* ── Action buttons ── */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={handleNext}>
          <Text style={styles.btnSecondaryText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary, styles.btnLarge]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.btnPrimaryText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  quitBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quitText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  playersRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    justifyContent: 'flex-end',
  },
  playerChip: {
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 80,
  },
  playerChipText: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  cardArea: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  btn: {
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLarge: {
    flex: 1,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    ...shadow.glow(colors.primary),
  },
  btnSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnPrimaryText: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  btnSecondaryText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  // ── Game Over ──
  gameOverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  gameOverEmoji: {
    fontSize: 72,
  },
  gameOverTitle: {
    color: colors.text,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.black,
    textAlign: 'center',
  },
  gameOverSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.lg,
    textAlign: 'center',
  },
  gameOverActions: {
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
