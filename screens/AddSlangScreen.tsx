// AddSlangScreen.tsx
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AddSlangScreen = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [usage, setUsage] = useState('');

  const handleSubmit = async () => {
    if (!word || !meaning) {
      Alert.alert('Please fill in all required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'slangs'), {
        word,
        meaning,
        usage,
        timestamp: serverTimestamp(),
        upvotes: 0,
        downvotes: 0
      });

      Alert.alert('Slang submitted!', `${word} added successfully.`);
      setWord('');
      setMeaning('');
      setUsage('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit slang.');
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
        style={{ marginBottom: 12 }}
        multiline
      />
      <TextInput
        label="Usage Example (optional)"
        value={usage}
        onChangeText={setUsage}
        style={{ marginBottom: 12 }}
        multiline
      />
      <Button mode="contained" onPress={handleSubmit}>
        Submit Slang
      </Button>
    </View>
  );
};

export default AddSlangScreen;
