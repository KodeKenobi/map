import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  ScrollView,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import Greeting from "./Greeting";
import BottomNav from "./BottomNav";
import { useTailwind } from "tailwind-rn";
import WisdomNavMenu from "./WisdomNavMenu";
import HorizontalCardScroll from "./HorizontalCardScroll";
import BottomCTASection from "./BottomCTASection";
import WideHomeCard from "./WideHomeCard";
import { supabase } from "@/lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { setWisdomCards, setLoading } from "../store/slices/wisdomCardsSlice";
import { RootState } from "../store/store";
import { setProfile } from "../store/slices/profileSlice";

const WisdomHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const wisdomCards = useSelector(
    (state: RootState) => state.wisdomCards.cards
  );
  const loading = useSelector((state: RootState) => state.wisdomCards.loading);
  const profile = useSelector((state: RootState) => state.profile);
  const tailwind = useTailwind();
  const [scale] = useState(new Animated.Value(1));
  const [checkingOnboarding, setCheckingOnboarding] = useState<boolean>(true);

  console.log("📍 CURRENT SCREEN: WisdomHome");

  // Existing card data
  const cards = [
    {
      id: 1,
      imageUrl: require("../assets/images/vitamin-drip.png"),
      title: "Free Wellness Webinar: The Path to Cellular Health",
      cta: "Register Now >",
      subtitle: "Join us for insights",
      date: "Dec 15th - Join Now",
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
    // Add other cards as needed...
  ];

  // Reset loading state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      dispatch(setLoading(false));
    }, [dispatch])
  );

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        setCheckingOnboarding(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profileData) {
            // Update Redux profile state if not already set
            if (!profile.firstName || !profile.lastName) {
              dispatch(
                setProfile({
                  firstName: profileData.first_name,
                  lastName: profileData.last_name,
                  avatarUrl: profileData.avatar_url,
                })
              );
            }

            if (!profileData.hascompletedwisdomonboarding) {
              navigation.navigate("WisdomWelcome");
              return;
            }
          }

          // Simulate fetching wisdom cards from the database
          dispatch(setWisdomCards(cards));
          dispatch(setLoading(false));
          setCheckingOnboarding(false);
        } else {
          dispatch(setLoading(false));
          setCheckingOnboarding(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error:", error);
        dispatch(setLoading(false));
        setCheckingOnboarding(false);
        navigation.navigate("Login");
      }
    };

    checkOnboarding();
  }, [navigation, dispatch, profile.firstName, profile.lastName]);

  if (loading || checkingOnboarding) {
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
          userName={profile.firstName ? `${profile.firstName}` : ""}
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
          <WideHomeCard
            id={3}
            imageUrl={require("../assets/images/wellness-seminar.png")}
            title="Map Wealth"
            subtitle="QUEENPRENEUR"
            description="This one's all about supporting women-led businesses in the wellness ecosystem. They're celebrating women-owned and managed businesses, and they've even got awards and recognition programs in place. It's all about building an ecosystem of support for women who are changing the game in wellness. These services seem to be all about empowering women to take control of their lives, build meaningful connections, and thrive in their personal and professional journeys. She builds. She grows. She changes the game. to build an ecosystem of support for women-led businesses that serve the well-being of their market. Focus: Celebrating women-owned and managed businesses in the wellness ecosystem. This includes products and services related to: Wellness Ecosystem Categories (entries Open annually in April 2026, Awards to be held annually in Augst 2026) Tourism Wellness: Focuses on travel and leisure activities promoting relaxation, rejuvenation, and overall well-being. Holistic Wellness: Encompasses physical, emotional, mental, and spiritual well-being, often incorporating alternative therapies. Corporate Wellness: Aims to improve employees' health, productivity, and job satisfaction through workplace initiatives. Digital Wellness: Explores the impact of technology on mental and physical health, promoting healthy digital habits. Community Wellness: Focuses on building healthy communities through social connections, support networks, and collective well-being. Education Wellness: Integrates wellness principles into educational settings, promoting students' overall well-being and academic success. Lifestyle Wellness: Encompasses various aspects of daily life, such as nutrition, physical activity, stress management, and self-care. Environmental Wellness: Focuses on the interconnectedness of human well-being and the natural environment. Financial Wellness: Aims to promote financial stability, security, and well-being. Social Wellness: Emphasizes building and maintaining healthy relationships, social connections, and community engagement. Spiritual Wellness: Explores an individual's values, purpose, and meaning in life, often incorporating mindfulness and meditation practices."
            cta="Read More"
            backgroundColor="rgba(115, 69, 182, 0.16)"
          />
        </View>
        {/* <View style={tailwind("p-4")}>
          <HorizontalCardScroll cards={wisdomCards} />
        </View> */}

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
