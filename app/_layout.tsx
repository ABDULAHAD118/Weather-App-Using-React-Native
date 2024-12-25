import React from 'react';
import 'react-native-reanimated';
import '../global.css';
import HomeScreen from './HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function RootLayout() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="index" options={{ headerShown: false }} component={HomeScreen} />
    </Stack.Navigator>

  );
}