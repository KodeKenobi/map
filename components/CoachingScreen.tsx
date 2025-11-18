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
import CoachingCardComponent from "./CoachingCardComponent";

const CoachingScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<any>>();

  const sessionCards = [
    {
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Free Wellness Webinar: The Path to Cellular Health",
      date: "Dec 15th - Join Now",
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
      date: "Dec 15th - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Extended Wellness Webinar: The Path to Cellular Health",
      date: "Dec 15th - Join Now",
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
      date: "Dec 15th - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Wellness Webinar: Boost Your Immunity",
      date: "Dec 15th - Join Now",
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
      date: "Dec 15th - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Wellness Webinar: Nutrition Essentials",
      date: "Dec 15th - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/coaching.png"),
      title: "Career Coaching: Navigating Your Career Path",
      date: "Dec 15th - Join Now",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(255, 215, 0, 0.16)",
    },
    {
      imageUrl: require("../assets/images/wellness-seminar.png"),
      title: "Wellness Seminar: Mindfulness and Health",
      date: "Dec 15th - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
  ];

  const coachingCards = [
    {
      imageUrl: require("../assets/images/life-coach-icon.png"),
      title: "Life Coaching",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
      services: [
        {
          title: "Inner Child Healing",
          description:
            "Resolve childhood wounds and promote emotional well-being",
        },
        {
          title: "Relationships",
          description: "Build and maintain healthy, fulfilling relationships",
        },
        {
          title: "Trauma Healing",
          description: "Overcome past traumas and promote emotional resilience",
        },
        {
          title: "Life Planning",
          description: "Create a clear vision and plan for your life",
        },
        {
          title: "Life Purpose",
          description: "Discover and align with your life's purpose",
        },
        {
          title: "Family Constellations",
          description: "Explore and heal family dynamics",
        },
        {
          title: "Generational Healing",
          description:
            "Address and heal intergenerational patterns and traumas",
        },
        {
          title: "Wealth Planning",
          description: "Build prosperity and financial freedom",
        },
      ],
    },
    {
      imageUrl: require("../assets/images/career-icon.png"),
      title: "Career Coaching",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
      services: [
        {
          title: "Career Progression",
          description:
            "Advance in your current career or transition to a new one",
        },
        {
          title: "Succession and Promotion",
          description: "Prepare for leadership roles or promotions",
        },
        {
          title: "Career Guidance",
          description: "Explore and discover your ideal career path",
        },
      ],
    },
    {
      imageUrl: require("../assets/images/training-icon.png"),
      title: "Leadership Coaching",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
      services: [
        {
          title: "Lead Self",
          description:
            "Develop self-awareness, self-leadership, and personal growth",
        },
        {
          title: "Lead Teams",
          description: "Build and lead high-performing teams",
        },
        {
          title: "Lead Companies",
          description: "Develop leadership skills for organizational success",
        },
        {
          title: "Lead Society",
          description: "Make a positive impact in your community and society",
        },
      ],
    },
    {
      imageUrl: require("../assets/images/business-coaching-icon.png"),
      title: "Entrepreneurship Coaching",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
      services: [
        {
          title: "Visioning",
          description: "Create a clear and compelling vision for your business",
        },
        {
          title: "Marketing",
          description: "Develop effective marketing strategies and tactics",
        },
        {
          title: "Funding",
          description: "Explore funding options and create a financial plan",
        },
        {
          title: "Financial Modeling",
          description:
            "Build a comprehensive financial model for your business",
        },
        {
          title: "Personal Branding",
          description: "Develop a strong personal brand and online presence",
        },
        {
          title: "Sustainability",
          description:
            "Build a sustainable and environmentally conscious business",
        },
      ],
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
              <View style={tailwind("flex-row justify-between mb-4")}>
                <CoachingCardComponent
                  imageUrl={coachingCards[0].imageUrl}
                  title={coachingCards[0].title}
                  backgroundColor={coachingCards[0].backgroundColor}
                  services={coachingCards[0].services}
                />
                <CoachingCardComponent
                  imageUrl={coachingCards[1].imageUrl}
                  title={coachingCards[1].title}
                  backgroundColor={coachingCards[1].backgroundColor}
                  services={coachingCards[1].services}
                />
              </View>
              <View style={tailwind("flex-row justify-between")}>
                <CoachingCardComponent
                  imageUrl={coachingCards[2].imageUrl}
                  title={coachingCards[2].title}
                  backgroundColor={coachingCards[2].backgroundColor}
                  services={coachingCards[2].services}
                />
                <CoachingCardComponent
                  imageUrl={coachingCards[3].imageUrl}
                  title={coachingCards[3].title}
                  backgroundColor={coachingCards[3].backgroundColor}
                  services={coachingCards[3].services}
                />
              </View>
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
