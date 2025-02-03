import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth } from "../app/(auth)/firebaseConfig";
import { getUserData } from "../app/(auth)/auth";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import SearchComponent from "./SearchComponent";
import ServicesNavMenu from "./ServicesNavMenu";
import WisdomNavMenu from "./WisdomNavMenu";
import HorizontalCardScroll from "./HorizontalCardScroll";
import BottomCTASection from "./BottomCTASection";

const WisdomHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale] = useState(new Animated.Value(1));
  const tailwind = useTailwind();

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
      date: "Make an appointment today",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
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
      title: "Advanced Career Coaching: From Entry Level to C-Suite",
      date: "Schedule today",
      registrationText: "Advanced Coaching >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
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
      backgroundColor: "rgba(115, 69, 182, 0.16)",
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
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      imageUrl: require("../assets/images/wellness-seminar.png"),
      title: "Wellness Seminar: Mindfulness and Health",
      date: "Jun 30th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
  ];

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid).then((data) => {
        if (data) {
          setFirstName(data.firstName);
          if (!data.hasCompletedWisdomOnboarding) {
            navigation.navigate("WisdomWelcome");
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
        <Animated.Image
          source={require("../assets/images/faviconBig.png")}
          style={[styles.faviconBig, { transform: [{ scale }] }]}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={tailwind("mt-10")}>
        <Greeting
          userName={firstName ? `${firstName}` : ""}
          notificationCount={8}
        />{" "}
      </View>
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View>
          <WisdomNavMenu />
        </View>
        <View style={tailwind("mt-4 mb-2 p-4")}>
          <Text style={tailwind("text-lg font-bold")}> What's Happening</Text>
        </View>
        <View style={tailwind("p-4")}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HorizontalCardScroll cards={cards} />
          </ScrollView>
        </View>

        <View style={tailwind("mb-4 flex items-center justify-center p-4")}>
          <BottomCTASection />
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

export default WisdomHome;
