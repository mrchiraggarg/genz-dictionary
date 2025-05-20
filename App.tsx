import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SlangFormScreen from './screens/SlangFormScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  'GenZ Dictionary': undefined;
  'Slang Form': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="GenZ Dictionary" component={HomeScreen} />
        <Stack.Screen name="Slang Form" component={SlangFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
