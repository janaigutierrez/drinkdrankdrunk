import React from 'react';
import { StyleSheet, View } from 'react-native';

import { GameProvider } from './src/context/GameContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.root}>
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
