import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth } from "../app/(auth)/firebaseConfig";
import { getUserData } from "../app/(auth)/auth";
import Greeting from "./Greeting";
import RecommendationsCard from "./RecommendationsCard";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import HorizontalCardScroll from "./HorizontalCardScroll";
import HorizontalQuickAccessCardScroll from "./HorizontalQuickAccessCardScroll";
import AppText from "./AppText";

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
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert("An error occurred while logging out. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Greeting
        userName={firstName ? `${firstName}` : ""}
        notificationCount={8}
      />{" "}
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingTop: 0 }]}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HorizontalCardScroll cards={cards} />
        </ScrollView>
        <View style={[tailwind("mt-0 ml-4")]}>
          <AppText style={tailwind("text-lg font-bold")}>Quick Access</AppText>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HorizontalQuickAccessCardScroll
            quickAccessCards={quickAccessCards}
          />
        </ScrollView>
        <View style={tailwind("mt-0 ml-4")}>
          <View style={[tailwind("mb-4")]}>
            <AppText style={tailwind("text-lg font-bold")}>
              Personalised Recommendations
            </AppText>
          </View>
          <RecommendationsCard
            iconUrl={require("../assets/images/wellness-seminar.png")}
            title="IV Drip for Boosting Immunity >"
            backgroundColor="rgba(115, 69, 182, 0.16)"
            iconBackgroundColor="black"
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
});

export default Home;
