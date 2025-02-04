import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Text, TextInput, Button, Checkbox, Headline, Subheading, Provider, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const url = 'http://192.168.1.14:4000/register';
const url = "http://192.168.222.127:4000/register";


export default function SignUp(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [visible, setVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const showSnackbar = (message) => {
        setAlertMessage(message);
        setVisible(true);
    };

    const hideSnackbar = () => setVisible(false);

    const handleSignUp = async () => {
        if (!firstName) {
            showSnackbar('First name field is empty');
            return;
        }

        if (!lastName) {
            showSnackbar('Last name field is empty');
            return;
        }

        if (!email) {
            showSnackbar('Email field is empty');
            return;
        }

        if (!password) {
            showSnackbar('Password field is empty');
            return;
        }

        if (password !== retypePassword) {
            showSnackbar('Passwords do not match');
            return;
        }
        try {
            const payload = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            };
            console.log("payload: ", payload);

            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response && response.data && response.data.status === 'success' && response.data.data[0].affectedRows > 0) {
                console.log('User registered successfully');

                // Navigate to main tabs upon successful sign-up
                props.navigation.replace('SigninPage');
            } else {
                showSnackbar('Sign up failed');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            showSnackbar('An error occurred during sign up');
        }
    };

    return (
        <Provider>

            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/signIn.png')}></Image>

                <Text style={styles.title}>Let's Get Started</Text>

                <Text style={styles.subtitle} numberOfLines={2} adjustsFontSizeToFit>
                    Create your new account and find more beautiful destinations.
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your first name"
                        value={firstName}
                        onChangeText={setFirstName}
                        mode="outlined"
                        label="First Name"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your last name"
                        value={lastName}
                        onChangeText={setLastName}
                        mode="outlined"
                        label="Last Name"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCompleteType="email"
                        mode="outlined"
                        label="Email"
                        name='email'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={hidePassword}
                        mode="outlined"
                        label="Password"
                        right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Retype Password"
                        value={retypePassword}
                        onChangeText={setRetypePassword}
                        secureTextEntry={hidePassword}
                        mode="outlined"
                        label="Retype Password"
                        right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
                    />
                </View>



                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate("SigninPage")}>
                    <Text style={styles.footerText}>
                        Already have an account? <Text style={styles.linkText}>Sign In</Text>
                    </Text>
                </TouchableOpacity>

                <Snackbar
                    visible={visible}
                    onDismiss={hideSnackbar}
                    duration={3000}
                    style={styles.snackbar}
                >
                    {alertMessage}
                </Snackbar>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: "center",
        color: "#fff",
        paddingHorizontal: 10
    },
    logo: {
        width: 150,
        height: 100,
        // alignSelf: 'center',
        // marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        color: '#555',
        marginBottom: 40,
        flexWrap: 'wrap',
        width: '80%',
    },
    inputContainer: {
        borderRadius: 8,
        paddingHorizontal: 10,
        width: '90%',
        // marginBottom: 20
    },

    input: {
        height: 45,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff'
    },


    signupButton: {
        backgroundColor: '#000', // Fallback color for the gradient
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden', // For Android elevation
        width: '75%',
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    footerText: {
        textAlign: 'center',
        color: '#555',
    },
    linkText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },

});

