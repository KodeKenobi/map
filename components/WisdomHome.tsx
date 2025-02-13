import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import WisdomNavMenu from "./WisdomNavMenu";
import HorizontalCardScroll from "./HorizontalCardScroll";
import BottomCTASection from "./BottomCTASection";
import { supabase } from "@/lib/supabase";

const WisdomHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale] = useState(new Animated.Value(1));
  const tailwind = useTailwind();

  const cards = [
    {
      id: 1,
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Free Wellness Webinar: The Path to Cellular Health",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Dec 15th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 2,
      imageUrl: require("../assets/images/coaching.png"),
      title: "Career Coaching: From Entry Level to C-Suite and beyond",
      cta: "Explore Coaching >",
      subtitle: "Make an appointment today",
      date: "Make an appointment today",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 3,
      imageUrl: require("../assets/images/wellness-seminar.png"),
      title: "Free Wellness Webinar: The Path to Cellular Health",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Dec 15th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 4,
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Extended Wellness Webinar: The Path to Cellular Health",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Dec 25th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 5,
      imageUrl: require("../assets/images/coaching.png"),
      title: "Advanced Career Coaching: From Entry Level to C-Suite",
      cta: "Advanced Coaching >",
      subtitle: "Schedule today",
      date: "Schedule today",
      registrationText: "Advanced Coaching >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 6,
      imageUrl: require("../assets/images/wellness-seminar.png"),
      title: "Wellness Seminar: The Path to Cellular Health - New Year Edition",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Jan 5th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 7,
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Wellness Webinar: Boost Your Immunity",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Feb 10th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 8,
      imageUrl: require("../assets/images/coaching.png"),
      title: "Career Coaching: Strategies for Success",
      cta: "Explore Coaching >",
      subtitle: "Book your session today",
      date: "Book your session today",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 9,
      imageUrl: require("../assets/images/wellness-seminar.png"),
      title: "Free Wellness Webinar: Health Tips for 2024",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Mar 15th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 10,
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Wellness Webinar: Nutrition Essentials",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Apr 20th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 11,
      imageUrl: require("../assets/images/coaching.png"),
      title: "Career Coaching: Navigating Your Career Path",
      cta: "Explore Coaching >",
      subtitle: "Join us for insights",
      date: "May 25th, 7 PM - Join Now",
      registrationText: "Explore Coaching >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
    {
      id: 12,
      imageUrl: require("../assets/images/wellness-seminar.png"),
      title: "Wellness Seminar: Mindfulness and Health",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Jun 30th, 7 PM - Join Now",
      registrationText: "Register Now >",
      backgroundColor: "rgba(115, 69, 182, 0.16)",
    },
  ];

  useEffect(() => {
    const getProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profile) {
            setFirstName(profile.first_name);
            if (!profile.hascompletedwisdomonboarding) {
              navigation.navigate("WisdomWelcome");
            }
          }
          setLoading(false);
        } else {
          setLoading(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        navigation.navigate("Login");
      }
    };

    getProfile();
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
        />
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
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  faviconBig: {
    width: 100,
    height: 100,
  },
});

export default WisdomHome;
