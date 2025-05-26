import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

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
const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // Or a Splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "GenZ Dictionary" : "Login"}>
        {user ? (
          <>
            <Stack.Screen name="GenZ Dictionary" component={HomeScreen} />
            <Stack.Screen name="Slang Form" component={SlangFormScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
