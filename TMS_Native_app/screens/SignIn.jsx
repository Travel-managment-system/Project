import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,

} from 'react-native';
import { Checkbox, Button, Text, TextInput, Portal, Dialog, Provider, Snackbar, } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL of your backend login API
// const url = "http://192.168.222.127:4000/login";
// const url = 'http://192.168.1.14:4000/login';

const url = 'http://172.20.10.4:4000/login';

export default function SigninPage(props) {
    const [email, setEmail] = useState('harsh@g.c');
    const [password, setPassword] = useState('Harsh123');
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [visible, setVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const showSnackbar = (message) => {
        setAlertMessage(message);
        setVisible(true);
    };

    const hideSnackbar = () => setVisible(false);

    const handleSignIn = async () => {
        // Alert.alert('mohan')
        // props.navigation.replace('MainTabs');

        //alerts
        if (!email) {
            showSnackbar('Email field is empty');
            return;
        }

        if (!password) {
            showSnackbar('Password field is empty');
            return;
        }

        try {
            const payload = JSON.stringify({
                email: email,
                password: password
            });
            console.log("payload: ", payload);


            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

             console.log("response data: ", response.data);

            // Navigate to the next screen or perform other actions
            if (response && response.data && response.data.data && response.data.data.token) {
                const { token } = response.data.data; // Destructure the token from response.data.data
                // console.log('Token:', token);

                // Save the token to AsyncStorage
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('username', response.data.data.firstName);
                await AsyncStorage.setItem('userData', JSON.stringify(response.data.data)); 
                console.log('c', response.data)

                // Alert.alert('Login Successful', 'You are now logged in!');

                // Navigate to the home screen or do whatever you need to do
                props.navigation.replace('MainTabs');
            } else {
                console.log('Token is undefined or invalid login credentials');
                showSnackbar('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            showSnackbar('An error occurred during login');
        }
    };

    return (<Provider>
        <View style={styles.container}>

            <Image style={styles.logo} source={require('../assets/signIn.png')}></Image>
            <Text style={styles.title}>Welcome Back !</Text>
            <Text style={styles.subtitle} numberOfLines={2} adjustsFontSizeToFit>
                Stay signed in with your account to make searching easier
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    // onChange={onTextChange}
                    placeholder="Enter your username"
                    onChangeText={setEmail}
                    // onChangeText={(value) => {
                    //     setCredentials({ ...credentials, userName: value })
                    // }}
                    keyboardType="email-address"
                    autoCompleteType="email"
                    mode="outlined"
                    label={"userName"}
                    name='userName'

                />
                <TextInput
                    style={styles.input}
                    // onChange={onTextChange}
                    placeholder="Password"
                    onChangeText={setPassword}
                    // onChangeText={(value) => {
                    //     setCredentials({ ...credentials, password: value })
                    // }}
                    secureTextEntry={hidePassword}
                    name='password'
                    mode="outlined"
                    label={"password"}
                    right={<TextInput.Icon icon="eye"
                        onPress={() => setHidePassword(!hidePassword)} />}


                />
            </View>
            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxWrapper}>
                    <Checkbox
                        value={keepSignedIn}
                        onValueChange={setKeepSignedIn}
                        status={keepSignedIn ? 'checked' : 'unchecked'}
                        onPress={() => setKeepSignedIn(!keepSignedIn)}
                    />
                    <Text style={styles.checkboxText}>Keep me signed in</Text>
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.loginButton}
                // onPress={() => props.navigation.navigate("MainTabs")}
                onPress={handleSignIn}
            >
                <Text style={styles.loginButtonText}>Login</Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props.navigation.navigate("SignupPage")}>
                <Text style={styles.signupText}>
                    You don’t have an account? <Text style={styles.signupLink}>Sign Up</Text>
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
        paddingHorizontal: 20
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 10,
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
        // alignItems: 'center',

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
        // borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        width: '90%',
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        // marginLeft: 8,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        marginTop: 20,
        color: '#007BFF'
    },
    forgotPassword: {
        color: '#007BFF',
        textAlign: 'right',
        marginBottom: 20,
        marginTop: 10
    },
    loginButton: {
        backgroundColor: '#000', // Fallback color for the gradient
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden', // For Android elevation
        width: '75%',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },

    orText: {
        textAlign: 'center',
        color: '#555',
        marginBottom: 10,
    },
    signupText: {
        textAlign: 'center',
        color: '#555',
    },
    signupLink: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    snackbar: {
        backgroundColor: '#333',
        borderRadius: 5,
    },
})
