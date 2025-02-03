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
import HorizontalCardScroll from "./HorizontalCardScroll";
import CoachingPicksCards from "./CoachingPicksCards";
import LogoNavScroll from "./LogoNavScroll";
import WealthNavMenu from "./WealthNavMenu";

const WealthHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale] = useState(new Animated.Value(1));
  const tailwind = useTailwind();

  const coachingCards = [
    {
      imageUrl: require("../assets/images/kwani-logo.png"),
      backgroundColor: "hsla(0, 0.00%, 100.00%, 0.16)",
    },
    {
      imageUrl: require("../assets/images/bee-ing-logo.png"),
      backgroundColor: "hsla(0, 0.00%, 100.00%, 0.16)",
    },
    {
      imageUrl: require("../assets/images/roar-logo.png"),
      backgroundColor: "hsla(0, 0.00%, 100.00%, 0.16)",
    },
  ];

  const cards = [
    {
      imageUrl: require("../assets/images/wealth-home-card-1.jpg"),
      title: "Free Wellness Webinar: The Path to Cellular Health",
      date: "Dec 15th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(252, 202, 102, 0.3)",
    },
    {
      imageUrl: require("../assets/images/wealth-home-card-2.jpg"),
      title: "Career Coaching: From Entry Level to C-Suite and beyond",
      date: "Make an appointment today",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(252, 202, 102, 0.3)",
    },
    {
      imageUrl: require("../assets/images/wealth-home-card-3.png"),
      title: "Free Wellness Webinar: The Path to Cellular Health",
      date: "Dec 15th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(252, 202, 102, 0.3)",
    },
  ];

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid).then((data) => {
        if (data) {
          setFirstName(data.firstName);
          if (!data.hasCompletedWealthOnboarding) {
            navigation.navigate("WealthWelcome");
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
        <View style={tailwind("mt-0")}>
          <WealthNavMenu />
        </View>
        <View style={tailwind("mt-8 mb-8")}>
          <Text style={tailwind("text-lg font-bold")}>
            {" "}
            Discover Franchise Opportunities
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HorizontalCardScroll cards={cards} />
        </ScrollView>
        <View style={tailwind("mt-2 mb-8")}>
          <Text style={tailwind("text-lg font-bold")}>
            {" "}
            Our Brands at a Glance
          </Text>
        </View>
        <View style={tailwind("mt-0 mb-8")}>
          <LogoNavScroll cards={coachingCards} />
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

export default WealthHome;
