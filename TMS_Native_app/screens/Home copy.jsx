import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Button, Card, CardImage, List, ListItem, TextInput, IconButton, BottomNavigation } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [packages, setPackages] = useState([]);


    const username = AsyncStorage.getItem('username');
    // const url = 'http://192.168.1.14:4000/packages';
    const url = "http://192.168.222.127:4000/packages";


    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(url, {
                    headers: {
                        Token: token,
                    },
                });
                if (response.data && Array.isArray(response.data.data)) {
                    setPackages(response.data.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, []);
    // console.log("packages ---", packages);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/profile.png')}

                    style={styles.profilePicture}
                />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Hello, {username}</Text>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <IconButton icon={"magnify"} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Packages"
                    // underlineColor="transparent"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    mode="outlined"
                    left={<TextInput.Icon name="magnify" />}
                    right={<TextInput.Icon name="filter" />}
                    theme={{ roundness: 25 }}

                />
                <IconButton icon="filter-variant" size={24} style={styles.filterIcon} />
            </View>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('PopularPackages')}>
                    <Text style={styles.navBarItem}>Popular Packages</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PopularCity')}>
                    <Text style={styles.navBarItem}>Popular City</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PopularHotels')}>
                    <Text style={styles.navBarItem}>Popular Hotels</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.HeadingContainer}>
                <Text style={styles.tabText}>Popular Packages</Text>
            </View> */}
            <ScrollView style={styles.scrollView}>
                <View style={styles.packageList}>
                    {packages.map((pkg) => (
                        <Card key={pkg.pkg_id} style={styles.card}>
                            <Card.Cover source={{ uri: "http://192.168.222.127:4000/" + pkg.image }} />
                            {/* <div >
                                <img
                                    src={"http://localhost:4000/" + pkg.image}
                                    alt={pkg.city}
                                    className='image' />
                            </div> */}
                            <Card.Content>
                                <Text style={styles.cardTitle}>{pkg.city}</Text>
                                <Text style={styles.cardDescription}>{pkg.description}</Text>
                                <Text style={styles.cardCost}>Cost: ₹{pkg.total_cost}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => console.log('Package selected:', pkg.name)}>Select</Button>
                            </Card.Actions>
                        </Card>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        // paddingBottom: 20,
        paddingHorizontal: 20,
    },
    profilePicture: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 10,

    },
    headerTextContainer: {
        flexDirection: 'column',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 18,
        color: '#555',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background
        borderRadius: 25,
        // padding: 5,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 4,
    },
    searchIcon: {
        // marginLeft: 5,
        position: 'absolute',
        // left: 10,
        zIndex: 1
    },
    filterIcon: {
        marginRight: 5,
        position: 'absolute',
        right: 10,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    navBarItem: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    searchInput: {
        backgroundColor: 'transparent',
        borderRadius: 25,
        flex: 1,
        // paddingRight: 20,
        height: 50,
    },
    HeadingContainer: {
        // flexDirection: s'row',
        // justifyContent: 'space-around',
        // marginBottom: 20,
        padding: 14,
    },
    tabText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    packageList: {
        padding: 10,
        // marginLeft: 10,
    },
    card: {
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
    },
    cardCost: {
        fontSize: 14,
        color: '#777',
    },
});
