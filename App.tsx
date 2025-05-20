// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddSlangScreen from './screens/AddSlangScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GenZ Dictionary" component={HomeScreen} />
        <Stack.Screen name="Add Slang" component={AddSlangScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
