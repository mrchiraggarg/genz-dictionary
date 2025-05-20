import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const AddSlangScreen = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [usage, setUsage] = useState('');

  const handleSubmit = () => {
    if (!word || !meaning) {
      Alert.alert('Please fill in all required fields.');
      return;
    }

    // Mock submission – in future, replace with Firestore logic
    Alert.alert('Slang submitted!', `${word} added to GenZ Dictionary`);
    setWord('');
    setMeaning('');
    setUsage('');
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
