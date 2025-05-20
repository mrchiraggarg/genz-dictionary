// types.ts or near your navigator
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  'Slang Form': { slangId?: string } | undefined; // slangId optional
  // other screens...
};
