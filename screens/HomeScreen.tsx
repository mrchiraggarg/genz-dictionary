// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Searchbar, Card, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { getCurrentUserRole } from './../utils/userService';

import {
    collection,
    getDocs,
    query,
    orderBy,
    where,
    updateDoc,
    doc,
} from 'firebase/firestore';

type SlangItem = {
    id: string;
    word: string;
    meaning: string;
    usage?: string;
    deleted?: number;
    upvotes: number;
    downvotes: number;
};

const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [slangs, setSlangs] = useState<SlangItem[]>([]);
    const [filtered, setFiltered] = useState<SlangItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await getCurrentUserRole();
            setRole(userRole);
        };
        fetchRole();
    }, []);

    const isAdmin = role === 'admin';

    const fetchSlangs = async () => {
        setLoading(true);
        try {
            const slangCollection = query(collection(db, 'slangs'), where('deleted', '==', 0), orderBy('timestamp', 'desc'));
            const snapshot = await getDocs(slangCollection);
            const slangData = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            })) as SlangItem[];
            setSlangs(slangData);
            setFiltered(slangData);
        } catch (err) {
            console.error('Error fetching slangs:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlangs();
    }, []);

    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        setFiltered(
            slangs.filter((item) =>
                item.word.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const handleVote = async (id: string, type: 'upvote' | 'downvote') => {
        const slangRef = doc(db, 'slangs', id);
        const updatedList = slangs.map((item) => {
            if (item.id === id) {
                const updated = {
                    ...item,
                    upvotes: type === 'upvote' ? item.upvotes + 1 : item.upvotes,
                    downvotes: type === 'downvote' ? item.downvotes + 1 : item.downvotes,
                };
                // Update Firestore
                updateDoc(slangRef, {
                    upvotes: updated.upvotes,
                    downvotes: updated.downvotes,
                });
                return updated;
            }
            return item;
        });

        setSlangs(updatedList);
        setFiltered(updatedList);
    };

    const handleDelete = async (id: string) => {
        try {
            const slangRef = doc(db, 'slangs', id);
            await updateDoc(slangRef, { deleted: 1 });

            // Update local state to remove deleted slang
            const updatedList = slangs.filter((item) => item.id !== id);
            setSlangs(updatedList);
            setFiltered(updatedList);
        } catch (err) {
            console.error('Error deleting slang:', err);
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Searchbar
                placeholder="Search slang..."
                value={searchQuery}
                onChangeText={onChangeSearch}
                style={{ marginBottom: 16 }}
            />

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Card style={{ marginBottom: 10 }}>
                            <Card.Title title={item.word} />
                            <Card.Content>
                                <Text>{item.meaning}</Text>
                                {item.usage && (
                                    <Text style={{ fontStyle: 'italic', marginTop: 4 }}>
                                        Example: {item.usage}
                                    </Text>
                                )}
                            </Card.Content>
                            <Card.Actions>
                                <IconButton
                                    icon="thumb-up"
                                    onPress={() => handleVote(item.id, 'upvote')}
                                />
                                <Text>{item.upvotes}</Text>
                                <IconButton
                                    icon="thumb-down"
                                    onPress={() => handleVote(item.id, 'downvote')}
                                />
                                <Text>{item.downvotes}</Text>

                                {isAdmin && (
                                    <View>
                                        <Button onPress={() => navigation.navigate('Slang Form', { slangId: item.id })}>
                                            Edit
                                        </Button>
                                        <Button onPress={() => handleDelete(item.id)} color="red">
                                            Delete
                                        </Button>
                                    </View>
                                )}
                            </Card.Actions>
                        </Card>
                    )}
                />
            )}

            {isAdmin && (
                <Button

                    mode="contained"
                    onPress={() => navigation.navigate('Slang Form')}
                    style={{ marginTop: 16 }}
                >
                    Add New Slang
                </Button>
            )}

        </View>
    );
};

export default HomeScreen;
