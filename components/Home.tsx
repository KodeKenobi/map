import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth } from "../app/(auth)/firebaseConfig";
import { getUserData } from "../app/(auth)/auth";
import Greeting from "./Greeting";
import Card from "./Card";
import QuickAccess from "./QuickAccess";
import Recommendations from "./Recommendations";
import BottomNav from "./BottomNav";
import { Ionicons } from "@expo/vector-icons";
// import {
//   GoogleSignin,
//   statusCodes,
//   isErrorWithCode,
//   isSuccessResponse,
//   isNoSavedCredentialFoundResponse,
// } from "@react-native-google-signin/google-signin";

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid).then((data) => {
        if (data) {
          setFirstName(data.firstName);
        }
      });
      console.log(user);
    }
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out");
        navigation.navigate("Login"); // Navigate to the login screen
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert("An error occurred while logging out. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          {/* <Ionicons name="log-out-outline" size={24} color="black" />{" "} */}
          {/* Use Ionicons for logout */}
        </TouchableOpacity>
        <Greeting
          userName={firstName ? `${firstName}` : "Good Morning, User"}
          onLogout={handleLogout}
        />{" "}
        {/* Pass first name */}
        <ScrollView horizontal>
          <Card
            title="Free Wellness Webinar: The Path to Cellular Health"
            date="Dec 16th, 7 PM - Join Now"
            buttonText="Register Now"
            imageSource={require("../assets/images/Are_vitamin_drips_good_for_you.png")}
          />
          <Card
            title="Career Coaching: From Entry Level to C-Suite"
            date="Book your session today"
            buttonText="Explore Coaching"
            imageSource={require("../assets/images/55314.png")}
          />
        </ScrollView>
        <QuickAccess />
        <Recommendations />
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 12,
  },
  logoutButton: {
    position: "absolute", // Position it as needed
    top: 10, // Adjust as necessary
    right: 10, // Adjust as necessary
  },
});

export default Home;
