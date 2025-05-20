import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { addDoc, collection, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './../types/types'; // import your types

type Props = NativeStackScreenProps<RootStackParamList, 'Slang Form'>;

const SlangFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const slangId = route.params?.slangId;
  const isEdit = !!slangId;

  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [usage, setUsage] = useState('');

  useEffect(() => {
    if (isEdit) {
      const loadSlang = async () => {
        const docRef = doc(db, 'slangs', slangId!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWord(data.word);
          setMeaning(data.meaning);
          setUsage(data.usage || '');
        }
      };
      loadSlang();
    }
  }, [slangId]);

  const handleSubmit = async () => {
    if (!word || !meaning) {
      Alert.alert('Please enter both word and meaning.');
      return;
    }

    try {
      if (isEdit) {
        await updateDoc(doc(db, 'slangs', slangId!), {
          word,
          meaning,
          usage,
        });
        Alert.alert('Success', 'Slang updated!');
      } else {
        await addDoc(collection(db, 'slangs'), {
          word,
          meaning,
          usage,
          upvotes: 0,
          downvotes: 0,
          timestamp: serverTimestamp(),
        });
        Alert.alert('Success', 'Slang added!');
      }

      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        label="Slang Word"
        value={word}
        onChangeText={setWord}
        style={{ marginBottom: 12 }}
      />
      <TextInput
        label="Meaning"
        value={meaning}
        onChangeText={setMeaning}
        multiline
        style={{ marginBottom: 12 }}
      />
      <TextInput
        label="Usage (Optional)"
        value={usage}
        onChangeText={setUsage}
        multiline
        style={{ marginBottom: 12 }}
      />
      <Button mode="contained" onPress={handleSubmit}>
        {isEdit ? 'Update Slang' : 'Add Slang'}
      </Button>
    </View>
  );
};

export default SlangFormScreen;
