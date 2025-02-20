import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AppText from "./AppText";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import WisdomNavMenu from "./WisdomNavMenu";
import HorizontalCardScroll from "./HorizontalCardScroll";
import CoachingPicksCards from "./CoachingPicksCards";

const CoachingScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<any>>();

  const sessionCards = [
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
    {
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Extended Wellness Webinar: The Path to Cellular Health",
      date: "Dec 25th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/coaching.png"),
      title: "Advanced Career Coaching: From Entry Level to C-Suite and beyond",
      date: "Schedule your appointment today",
      registrationText: "Explore Advanced Coaching >",
      backgroundColor: "rgba(255, 215, 0, 0.16)",
    },
    {
      imageUrl: require("../assets/images/wellness-seminar.png"),
      title: "Wellness Seminar: The Path to Cellular Health - New Year Edition",
      date: "Jan 5th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Wellness Webinar: Boost Your Immunity",
      date: "Feb 10th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/coaching.png"),
      title: "Career Coaching: Strategies for Success",
      date: "Book your session today",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(255, 215, 0, 0.16)",
    },
    {
      imageUrl: require("../assets/images/wellness-seminar.png"),
      title: "Free Wellness Webinar: Health Tips for 2024",
      date: "Mar 15th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Wellness Webinar: Nutrition Essentials",
      date: "Apr 20th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/coaching.png"),
      title: "Career Coaching: Navigating Your Career Path",
      date: "May 25th, 7 PM - Join Now",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(255, 215, 0, 0.16)",
    },
    {
      imageUrl: require("../assets/images/wellness-seminar.png"),
      title: "Wellness Seminar: Mindfulness and Health",
      date: "Jun 30th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
  ];

  const coachingCards = [
    {
      imageUrl: require("../assets/images/career-icon.png"),
      title: "Career Coaching",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/life-coach-icon.png"),
      title: "Life Coaching",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/business-coaching-icon.png"),
      title: "Business Coaching",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
  ];

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center mt-10")}>
          <View
            style={tailwind("flex-row items-center w-full p-4 justify-between")}
          >
            <View style={tailwind("bg-gray-200 rounded-full p-2")}>
              <TouchableOpacity
                style={tailwind("flex items-center justify-center")}
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  } else {
                    alert("No previous screen to go back to.");
                  }
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <AppText style={tailwind("text-xl font-bold text-center")}>
              Coaching
            </AppText>
            <View style={tailwind("w-10")} />
          </View>
          {/* <View>
            <WisdomNavMenu />
          </View> */}
          <ScrollView contentContainerStyle={[styles.scrollContainer]}>
            <View>
              <WisdomNavMenu />
            </View>
            <View style={tailwind("mt-4 p-4")}>
              <Text style={tailwind("text-lg font-bold")}>
                {" "}
                What's Happening
              </Text>
            </View>
            <View style={tailwind("p-4")}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <CoachingPicksCards cards={coachingCards} />
              </ScrollView>
            </View>
            <View style={tailwind("mt-4 p-4")}>
              <Text style={tailwind("text-lg font-bold")}>
                {" "}
                Find Your Perfect Session
              </Text>
            </View>
            <View style={tailwind("p-4")}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <HorizontalCardScroll cards={sessionCards} />
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
  faviconBig: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default CoachingScreen;
