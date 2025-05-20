import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Searchbar, Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const mockSlangs = [
  { id: '1', word: 'no cap', meaning: 'For real; not lying' },
  { id: '2', word: 'bet', meaning: 'Okay, deal, or I agree' },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtered, setFiltered] = useState(mockSlangs);
  const navigation = useNavigation<any>();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    setFiltered(
      mockSlangs.filter((item) =>
        item.word.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Searchbar
        placeholder="Search slang..."
        value={searchQuery}
        onChangeText={onChangeSearch}
        style={{ marginBottom: 16 }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Title title={item.word} />
            <Card.Content>
              <Text>{item.meaning}</Text>
            </Card.Content>
          </Card>
        )}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Add Slang')}
        style={{ marginTop: 16 }}
      >
        Add New Slang
      </Button>
    </View>
  );
};

export default HomeScreen;