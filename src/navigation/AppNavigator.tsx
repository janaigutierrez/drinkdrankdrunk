import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PlayerSetupScreen from '../screens/PlayerSetupScreen';
import GameScreen from '../screens/GameScreen';

// ─── Route param types ────────────────────────────────────────────────────────

export type RootStackParamList = {
  Home: undefined;
  PlayerSetup: { mode: 'classic' };
  Game: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type PlayerSetupScreenProps = NativeStackScreenProps<RootStackParamList, 'PlayerSetup'>;
export type GameScreenProps = NativeStackScreenProps<RootStackParamList, 'Game'>;

// ─── Navigator ────────────────────────────────────────────────────────────────

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: 'fade' }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="PlayerSetup"
          component={PlayerSetupScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ animation: 'slide_from_right', gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
