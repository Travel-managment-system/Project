import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = (props) => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [userData, setUserData] = useState({})
    const url = 'http://172.20.10.4:4000/personal-details/';
    const [profile, setProfile] = useState([])

    console.log('1999999999', profile)


    useEffect( ()=>{
        AsyncStorage.getItem('userData').then((res)=>{
            setUserData(JSON.parse(res))
        }).catch((e)=>{console.log(e)})
    },[])

    useEffect(()=>{
        const fetchProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${url}${JSON.parse(userData?.user_id)}`, {
                    headers: {
                        Token: token,
                    },
                });
                if (response.data && Array.isArray(response.data.data)) {
                    console.log("response.data", response.data)
                    setProfile(response.data.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        fetchProfile()
    },[userData])
     

    const handleLogout = () => {
        // Perform any logout logic here, then redirect to the login page
        props.navigation.navigate("SigninPage");  // Replace 'Login' with the name of your login screen
        hideDialog();
    };
    return (<Provider>
        <View style={styles.container}>
            <Card.Content style={styles.content}>
                <View style={styles.profilePictureContainer}>
                    <Avatar.Image
                        size={100}
                        source={{ uri: 'https://via.placeholder.com/100' }}  // Replace with your profile pic URL
                        style={styles.profilePicture}
                    />
                    <IconButton
                        icon="pencil"
                        size={20}
                        onPress={() => {
                            props.navigation.navigate("EditProfilePage", profile)
                         }}
                        style={styles.editIcon}
                    />
                </View>
                {/* <Title style={styles.title}>Yash Nagtode</Title> */}

                <Title style={styles.title}>{`${userData.firstName} ${userData.lastName}`}</Title>

                <View style={styles.detailsContainer}>
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="email" size={24} color="black" style={styles.icon} />
                        <Paragraph style={styles.infoValue}>{profile[0]?.email}</Paragraph>
                    </View>
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="phone" size={20} style={styles.icon} />
                        <Paragraph style={styles.infoValue}>{profile[0]?.mobile_no}</Paragraph>
                    </View>
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="calendar-today" size={20} style={styles.icon} />
                        <Paragraph style={styles.infoValue}>{profile[0]?.dob}</Paragraph>
                    </View>
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="person" size={20} style={styles.icon} />
                        <Paragraph style={styles.infoValue}>{`gender : ${profile[0]?.gender}`}</Paragraph>
                    </View>
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="ring-volume" size={20} style={styles.icon} />
                        <Paragraph style={styles.infoValue}>Marital Status: {profile[0]?.marital_status }</Paragraph>
                    </View>
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="fingerprint" size={20} style={styles.icon} />
                        <Paragraph style={styles.infoValue}>Aadhaar Number:{profile[0]?.aadhar_no}</Paragraph>
                    </View>
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="flight" size={20} style={styles.icon} />
                        <Paragraph style={styles.infoValue}>Passport Number: {profile[0]?.passport_no}</Paragraph>
                    </View>
                </View>
                <Button
                    mode="contained"
                    onPress={showDialog}
                    style={styles.logoutButton}
                >
                    Logout
                </Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Confirm Logout</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Are you sure you want to logout?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>No</Button>
                            <Button onPress={handleLogout}>Yes</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

            </Card.Content>

        </View >
    </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    profilePictureContainer: {
        position: 'relative',
    },
    profilePicture: {
        backgroundColor: 'yellow',  // Match background color
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 50,
    },
    detailsContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'flex-start',  // Align details to the left
        // paddingHorizontal: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        padding: 8,

    },
    icon: {
        marginRight: 8,
    },
    infoValue: {
        fontSize: 18,
    },
    logoutButton: {
        marginTop: 20,
        width: '100%',
        padding: 5,
        backgroundColor: 'red',
        alignContent: 'flex-start',
    }
});

export default Profile;
