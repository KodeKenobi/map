import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import Greeting from "./Greeting";
import RecommendationsCard from "./RecommendationsCard";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import HorizontalCardScroll from "./HorizontalCardScroll";
import HorizontalQuickAccessCardScroll from "./HorizontalQuickAccessCardScroll";
import AppText from "./AppText";

const cards = [
  {
    id: 1,
    imageUrl: require("../assets/images/vitamin-drip.png"),
    title: "Free Wellness Webinar: The Path to Cellular Health",
    subtitle: "Dec 15th, 7 PM - Join Now",
    cta: "Register Now >",
    backgroundColor: "rgba(115, 69, 182, 0.16)",
  },
  {
    id: 2,
    imageUrl: require("../assets/images/coaching.png"),
    title: "Career Coaching: From Entry Level to C-Suite and beyond",
    subtitle: "Make your first appointment today",
    cta: "Explore Coaching >",
    backgroundColor: "rgba(255, 215, 0, 0.16)",
  },
  {
    id: 3,
    imageUrl: require("../assets/images/wellness-seminar.png"),
    title: "Free Wellness Webinar: The Path to Cellular Health",
    subtitle: "Dec 15th, 7 PM - Join Now",
    cta: "Register Now >",
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

  console.log("📍 CURRENT SCREEN: Home");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          console.log("No authenticated user");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          return;
        }

        if (profile) {
          setFirstName(profile.first_name);
        }
      } catch (error) {
        console.error("Error in getUserProfile:", error);
      }
    };

    getUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        alert("An error occurred while logging out. Please try again.");
        return;
      }
      console.log("User logged out");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={tailwind("mt-10")}>
        <Greeting
          userName={firstName ? `${firstName}` : ""}
          notificationCount={8}
        />
      </View>
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
            navigation={navigation}
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
