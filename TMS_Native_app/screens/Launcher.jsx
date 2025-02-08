import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from 'react-native-vector-icons';
import HomePage from './Home';
import SavedPage from './Favorites';
import BookingsPage from './Bookings';
import ProfilePage from './Profile';
import SignupPage from './SignUp';
import SigninPage from './SignIn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfile from './EditProfile';
import Profile from './Profile';


// import PopularCity from './home/PopularCity';
// import PopularHotels from './home/PopularHotels';
// import PopularPackages from './home/PopularPackages';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Saved') {
                        iconName = 'heart-outline';
                    } else if (route.name === 'Bookings') {
                        iconName = 'calendar-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <Tab.Screen name="Saved" component={SavedPage} options={{ headerShown: false }} />
            <Tab.Screen name="Bookings" component={BookingsPage} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

function Launcher() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SigninPage">
                <Stack.Screen name="SigninPage" component={SigninPage} options={{ headerShown: false }} />
                <Stack.Screen name="SignupPage" component={SignupPage} />
                <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
                {/* <Stack.Screen name="PopularPackages" component={PopularPackages} />
                <Stack.Screen name="PopularCity" component={PopularCity} />
                <Stack.Screen name="PopularHotels" component={PopularHotels} /> */}
                <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfilePage" component={EditProfile} />
                <Stack.Screen name="profilePage" component={Profile}  />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Launcher;