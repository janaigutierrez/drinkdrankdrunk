import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Animated,
  Easing,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeScreenProps } from '../navigation/AppNavigator';
import ModeCard, { ModeConfig } from '../components/ModeCard';
import XPBar from '../components/XPBar';
import { useGame } from '../context/GameContext';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme/theme';

// ─── Game modes config ────────────────────────────────────────────────────────

const GAME_MODES: ModeConfig[] = [
  {
    id: 'classic',
    emoji: '🍺',
    name: 'Classic',
    description: 'Challenges & dares for everyone',
    color: colors.classic,
    isLocked: false,
  },
  {
    id: 'hot',
    emoji: '🔥',
    name: 'Hot Mode',
    description: 'Spicy challenges for adults',
    color: colors.hot,
    isLocked: true,
    unlockHint: '🔒 Level 3 or Premium',
  },
  {
    id: 'teams',
    emoji: '👥',
    name: 'Teams',
    description: 'Compete in groups, losers drink',
    color: colors.teams,
    isLocked: true,
    unlockHint: '🔒 Coming in v2',
  },
  {
    id: 'roulette',
    emoji: '🎲',
    name: 'Roulette',
    description: 'Spin the wheel, fate decides',
    color: colors.roulette,
    isLocked: true,
    unlockHint: '🔒 Coming in v2',
  },
  {
    id: 'bomb',
    emoji: '💣',
    name: 'Bomb',
    description: 'The phone vibrates... who has it drinks',
    color: colors.bomb,
    isLocked: true,
    unlockHint: '🔒 Coming in v2',
  },
  {
    id: 'seasonal',
    emoji: '🎭',
    name: 'Seasonal',
    description: 'Special events & themed packs',
    color: colors.seasonal,
    isLocked: true,
    unlockHint: '🔒 Premium',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { state, level, levelProgress } = useGame();
  const { profile } = state;

  // Entrance animation
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-20)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.delay(100),
        Animated.parallel([
          Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(titleY, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]),
      Animated.sequence([
        Animated.delay(300),
        Animated.timing(contentOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  function handleModePress(mode: ModeConfig) {
    if (mode.isLocked) {
      Alert.alert(
        '🔒 Locked',
        mode.unlockHint ?? 'This mode will be available soon.',
        [{ text: 'OK' }]
      );
      return;
    }
    if (mode.id === 'classic') {
      navigation.navigate('PlayerSetup', { mode: 'classic' });
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <Animated.View
          style={[styles.header, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}
        >
          <Text style={styles.appName}>🍺 Drink Drank Drunk</Text>
          <Text style={styles.tagline}>The night starts here</Text>
        </Animated.View>

        <Animated.View style={[styles.body, { opacity: contentOpacity }]}>
          {/* ── XP / Level Bar ── */}
          <XPBar
            level={level}
            progress={levelProgress}
            totalXP={profile.totalXP}
          />

          {/* ── Modes grid ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Game Modes</Text>
            <View style={styles.freeTag}>
              <Text style={styles.freeTagText}>MVP · Free</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {GAME_MODES.map((mode) => (
              <View key={mode.id} style={styles.gridItem}>
                <ModeCard mode={mode} onPress={handleModePress} />
              </View>
            ))}
          </View>

          {/* ── Footer note ── */}
          <Text style={styles.footerNote}>
            More modes and features coming soon 🚀
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  appName: {
    color: colors.primary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.black,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  tagline: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    marginTop: spacing.xs,
  },
  body: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  freeTag: {
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  freeTagText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gridItem: {
    width: '47%',
  },
  footerNote: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
