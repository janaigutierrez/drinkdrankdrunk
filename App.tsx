import 'react-native-reanimated'; // must be first import
import 'react-native-gesture-handler'; // must be imported before navigation

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { GameProvider } from './src/context/GameContext';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * App root.
 *
 * Rendering order:
 *  GestureHandlerRootView  – required by react-native-gesture-handler
 *    GameProvider           – game state, user profile, XP, i18n
 *      AppNavigator         – navigation tree (Home → PlayerSetup → Game)
 */
export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
