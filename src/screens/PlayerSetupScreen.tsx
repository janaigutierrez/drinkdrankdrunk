import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
} from 'react-native-reanimated';

import { PlayerSetupScreenProps } from '../navigation/AppNavigator';
import { useGame, Player } from '../context/GameContext';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '../theme/theme';

const MAX_PLAYERS = 8;
const MIN_PLAYERS = 2;

function createPlayer(name: string): Player {
  return { id: Date.now().toString() + Math.random().toString(36).slice(2), name };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlayerSetupScreen({ navigation }: PlayerSetupScreenProps) {
  const { startClassicGame } = useGame();

  const [players, setPlayers] = useState<Player[]>([
    createPlayer(''),
    createPlayer(''),
  ]);

  const inputRefs = useRef<Record<string, TextInput | null>>({});

  function updatePlayerName(id: string, name: string) {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  }

  function addPlayer() {
    if (players.length >= MAX_PLAYERS) return;
    setPlayers((prev) => [...prev, createPlayer('')]);
  }

  function removePlayer(id: string) {
    if (players.length <= MIN_PLAYERS) return;
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  function handleStartGame() {
    const filledPlayers = players.filter((p) => p.name.trim().length > 0);

    if (filledPlayers.length < MIN_PLAYERS) {
      Alert.alert('Not enough players', `Add at least ${MIN_PLAYERS} player names.`);
      return;
    }

    startClassicGame(filledPlayers);
    navigation.navigate('Game');
  }

  const canAddMore = players.length < MAX_PLAYERS;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Who's playing?</Text>
          <Text style={styles.subtitle}>
            {players.length} / {MAX_PLAYERS} players
          </Text>
        </View>

        {/* ── Player list ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {players.map((player, index) => (
            <Animated.View
              key={player.id}
              entering={FadeInDown.duration(250).delay(index * 40)}
              exiting={FadeOutUp.duration(200)}
              layout={Layout.springify()}
              style={styles.playerRow}
            >
              {/* Number badge */}
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>

              {/* Input */}
              <TextInput
                ref={(ref) => { inputRefs.current[player.id] = ref; }}
                style={styles.input}
                value={player.name}
                onChangeText={(text) => updatePlayerName(player.id, text)}
                placeholder={`Player ${index + 1}`}
                placeholderTextColor={colors.textMuted}
                maxLength={20}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (index < players.length - 1) {
                    inputRefs.current[players[index + 1].id]?.focus();
                  } else {
                    addPlayer();
                  }
                }}
                autoCapitalize="words"
              />

              {/* Remove button */}
              {players.length > MIN_PLAYERS && (
                <Pressable
                  style={styles.removeBtn}
                  onPress={() => removePlayer(player.id)}
                  accessibilityLabel={`Remove player ${index + 1}`}
                >
                  <Text style={styles.removeBtnText}>✕</Text>
                </Pressable>
              )}
            </Animated.View>
          ))}

          {/* Add player row */}
          {canAddMore && (
            <TouchableOpacity style={styles.addBtn} onPress={addPlayer}>
              <Text style={styles.addBtnText}>＋ Add player</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* ── Start button ── */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={handleStartGame}
            activeOpacity={0.85}
          >
            <Text style={styles.startBtnText}>🎮 START GAME</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  backBtn: {
    marginBottom: spacing.sm,
  },
  backText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.black,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  scroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  removeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    color: colors.textMuted,
    fontSize: fontSize.md,
  },
  addBtn: {
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  addBtnText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  startBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    ...shadow.glow(colors.primary),
  },
  startBtnText: {
    color: colors.textInverse,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.black,
    letterSpacing: 1,
  },
});
