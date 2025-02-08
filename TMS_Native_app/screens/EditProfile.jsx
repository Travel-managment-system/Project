import { View, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Checkbox,
  Headline,
  Subheading,
  Provider,
  IconButton,
  Title,
  Avatar,
  Card,
} from "react-native-paper";
import axios from "axios";
import { Calendar } from "react-native-calendars";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfile({ props, route }) {
  const profile = useState(route?.params[0]);
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState(profile[0]?.first_name);
  const [lastName, setLastName] = useState(profile[0]?.last_name);
  const [email, setEmail] = useState(profile[0]?.email);
  const [mobileNo, setMobileNo] = useState(profile[0]?.mobile_no);
  const [date, setDate] = useState(profile[0]?.dob);
  const [openCal, setOpenCal] = useState(false);
  const [aadhar_no, setAadhar_no] = useState(profile[0]?.aadhar_no)
  const [passport_no, setPassport_no] = useState(profile[0]?.passport_no)
  const [marital_status, setMarital_status] = useState(profile[0]?.marital_status)

   
  
  useEffect(() => {
    AsyncStorage.getItem("userData")
      .then((res) => {
        setUserData(JSON.parse(res));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Card.Content style={styles.content}>
          <View style={styles.profilePictureContainer}>
            <Avatar.Image
              size={100}
              source={{ uri: "https://via.placeholder.com/100" }} // Replace with your profile pic URL
              style={styles.profilePicture}
            />
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => {
                props.navigation.navigate("editProfilePage");
              }}
              style={styles.editIcon}
            />
          </View>

          <Title
            style={styles.title}
          >{`${userData.firstName} ${userData.lastName}`}</Title>
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
              name="email"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={mobileNo}
              onChangeText={setMobileNo}
              mode="outlined"
              label="Mobile Number"
            />
             <TextInput
              style={styles.input}
              placeholder="Enter your Aadhar Number"
              value={aadhar_no}
              onChangeText={setAadhar_no}
              mode="outlined"
              label="Aadhar Number"
            />
             <TextInput
              style={styles.input}
              placeholder="Enter your Passport Number"
              value={passport_no}
              onChangeText={setPassport_no}
              mode="outlined"
              label="Passport Number"
            />
             <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={marital_status}
              onChangeText={setMarital_status}
              mode="outlined"
              label="Marital Status"
            />
            <View>
              <TextInput
                placeholder="Select a date"
                value={date}
                style={styles.input}
                mode="outlined"
              label="Date Of Birth"
              />
              <IconButton
                icon={"calendar"}
                style={styles.searchIcon}
                onPress={() => setOpenCal(true)}
              />
            </View>
            {openCal && (
              <Calendar
                onDayPress={(day) => {
                  console.log("selected day", day);
                  setDate(day?.dateString);
                  setOpenCal(false);
                }}
              />
            )}
          </View>
      
          <TouchableOpacity
            style={styles.updateProfileButton}
            onPress={() => props.navigation.navigate("profilePage")}
          >
            <Text style={styles.updateProfileText}>Update Profile</Text>
          </TouchableOpacity>

        </Card.Content>
        </ScrollView>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    paddingBlockStart: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "column",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 18,
    color: "#555",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent background
    borderRadius: 25,
    // padding: 5,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  searchIcon: {
    // marginLeft: 5,
    position: "absolute",
    right: 10,
    zIndex: 1,
    top: 5
  },
  filterIcon: {
    marginRight: 5,
    position: "absolute",
    right: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  navBarItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  searchInput: {
    backgroundColor: "transparent",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  cardCost: {
    fontSize: 14,
    color: "#777",
  },
  updateProfileButton: {
    backgroundColor: "#000", // Fallback color for the gradient
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    alignSelf:"center",
    marginTop: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden", // For Android elevation
    width: "75%",
  },
  updateProfileText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "#555",
  },
  linkText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  profilePictureContainer: {
    position: "relative",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    alignItems: "center",
    bottom: 3,
    right: 142,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  profilePicture: {
    backgroundColor: "yellow",
  },
input: {
    borderColor: 'gray',
    // borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
},
});
