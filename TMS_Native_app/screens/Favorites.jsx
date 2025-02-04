import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
const data = [
    {
        id: 1,
        title: 'City Hut Family Dhaba',
        // image: 'https://via.placeholder.com/200x200.png?text=Image+1',
        image: require('../assets/destination1.jpg'), // Image from assets folder
        rating: 4.9,
        description: 'Casual dhaba with palm frond covered roof...',
        location: 'Shillong',
    },
    {
        id: 2,
        title: 'Another Dhaba',
        // image: 'https://via.placeholder.com/200x200.png?text=Image+1',
        image: require('../assets/destination2.jpg'), // Image from assets folder
        rating: 4.8,
        description: 'Another description...',
        location: 'Shillong',
    },
    // Add more items as needed
];

const Favorites = () => {
    const [liked, setLiked] = useState([true, false]);
    const toggleLike = (index) => {
        const newLiked = [...liked];
        newLiked[index] = !newLiked[index];
        setLiked(newLiked);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Favorites</Text>
            <ScrollView>
                {data.map((item, index) => (
                    <Card key={item.id} style={styles.card}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.cardContent}>
                            <View style={styles.header}>
                                <Text style={styles.title}>{item.title}</Text>
                                <TouchableOpacity onPress={() => toggleLike(index)}>
                                    <Icon name={liked[index] ? "heart" : "heart-outline"} size={24} color={liked[index] ? "red" : "black"} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.rating}>{item.rating}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.location}>{item.location}</Text>
                        </View>
                    </Card>
                ))}
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    card: {
        margin: 10,
        borderRadius: 10,
    },
    image: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardContent: {
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 16,
        color: '#888',
    },
    description: {
        fontSize: 14,
        color: '#888',
    },
    location: {
        fontSize: 14,
        color: '#888',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
});

export default Favorites;
