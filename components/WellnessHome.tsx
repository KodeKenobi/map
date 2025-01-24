import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth } from "../app/(auth)/firebaseConfig";
import { getUserData } from "../app/(auth)/auth";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import AppText from "./AppText";
import SearchComponent from "./SearchComponent";

const cards = [
  {
    imageUrl: require("../assets/images/vitamin-drip.png"),
    title: "Free Wellness Webinar: The Path to Cellular Health",
    date: "Dec 15th, 7 PM - Join Now",
    registrationText: "Register Now >",
    backgroundColor: "rgba(115, 69, 182, 0.16)",
  },
  {
    imageUrl: require("../assets/images/coaching.png"),
    title: "Career Coaching: From Entry Level to C-Suite and beyond",
    date: "Make your first appointment today",
    registrationText: "Explore Coaching >",
    backgroundColor: "rgba(255, 215, 0, 0.16)",
  },
  {
    imageUrl: require("../assets/images/wellness-seminar.png"),
    title: "Free Wellness Webinar: The Path to Cellular Health",
    date: "Dec 15th, 7 PM - Join Now",
    registrationText: "Register Now >",
    backgroundColor: "rgba(115, 69, 182, 0.16)",
  },
];

const quickAccessCards = [
  {
    iconUrl: require("../assets/images/heart-bit-icon-white.png"),
    title: "Explore Wellness Services",
    backgroundColor: "rgba(115, 69, 182, 0.16)",
    iconBackgroundColor: "black",
  },
  {
    iconUrl: require("../assets/images/light-bulb-white.png"),
    title: "Discover Coaching and Mindfulness",
    backgroundColor: "rgba(255, 215, 0, 0.16)",
    iconBackgroundColor: "black",
  },
];

const WellnessHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid).then((data) => {
        if (data) {
          setFirstName(data.firstName);
          if (!data.hasCompletedWellnessOnboarding) {
            navigation.navigate("WellnessWelcome");
          }
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
      navigation.navigate("Login");
    }
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBarsContainer}>
          <View style={styles.loadingBar} />
          <View style={styles.loadingBar} />
          <View style={styles.loadingBar} />
        </View>
      </View>
    );
  }

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out");
        navigation.navigate("Login");
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
          userName={firstName ? `${firstName}` : ""}
          notificationCount={8}
        />
        <View>
          <SearchComponent />
        </View>
        <View style={tailwind("mb-4 mt-8 flex items-center justify-center")}>
          <Image
            source={require("../assets/images/wellness-body.png")}
            style={{ width: 512, height: 512, resizeMode: "contain" }}
          />
        </View>
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
  loadingBarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  loadingBar: {
    height: 4,
    width: "30%",
    backgroundColor: "#ccc",
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingBarActive: {
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default WellnessHome;
