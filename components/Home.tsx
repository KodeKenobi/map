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
import { useTailwind } from "tailwind-rn";
import HomeCardComponent from "./HomeCardComponent";
import HorizontalCardScroll from "./HorizontalCardScroll";
// import {
//   GoogleSignin,
//   statusCodes,
//   isErrorWithCode,
//   isSuccessResponse,
//   isNoSavedCredentialFoundResponse,
// } from "@react-native-google-signin/google-signin";

// Define your cards array
const cards = [
  {
    imageUrl: require("../assets/images/vitamin-drip.png"),
    title: "Free Wellness Webinar: The Path to Cellular Health",
    date: "Dec 15th, 7 PM - Join Now",
    registrationText: "Register Now >",
    backgroundColor: "rgba(115, 69, 182, 0.16)",
  },
  {
    imageUrl: require("../assets/images/vitamin-drip.png"),
    title: "Free Wellness Webinar: The Path to Cellular Health",
    date: "Dec 15th, 7 PM - Join Now",
    registrationText: "Register Now >",
    backgroundColor: "rgba(255, 215, 0, 0.16)",
  },
  {
    imageUrl: require("../assets/images/vitamin-drip.png"),
    title: "Free Wellness Webinar: The Path to Cellular Health",
    date: "Dec 15th, 7 PM - Join Now",
    registrationText: "Register Now >",
    backgroundColor: "rgba(115, 69, 182, 0.16)",
  },
];

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const tailwind = useTailwind();

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
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingTop: 0 }]}
      >
        <Greeting
          userName={firstName ? `${firstName}` : "Good Morning, User"}
          // onLogout={handleLogout}
          notificationCount={3}
        />{" "}
        <ScrollView horizontal>
          <HorizontalCardScroll cards={cards} />
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
